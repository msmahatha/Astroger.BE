// import AstroQuestion from "../models/AstroQuestion.js"
// import astroRagService from "../services/astroRagService.js";

// export const askQuestion = async (req, res) => {
//   const startTime = Date.now();
  
//   try {
//     const { question, context, ragWithContext } = req.body;

//     if (!question || question.trim() === '') {
//       return res.status(400).json({
//         success: false,
//         message: 'Question is required'
//       });
//     }

//     const userId = req.user?._id ;

//     // Create database record
//     const astroQuestion = new AstroQuestion({
//       userId,
//       question: question.trim(),
//       context: context || '',
//       ragWithContext: ragWithContext || false,
//       status: 'pending'
//     });

//     await astroQuestion.save();

//     // Call the Astro RAG API
//     const result = await astroRagService.askQuestion(
//       question.trim(),
//       context || '',
//       ragWithContext || false
//     );

//     const responseTime = Date.now() - startTime;

//     if (result.success) {
//       // Update database record with successful response
//       astroQuestion.category = result.data.category || '';
//       astroQuestion.answer = result.data.answer || '';
//       astroQuestion.remedy = result.data.remedy || '';
//       astroQuestion.retrievedSources = result.data.retrieved_sources || [];
//       astroQuestion.responseTime = responseTime;
//       astroQuestion.status = 'success';
      
//       await astroQuestion.save();

//       return res.status(200).json({
//         success: true,
//         data: {
//           questionId: astroQuestion._id,
//           question: result.data.question,
//           category: result.data.category,
//           answer: result.data.answer,
//           remedy: result.data.remedy,
//           retrievedSources: result.data.retrieved_sources,
//           responseTime
//         }
//       });
//     } else {
//       // Update database record with error
//       astroQuestion.status = 'failed';
//       astroQuestion.errorMessage = result.error || 'Unknown error';
//       astroQuestion.responseTime = responseTime;
      
//       await astroQuestion.save();

//       return res.status(result.statusCode || 500).json({
//         success: false,
//         message: 'Failed to get answer from Astro API',
//         error: result.error
//       });
//     }
//   } catch (error) {
//     console.error('Error in askQuestion controller:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// export const getQuestionHistory = async (req, res) => {
//   try {
//     const userId = req.user?._id;
    
//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication required'
//       });
//     }

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const questions = await AstroQuestion.find({ userId })
//       .sort({ createdAt: 1 })
//       .skip(skip)
//       .limit(limit)
//       .select('-__v');

//     const total = await AstroQuestion.countDocuments({ userId });

//     return res.status(200).json({
//       success: true,
//       data: {
//         questions,
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(total / limit),
//           totalQuestions: total,
//           hasMore: skip + questions.length < total
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error in getQuestionHistory:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve question history',
//       error: error.message
//     });
//   }
// };

// import AstroQuestion from "../models/AstroQuestion.js"
// import astroRagService from "../services/astroRagService.js";

// export const askQuestion = async (req, res) => {
//   const startTime = Date.now();
  
//   try {
//     const { question, context, ragWithContext, userInfo } = req.body;

//     console.log('=== BACKEND RECEIVED ===');
//     console.log('Question:', question);
//     console.log('UserInfo:', userInfo);
//     console.log('=====================');

//     const userId = req.user?._id;

//     // Create database record
//     const astroQuestion = new AstroQuestion({
//       userId,
//       question: question.trim(),
//       context: context || '',
//       ragWithContext: ragWithContext || false,
//       userInfo: userInfo || null,
//       status: 'pending'
//     });

//     await astroQuestion.save();

//     let result;

//     // If first message with user info, generate two responses
//     if (userInfo) {
//       console.log('Generating two responses: Intro + AI Answer');
      
//       // Generate intro message
//       const introMessage = `Hi ${userInfo.name}. I find this is your birth date: ${userInfo.birthDate}, birth place: ${userInfo.birthPlace}, birth time: ${formatTimeForDisplay(userInfo.birthTime)}. Let me briefly solve your questions...`;
      
//       // Get AI response
//       const aiResult = await astroRagService.askQuestion(
//         question.trim(),
//         context || '',
//         ragWithContext || false
//       );

//       if (aiResult.success) {
//         // Return both messages as separate responses
//         result = {
//           success: true,
//           data: {
//             question: question.trim(),
//             category: aiResult.data.category,
//             answer: aiResult.data.answer, // Actual AI answer
//             remedy: aiResult.data.remedy,
//             retrievedSources: aiResult.data.retrieved_sources,
//             // Add intro message as separate field
//             introMessage: introMessage,
//             hasIntro: true
//           }
//         };
//       } else {
//         result = aiResult;
//       }
//     } else {
//       // Regular message - single response
//       console.log('Regular message - single response');
//       result = await astroRagService.askQuestion(
//         question.trim(),
//         context || '',
//         ragWithContext || false
//       );
//     }

