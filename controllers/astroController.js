import AstroQuestion from "../models/AstroQuestion.js"
import astroRagService from "../services/astroRagService.js";
import responseFormatter from "../services/responseFormatter.js";
import astrologyApiService from "../services/astrologyApiService.js";

// Helper function to detect if user is asking for remedy
const isRemedyRequest = (question) => {
  const remedyKeywords = [
    'remedy', 'remedies', 'solution', 'solutions', 'cure', 'cures', 'treatment',
    'how to fix', 'what should i do', 'what to do', 'help me', 'help me with',
    'how can i', 'what can i', 'suggestions', 'suggestion', 'advice', 'tips',
    'totkay', 'upay', 'totke', 'upaay', 'mitigate', 'reduce', 'minimize'
  ];
  const lowerQuestion = question.toLowerCase();
  return remedyKeywords.some(keyword => lowerQuestion.includes(keyword));
};

export const askQuestion = async (req, res) => {
  const startTime = Date.now();

  try {
    const { question, context, ragWithContext, userInfo, user_name } = req.body;

    console.log('=== BACKEND RECEIVED ===');
    console.log('Question:', question);
    console.log('UserInfo:', userInfo);
    console.log('User Name:', user_name);
    console.log('Is Remedy Request:', isRemedyRequest(question));
    console.log('=====================');

    if (!question || question.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Question is required'
      });
    }

    const userId = req.user?._id;

    // Idempotency guard: if the same user recently asked the exact same question
    // and we have a successful response, return it instead of processing again.
    try {
      const recent = await AstroQuestion.findOne({ userId, question: question.trim() }).sort({ createdAt: -1 });
      if (recent && recent.status === 'success') {
        const ageMs = Date.now() - new Date(recent.createdAt).getTime();
        // If it was answered very recently (10 seconds), return cached result
        if (ageMs < 10000) {
          return res.status(200).json({
            success: true,
            data: {
              questionId: recent._id,
              question: recent.question,
              category: recent.category,
              answer: recent.answer,
              remedy: recent.remedy || '',
              retrievedSources: recent.retrievedSources || [],
              responseTime: ageMs,
              introMessage: recent.introMessage || '',
              hasIntro: recent.hasIntro || false,
              isSMSFormatted: false,
              hasRemedy: !!recent.remedy
            }
          });
        }
      }
    } catch (err) {
      console.warn('Idempotency check failed:', err?.message || err);
      // proceed normally if idempotency check errors
    }

    // Create database record
    const astroQuestion = new AstroQuestion({
      userId,
      question: question.trim(),
      context: context || '',
      ragWithContext: ragWithContext !== false, // Default to true
      userInfo: userInfo || null,
      status: 'pending'
    });

    await astroQuestion.save();

    // Get all previous questions from this user for context preservation
    const previousQuestions = await AstroQuestion.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5) // Get last 5 questions for context
      .select('question answer');

    // Build context from conversation history
    let conversationContext = '';
    if (previousQuestions.length > 0) {
      conversationContext = 'Previous conversation context (most recent first):\n';
      previousQuestions.reverse().forEach((q, idx) => {
        conversationContext += `Q${idx + 1}: ${q.question}\nA${idx + 1}: ${q.answer}\n\n`;
      });
      console.log('Added conversation context from', previousQuestions.length, 'previous questions');
    }

    // --- FETCH LIVE ASTROLOGY DATA IF USER INFO IS PRESENT ---
    let liveAstroData = '';
    if (userInfo) {
      try {
        console.log('Fetching live astrology data...');
        const birthParams = {
          day: parseInt(userInfo.birthDate.split('-')[2]),
          month: parseInt(userInfo.birthDate.split('-')[1]),
          year: parseInt(userInfo.birthDate.split('-')[0]),
          hour: parseInt(userInfo.birthTime.split(':')[0]),
          min: parseInt(userInfo.birthTime.split(':')[1]),
          lat: userInfo.birthLatitude || userInfo.latitude || 28.6139, // Default to Delhi if missing
          lon: userInfo.birthLongitude || userInfo.longitude || 77.2090,
          tzone: 5.5 // Assuming IST for now, ideally should come from userInfo
        };

        // Fetch Planets, Panchang, Dasha concurrently
        const [planetsRes, panchangRes, dashaRes] = await Promise.all([
          astrologyApiService.getPlanetaryPositions(birthParams),
          astrologyApiService.getBasicPanchang(birthParams),
          astrologyApiService.getCurrentVimshottariDasha(birthParams)
        ]);

        if (planetsRes.success) {
          liveAstroData += `\n\nLIVE PLANETARY POSITIONS:\n${JSON.stringify(planetsRes.data, null, 2)}`;
        }
        if (panchangRes.success) {
          liveAstroData += `\n\nLIVE PANCHANG:\n${JSON.stringify(panchangRes.data, null, 2)}`;
        }
        if (dashaRes.success) {
          liveAstroData += `\n\nCURRENT DASHA:\n${JSON.stringify(dashaRes.data, null, 2)}`;
        }

        console.log('Live astrology data fetched successfully.');
      } catch (astroError) {
        console.error('Error fetching live astrology data:', astroError);
        // Continue without live data if it fails
      }
    }

    // Combine conversation context with provided context AND live astrology data
    const finalContext = conversationContext + (context || '') + liveAstroData;

    // Check if user is asking for remedy
    const hasRemedyRequest = isRemedyRequest(question);

    // Extract user's faith/belief system from userInfo if available
    const userFaith = userInfo?.faith || userInfo?.belief || userInfo?.religion || null;

    // Extract user's preferred language from userInfo
    const userLanguage = userInfo?.language || userInfo?.preferredLanguage || null;

    // Ensure user name is available for greeting
    const effectiveUserName = user_name || userInfo?.name || null;

    // Normalize userInfo so AI receives coordinates when available
    let normalizedUserInfo = userInfo || null;
    if (normalizedUserInfo) {
      normalizedUserInfo = { ...normalizedUserInfo };
      // Prefer explicit birthLatitude/birthLongitude; fall back to common aliases
      normalizedUserInfo.birthLatitude = normalizedUserInfo.birthLatitude ?? normalizedUserInfo.latitude ?? normalizedUserInfo.lat ?? normalizedUserInfo.coords?.lat ?? null;
      normalizedUserInfo.birthLongitude = normalizedUserInfo.birthLongitude ?? normalizedUserInfo.longitude ?? normalizedUserInfo.lng ?? normalizedUserInfo.coords?.lng ?? normalizedUserInfo.coords?.lon ?? null;
      // Keep birthPlace for fallback
      normalizedUserInfo.birthPlace = normalizedUserInfo.birthPlace ?? normalizedUserInfo.place ?? normalizedUserInfo.location ?? '';
    }

    // Call the service with faith and language parameters
    const result = await astroRagService.askQuestion(
      question.trim(),
      finalContext,
      ragWithContext !== false, // Default to true
      normalizedUserInfo, // Pass normalized userInfo to service for intro handling
      userFaith, // Pass faith for remedy lookup and religion-based greetings
      userLanguage, // Pass language for multilingual responses
      effectiveUserName // Pass user name for greeting personalization
    );

    const responseTime = Date.now() - startTime;

    if (result.success) {
      // Update database record
      astroQuestion.category = result.data.category || '';
      astroQuestion.answer = result.data.answer || '';
      astroQuestion.remedy = result.data.remedy || '';
      astroQuestion.retrievedSources = result.data.retrieved_sources || [];
      astroQuestion.responseTime = responseTime;
      astroQuestion.status = 'success';

      if (result.data.originalAnswer) {
        astroQuestion.originalAnswer = result.data.originalAnswer;
      }

      await astroQuestion.save();

      console.log('=== BACKEND RESPONSE ===');
      console.log('Has intro:', result.data.hasIntro);
      console.log('Intro message:', result.data.introMessage);
      console.log('AI answer:', result.data.answer);
      console.log('=====================');

      // Prepare response for frontend
      const responseData = {
        questionId: astroQuestion._id,
        question: question.trim(),
        category: result.data.category,
        // FIXED: Return FULL answer (no SMS truncation)
        // Users want complete answers based on their questions
        answer: result.data.answer,
        // FIXED: Always include remedy from AI service
        // Frontend can choose to display it or not
        remedy: result.data.remedy || '',
        retrievedSources: result.data.retrieved_sources,
        responseTime,
        // Include intro data for frontend to handle display
        introMessage: result.data.introMessage || '',
        hasIntro: result.data.hasIntro || false,
        // FIXED: Flag shows SMS formatting disabled
        isSMSFormatted: false,
        // Flag: whether remedy is present
        hasRemedy: !!result.data.remedy
      };

      return res.status(200).json({
        success: true,
        data: responseData
      });
    } else {
      // Error handling
      astroQuestion.status = 'failed';
      astroQuestion.errorMessage = result.error || 'Unknown error';
      astroQuestion.responseTime = responseTime;

      await astroQuestion.save();

      return res.status(result.statusCode || 500).json({
        success: false,
        message: 'Failed to get answer from Astro API',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error in askQuestion controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const getQuestionHistory = async (req, res) => {
  try {
    const userId = req.user?._id;

    // Allow both authenticated and non-authenticated users to see history
    const query = userId ? { userId } : {};

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50; // Increased limit
    const skip = (page - 1) * limit;

    const questions = await AstroQuestion.find(query)
      .sort({ createdAt: -1 }) // Most recent first
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await AstroQuestion.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: {
        questions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalQuestions: total,
          hasMore: skip + questions.length < total
        }
      }
    });
  } catch (error) {
    console.error('Error in getQuestionHistory:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve question history',
      error: error.message
    });
  }
};