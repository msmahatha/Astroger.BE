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

export const askQuestion = async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { question, context, ragWithContext, userInfo } = req.body;

    console.log('=== BACKEND RECEIVED ===');
    console.log('Question:', question);
    console.log('UserInfo:', userInfo);
    console.log('=====================');

    if (!question || question.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Question is required'
      });
    }

    const userId = req.user?._id;

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

    // Call the service - it now handles both regular and intro messages
    const result = await astroRagService.askQuestion(
      question.trim(),
      context || '',
      ragWithContext !== false, // Default to true
      userInfo // Pass userInfo to service for intro handling
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
        answer: result.data.answer,
        remedy: result.data.remedy,
        retrievedSources: result.data.retrieved_sources,
        responseTime,
        // Include intro data for frontend to handle display
        introMessage: result.data.introMessage || '',
        hasIntro: result.data.hasIntro || false
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