//     const responseTime = Date.now() - startTime;

//     if (result.success) {
//       // Update database record
//       astroQuestion.category = result.data.category || '';
//       astroQuestion.answer = result.data.answer || '';
//       astroQuestion.remedy = result.data.remedy || '';
//       astroQuestion.retrievedSources = result.data.retrieved_sources || [];
//       astroQuestion.responseTime = responseTime;
//       astroQuestion.status = 'success';
      
//       await astroQuestion.save();

//       console.log('=== BACKEND RESPONSE ===');
//       console.log('Has intro:', result.data.hasIntro);
//       console.log('Intro message:', result.data.introMessage);
//       console.log('AI answer:', result.data.answer);
//       console.log('=====================');

//       return res.status(200).json({
//         success: true,
//         data: {
//           questionId: astroQuestion._id,
//           question: result.data.question || question.trim(),
//           category: result.data.category,
//           answer: result.data.answer,
//           remedy: result.data.remedy,
//           retrievedSources: result.data.retrieved_sources,
//           responseTime,
//           // Include intro data for frontend
//           introMessage: result.data.introMessage,
//           hasIntro: result.data.hasIntro || false
//         }
//       });
//     } else {
//       // Error handling
//       astroQuestion.status = 'failed';
//       astroQuestion.errorMessage = result.error || 'Unknown error';
//       astroQuestion.responseTime = responseTime;
      
//       await astroQuestion.save();

//       return res.status(result.statusCode || 500).json({
//         success: false,
//         message: 'Failed to get answer from Astro API',
//         error: result.error
//       });
//     }
//   } catch (error) {
//     console.error('Error in askQuestion controller:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// // Helper function for time formatting (add this in your controller)
// const formatTimeForDisplay = (timeString) => {
//   if (!timeString) return '';
  
//   const [hours, minutes] = timeString.split(':');
//   const hour = parseInt(hours);
//   const ampm = hour >= 12 ? 'PM' : 'AM';
//   const displayHour = hour % 12 || 12;
  
//   return `${displayHour}:${minutes} ${ampm}`;
// };

// export const getQuestionHistory = async (req, res) => {
//   try {
//     const userId = req.user?._id;
    
//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication required'
//       });
//     }

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const questions = await AstroQuestion.find({ userId })
//       .sort({ createdAt: 1 })
//       .skip(skip)
//       .limit(limit)
//       .select('-__v');

//     const total = await AstroQuestion.countDocuments({ userId });

//     return res.status(200).json({
//       success: true,
//       data: {
//         questions,
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(total / limit),
//           totalQuestions: total,
//           hasMore: skip + questions.length < total
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error in getQuestionHistory:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve question history',
//       error: error.message
//     });
//   }
// };


import AstroQuestion from "../models/AstroQuestion.js"
import astroRagService from "../services/astroRagService.js";
import responseFormatter from "../services/responseFormatter.js";

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

    // Combine conversation context with provided context
    const finalContext = conversationContext + (context || '');

    // Check if user is asking for remedy
    const hasRemedyRequest = isRemedyRequest(question);

    // Extract user's faith/belief system from userInfo if available
    const userFaith = userInfo?.faith || userInfo?.belief || null;

    // Normalize userInfo so AI receives coordinates, religion, and language when available
    let normalizedUserInfo = userInfo || null;
    if (normalizedUserInfo) {
      normalizedUserInfo = { ...normalizedUserInfo };
      // Prefer explicit birthLatitude/birthLongitude; fall back to common aliases
      normalizedUserInfo.birthLatitude = normalizedUserInfo.birthLatitude ?? normalizedUserInfo.latitude ?? normalizedUserInfo.lat ?? normalizedUserInfo.coords?.lat ?? null;
      normalizedUserInfo.birthLongitude = normalizedUserInfo.birthLongitude ?? normalizedUserInfo.longitude ?? normalizedUserInfo.lng ?? normalizedUserInfo.coords?.lng ?? normalizedUserInfo.coords?.lon ?? null;
      // Keep birthPlace for fallback
      normalizedUserInfo.birthPlace = normalizedUserInfo.birthPlace ?? normalizedUserInfo.place ?? normalizedUserInfo.location ?? '';
      // Normalize religion/faith
      normalizedUserInfo.faith = normalizedUserInfo.faith ?? normalizedUserInfo.religion ?? normalizedUserInfo.belief ?? null;
      // Normalize language
      normalizedUserInfo.language = normalizedUserInfo.language ?? normalizedUserInfo.lang ?? null;
    }

    // Call the service with faith parameter; pass normalized user info (with coords if available)
    const result = await astroRagService.askQuestion(
      question.trim(),
      finalContext,
      ragWithContext !== false, // Default to true
      normalizedUserInfo, // Pass normalized userInfo to service for intro handling
      userFaith, // Pass faith for remedy lookup
      user_name // Pass user name for greeting personalization
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