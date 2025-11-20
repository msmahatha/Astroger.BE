// // // // import axios from 'axios';

// // // // class AstroRagService {
// // // //   constructor() {
// // // //     // Prefer explicit env var; in development fall back to local AI server
// // // //     this.baseURL = process.env.ASTRO_API_URL || (process.env.NODE_ENV === 'development' ? 'https://astrolozee-ai-9q2f.onrender.com' : 'https://astrolozee-ai-9q2f.onrender.com');
// // // //     this.apiKey = process.env.ASTRO_API_KEY || 'supersecret@123A$trolzee';

// // // //     if (!this.apiKey) {
// // // //       throw new Error('ASTRO_API_KEY is not defined in environment variables');
// // // //     }
// // // //   }

// // // //   async askQuestion(question, context = '', ragWithContext = false) {
// // // //     try {
// // // //       const response = await axios.post(
// // // //         `${this.baseURL}/astro/ask/`,
// // // //         {
// // // //           question,
// // // //           context,
// // // //           rag_with_context: ragWithContext
// // // //         },
// // // //         {
// // // //           headers: {
// // // //             'accept': 'application/json',
// // // //             'x-api-key': this.apiKey,
// // // //             'Content-Type': 'application/json'
// // // //           },
// // // //           // timeout: 30000 // 30 seconds timeout
// // // //         }
// // // //       );

// // // //       return {
// // // //         success: true,
// // // //         data: response.data
// // // //       };
// // // //     } catch (error) {
// // // //   console.error('Error calling Astro RAG API:', error.message);
// // // //   console.error(error.stack);
      
// // // //       if (error.response) {
// // // //         // API returned an error response
// // // //         return {
// // // //           success: false,
// // // //           error: error.response.data || error.response.data?.detail || 'API request failed',
// // // //           statusCode: error.response.status
// // // //         };
// // // //       } else if (error.request) {
// // // //         // Request was made but no response received
// // // //         return {
// // // //           success: false,
// // // //           error: 'No response from Astro API. Please try again later.',
// // // //           statusCode: 503
// // // //         };
// // // //       } else {
// // // //         // Error in setting up the request
// // // //         return {
// // // //           success: false,
// // // //           error: error.message,
// // // //           statusCode: 500
// // // //         };
// // // //       }
// // // //     }
// // // //   }
// // // // }

// // // // export default new AstroRagService();




// // // import axios from 'axios';

// // // class AstroRagService {
// // //   constructor() {
// // //     // Prefer explicit env var; in development fall back to local AI server
// // //     this.baseURL = process.env.ASTRO_API_URL || (process.env.NODE_ENV === 'development' ? 'https://astrolozee-ai-9q2f.onrender.com' : 'https://astrolozee-ai-9q2f.onrender.com');
// // //     this.apiKey = process.env.ASTRO_API_KEY || 'supersecret@123A$trolzee';

// // //     if (!this.apiKey) {
// // //       throw new Error('ASTRO_API_KEY is not defined in environment variables');
// // //     }
// // //   }

// // //   async askQuestion(question, context = '', ragWithContext = false, userInfo = null) {
// // //     try {
// // //       // If this is the first message and userInfo is provided, generate intro message
// // //       let finalQuestion = question;
// // //       if (userInfo && !ragWithContext) {
// // //         const introMessage = `Hi ${userInfo.name}. I find this is your birth date: ${userInfo.birthDate}, birth place: ${userInfo.birthPlace}, birth time: ${this.formatTimeForDisplay(userInfo.birthTime)}. Let me briefly solve your questions...\n\nUser Question: ${question}`;
// // //         finalQuestion = introMessage;
// // //       }

// // //       const response = await axios.post(
// // //         `${this.baseURL}/astro/ask/`,
// // //         {
// // //           question: finalQuestion,
// // //           context,
// // //           rag_with_context: ragWithContext
// // //         },
// // //         {
// // //           headers: {
// // //             'accept': 'application/json',
// // //             'x-api-key': this.apiKey,
// // //             'Content-Type': 'application/json'
// // //           },
// // //           // timeout: 30000 // 30 seconds timeout
// // //         }
// // //       );

// // //       return {
// // //         success: true,
// // //         data: response.data
// // //       };
// // //     } catch (error) {
// // //       console.error('Error calling Astro RAG API:', error.message);
// // //       console.error(error.stack);
      
// // //       if (error.response) {
// // //         // API returned an error response
// // //         return {
// // //           success: false,
// // //           error: error.response.data || error.response.data?.detail || 'API request failed',
// // //           statusCode: error.response.status
// // //         };
// // //       } else if (error.request) {
// // //         // Request was made but no response received
// // //         return {
// // //           success: false,
// // //           error: 'No response from Astro API. Please try again later.',
// // //           statusCode: 503
// // //         };
// // //       } else {
// // //         // Error in setting up the request
// // //         return {
// // //           success: false,
// // //           error: error.message,
// // //           statusCode: 500
// // //         };
// // //       }
// // //     }
// // //   }

// // //   // Format time for display (convert 24h to 12h format)
// // //   formatTimeForDisplay(timeString) {
// // //     if (!timeString) return '';
    
// // //     const [hours, minutes] = timeString.split(':');
// // //     const hour = parseInt(hours);
// // //     const ampm = hour >= 12 ? 'PM' : 'AM';
// // //     const displayHour = hour % 12 || 12;
    
// // //     return `${displayHour}:${minutes} ${ampm}`;
// // //   }
// // // }

// // // export default new AstroRagService();




// // import axios from 'axios';

// // class AstroRagService {
// //   constructor() {
// //     // Prefer explicit env var; in development fall back to local AI server
// //     this.baseURL = process.env.ASTRO_API_URL || (process.env.NODE_ENV === 'development' ? 'https://astrolozee-ai-9q2f.onrender.com' : 'https://astrolozee-ai-9q2f.onrender.com');
// //     this.apiKey = process.env.ASTRO_API_KEY || 'supersecret@123A$trolzee';

// //     if (!this.apiKey) {
// //       throw new Error('ASTRO_API_KEY is not defined in environment variables');
// //     }
// //   }

// //   async askQuestion(question, context = '', ragWithContext = false, userInfo = null) {
// //     try {
// //       let finalQuestion = question;
// //       let finalContext = context;

// //       // If this is the first message and userInfo is provided, include user info in context
// //       // and let the AI generate the intro message naturally
// //       if (userInfo && !ragWithContext) {
// //         const userInfoContext = `User Information:
// // - Name: ${userInfo.name}
// // - Birth Date: ${userInfo.birthDate}
// // - Birth Time: ${this.formatTimeForDisplay(userInfo.birthTime)}
// // - Birth Place: ${userInfo.birthPlace}`;

// //         // Add user info to the context
// //         finalContext = finalContext ? `${userInfoContext}\n\n${finalContext}` : userInfoContext;
        
// //         // You can also modify the question to prompt the AI to include an intro
// //         // But it's better to let the AI handle it naturally based on the context
// //         finalQuestion = question;
// //       }

// //       console.log('Sending to Astro API:', {
// //         question: finalQuestion,
// //         context: finalContext,
// //         rag_with_context: ragWithContext,
// //         hasUserInfo: !!userInfo
// //       });

// //       const response = await axios.post(
// //         `${this.baseURL}/astro/ask/`,
// //         {
// //           question: finalQuestion,
// //           context: finalContext,
// //           rag_with_context: ragWithContext
// //         },
// //         {
// //           headers: {
// //             'accept': 'application/json',
// //             'x-api-key': this.apiKey,
// //             'Content-Type': 'application/json'
// //           },
// //           timeout: 30000 // 30 seconds timeout
// //         }
// //       );

// //       console.log('Received from Astro API:', response.data);

// //       return {
// //         success: true,
// //         data: response.data
// //       };
// //     } catch (error) {
// //       console.error('Error calling Astro RAG API:', error.message);
// //       console.error('Error details:', {
// //         config: error.config,
// //         response: error.response?.data,
// //         status: error.response?.status
// //       });
      
// //       if (error.response) {
// //         // API returned an error response
// //         return {
// //           success: false,
// //           error: error.response.data?.detail || error.response.data?.error || error.response.data?.message || 'API request failed',
// //           statusCode: error.response.status
// //         };
// //       } else if (error.request) {
// //         // Request was made but no response received
// //         return {
// //           success: false,
// //           error: 'No response from Astro API. Please try again later.',
// //           statusCode: 503
// //         };
// //       } else {
// //         // Error in setting up the request
// //         return {
// //           success: false,
// //           error: error.message,
// //           statusCode: 500
// //         };
// //       }
// //     }
// //   }

// //  async askQuestionWithIntro(question, userInfo, context = '', ragWithContext = false) {
// //   try {
// //     // Generate the intro message
// //     const introMessage = `Hi ${userInfo.name}. I find this is your birth date: ${userInfo.birthDate}, birth place: ${userInfo.birthPlace}, birth time: ${this.formatTimeForDisplay(userInfo.birthTime)}. Let me briefly solve your questions...`;
    
// //     // Combine user info with existing context
// //     const userContext = `User Information:
// // - Name: ${userInfo.name}
// // - Birth Date: ${userInfo.birthDate}
// // - Birth Time: ${userInfo.birthTime}
// // - Birth Place: ${userInfo.birthPlace}`;

// //     const finalContext = context ? `${userContext}\n\n${context}` : userContext;

// //     console.log('=== ASK QUESTION WITH INTRO ===');
// //     console.log('Intro Message:', introMessage);
// //     console.log('Final Context:', finalContext);
// //     console.log('==============================');

// //     const response = await axios.post(
// //       `${this.baseURL}/astro/ask/`,
// //       {
// //         question: question,
// //         context: finalContext,
// //         rag_with_context: ragWithContext
// //       },
// //       {
// //         headers: {
// //           'accept': 'application/json',
// //           'x-api-key': this.apiKey,
// //           'Content-Type': 'application/json'
// //         },
// //         timeout: 30000
// //       }
// //     );

// //     console.log('AI Response:', response.data);

// //     // Prepend the intro message to the AI's response
// //     if (response.data && response.data.answer) {
// //       const combinedAnswer = `${introMessage}\n\n${response.data.answer}`;
// //       return {
// //         success: true,
// //         data: {
// //           ...response.data,
// //           answer: combinedAnswer,
// //           originalAnswer: response.data.answer
// //         }
// //       };
// //     }

// //     return {
// //       success: true,
// //       data: response.data
// //     };

// //   } catch (error) {
// //     console.error('Error calling Astro RAG API with intro:', error.message);
    
// //     if (error.response) {
// //       return {
// //         success: false,
// //         error: error.response.data?.detail || error.response.data?.error || 'API request failed',
// //         statusCode: error.response.status
// //       };
// //     } else if (error.request) {
// //       return {
// //         success: false,
// //         error: 'No response from Astro API. Please try again later.',
// //         statusCode: 503
// //       };
// //     } else {
// //       return {
// //         success: false,
// //         error: error.message,
// //         statusCode: 500
// //       };
// //     }
// //   }
// // }

// //   // Format time for display (convert 24h to 12h format)
// //   formatTimeForDisplay(timeString) {
// //     if (!timeString) return '';
    
// //     try {
// //       const [hours, minutes] = timeString.split(':');
// //       const hour = parseInt(hours);
// //       const ampm = hour >= 12 ? 'PM' : 'AM';
// //       const displayHour = hour % 12 || 12;
      
// //       return `${displayHour}:${minutes} ${ampm}`;
// //     } catch (error) {
// //       console.error('Error formatting time:', error);
// //       return timeString; // Return original if formatting fails
// //     }
// //   }

// //   // Method to generate just the intro message (if needed separately)
// //   generateIntroMessage(userInfo) {
// //     return `Hi ${userInfo.name}. I find this is your birth date: ${userInfo.birthDate}, birth place: ${userInfo.birthPlace}, birth time: ${this.formatTimeForDisplay(userInfo.birthTime)}. Let me briefly solve your questions...`;
// //   }
// // }

// // export default new AstroRagService();





// import axios from 'axios';

// class AstroRagService {
//   constructor() {
//     this.baseURL = process.env.ASTRO_API_URL || 'https://astrolozee-ai-9q2f.onrender.com';
//     this.apiKey = process.env.ASTRO_API_KEY || 'supersecret@123A$trolzee';

//     if (!this.apiKey) {
//       throw new Error('ASTRO_API_KEY is not defined in environment variables');
//     }
//   }

//   async askQuestion(question, context = '', ragWithContext = false, userInfo = null) {
//     try {
//       let finalQuestion = question;
//       let finalContext = context;

//       console.log('=== ASK QUESTION START ===');
//       console.log('Original Question:', question);
//       console.log('User Info:', userInfo);
//       console.log('Has Context:', !!context);
//       console.log('RAG with Context:', ragWithContext);

//       // If user info is provided, include it in the context to personalize responses
//       if (userInfo) {
//         const userInfoContext = `IMPORTANT USER CONTEXT - Use this information to personalize your astrological responses:
// - User Name: ${userInfo.name}
// - Birth Date: ${userInfo.birthDate}
// - Birth Time: ${this.formatTimeForDisplay(userInfo.birthTime)}
// - Birth Place: ${userInfo.birthPlace}

// Please provide specific astrological insights based on this user's birth details when answering their questions.`;

//         finalContext = finalContext ? `${userInfoContext}\n\n${finalContext}` : userInfoContext;
        
//         console.log('User context added to request');
//       }

//       // Prepare the request payload - ensure rag_with_context is properly set
//       const payload = {
//         question: finalQuestion,
//         context: finalContext,
//         rag_with_context: ragWithContext !== false // Default to true if not specified
//       };

//       console.log('Sending to Astro API:', payload);

//       const response = await axios.post(
//         `${this.baseURL}/astro/ask/`,
//         payload,
//         {
//           headers: {
//             'accept': 'application/json',
//             'x-api-key': this.apiKey,
//             'Content-Type': 'application/json'
//           },
//           timeout: 45000 // Increased timeout for better responses
//         }
//       );

//       console.log('Raw API Response:', response.data);

//       // Check if we're getting the generic greeting instead of a real answer
//       const isGenericGreeting = response.data.answer && 
//         response.data.answer.includes('How can I help you today') || 
//         response.data.answer.includes('Hello!');

//       if (isGenericGreeting) {
//         console.log('WARNING: Received generic greeting instead of specific answer');
        
//         // If we have a generic greeting, try to get a more specific response
//         // by modifying the question to be more direct
//         const moreSpecificQuestion = `${question}. Please provide specific astrological insights and avoid generic greetings.`;
        
//         console.log('Retrying with more specific question:', moreSpecificQuestion);
        
//         const retryResponse = await axios.post(
//           `${this.baseURL}/astro/ask/`,
//           {
//             question: moreSpecificQuestion,
//             context: finalContext,
//             rag_with_context: true // Force RAG context for better answers
//           },
//           {
//             headers: {
//               'accept': 'application/json',
//               'x-api-key': this.apiKey,
//               'Content-Type': 'application/json'
//             },
//             timeout: 45000
//           }
//         );

//         console.log('Retry API Response:', retryResponse.data);
        
//         // Use the retry response if it's better
//         if (!retryResponse.data.answer.includes('How can I help you today')) {
//           response.data = retryResponse.data;
//         }
//       }

//       // Process the response for frontend
//       const processedResponse = {
//         ...response.data,
//         hasIntro: false,
//         introMessage: ''
//       };

//       // Generate intro message if this is the first message with user info
//       // if (userInfo) {
//       //   const introMessage = `Hi ${userInfo.name}. I find this is your birth date: ${userInfo.birthDate}, birth place: ${userInfo.birthPlace}, birth time: ${this.formatTimeForDisplay(userInfo.birthTime)}. `;
        
//       //   processedResponse.hasIntro = true;
//       //   processedResponse.introMessage = introMessage;
        
//       //   console.log('Generated intro message for first-time user');
//       // }

//       console.log('Final processed response:', processedResponse);
//       console.log('=== ASK QUESTION END ===');

//       return {
//         success: true,
//         data: processedResponse
//       };

//     } catch (error) {
//       console.error('Error calling Astro RAG API:', error.message);
      
//       if (error.response) {
//         return {
//           success: false,
//           error: error.response.data?.detail || error.response.data?.error || 'API request failed',
//           statusCode: error.response.status
//         };
//       } else if (error.request) {
//         return {
//           success: false,
//           error: 'No response from Astro API. Please try again later.',
//           statusCode: 503
//         };
//       } else {
//         return {
//           success: false,
//           error: error.message,
//           statusCode: 500
//         };
//       }
//     }
//   }

//   // Remove the askQuestionWithIntro method as it's now integrated
//   // Format time for display (convert 24h to 12h format)
//   formatTimeForDisplay(timeString) {
//     if (!timeString) return '';
    
//     try {
//       const [hours, minutes] = timeString.split(':');
//       const hour = parseInt(hours);
//       const ampm = hour >= 12 ? 'PM' : 'AM';
//       const displayHour = hour % 12 || 12;
      
//       return `${displayHour}:${minutes} ${ampm}`;
//     } catch (error) {
//       console.error('Error formatting time:', error);
//       return timeString;
//     }
//   }

//   // Method to generate just the intro message (if needed separately)
//   generateIntroMessage(userInfo) {
//     return `Hi ${userInfo.name}. I find this is your birth date: ${userInfo.birthDate}, birth place: ${userInfo.birthPlace}, birth time: ${this.formatTimeForDisplay(userInfo.birthTime)}. Let me briefly solve your questions...`;
//   }
// }

// export default new AstroRagService();





import axios from 'axios';

class AstroRagService {
  constructor() {
    this.baseURL = process.env.ASTRO_API_URL || 'https://astroger2-0.onrender.com';
    this.apiKey = process.env.ASTRO_API_KEY || 'supersecret@123A$trolzee';

    if (!this.apiKey) {
      throw new Error('ASTRO_API_KEY is not defined in environment variables');
    }
  }

  // Detect if user is asking for remedies
  isRemedyRequest(question) {
    const remedyKeywords = [
      'remedy', 'remedies', 'solution', 'solutions', 'cure', 'cures', 'treatment',
      'how to fix', 'what should i do', 'what to do', 'help me', 'help me with',
      'how can i', 'what can i', 'suggestions', 'suggestion', 'advice', 'tips',
      'totkay', 'upay', 'totke', 'upaay', 'mitigate', 'reduce', 'minimize',
      'practices', 'practice', 'do', 'should do', 'faith', 'aligned'
    ];
    const lowerQuestion = question.toLowerCase();
    return remedyKeywords.some(keyword => lowerQuestion.includes(keyword));
  }

  async askQuestion(question, context = '', ragWithContext = false, userInfo = null, userReligion = null, userLanguage = null, user_name = null) {
    try {
      let finalQuestion = question;
      let finalContext = context;

      console.log('=== ASK QUESTION START ===');
      console.log('Original Question:', question);
      console.log('User Info:', userInfo);
      console.log('Has Context:', !!context);
      console.log('RAG with Context:', ragWithContext);

      // Detect if user is asking for remedy
      const isRemedy = this.isRemedyRequest(question);
      console.log('Is Remedy Request:', isRemedy);

      // If user info is provided, include it in the context to personalize responses
      if (userInfo) {
        // Prefer coordinates when available; include both coords and place for robustness
        const birthLat = userInfo.birthLatitude ?? userInfo.latitude ?? null;
        const birthLon = userInfo.birthLongitude ?? userInfo.longitude ?? null;
        const birthPlace = userInfo.birthPlace || userInfo.place || '';

        const userInfoContext = `IMPORTANT USER CONTEXT - Use this information to personalize your astrological responses:\n` +
          `- User Name: ${userInfo.name}\n` +
          `- Birth Date: ${userInfo.birthDate}\n` +
          `- Birth Time: ${this.formatTimeForDisplay(userInfo.birthTime)}\n` +
          (birthLat && birthLon ? `- Birth Coordinates: ${birthLat}, ${birthLon}\n` : `- Birth Place: ${birthPlace}\n`) +
          (userReligion ? `- Religion: ${userReligion}\n` : (userInfo.religion ? `- Religion: ${userInfo.religion}\n` : '')) +
          (userLanguage ? `- Preferred Language: ${userLanguage}\n` : (userInfo.language ? `- Preferred Language: ${userInfo.language}\n` : '')) +
          `\nPlease provide specific astrological insights based on this user's birth details when answering their questions.`;

        finalContext = finalContext ? `${userInfoContext}\n\n${finalContext}` : userInfoContext;
        
        console.log('User context added to request (coords preferred if available)');

        // Expose normalized user_info in payload (so backend AI can use structured coords)
        // We'll later include this in the payload below as `user_info`
        userInfo._normalized = {
          name: userInfo.name,
          birthDate: userInfo.birthDate,
          birthTime: userInfo.birthTime,
          birthPlace: birthPlace,
          birthLatitude: birthLat,
          birthLongitude: birthLon,
          religion: userInfo.religion || userReligion || '',
          language: userInfo.language || userLanguage || ''
        };
      }

      // If user is asking for remedy, add a system prompt to ensure remedy is provided
      if (isRemedy) {
        const remedyInstructions = `\n\n[REMEDY REQUEST DETECTED]\nThe user is asking for remedies/solutions. You MUST provide comprehensive remedies in the 'remedy' field with:
- Specific practices to follow (DOS)
- Things to avoid (DON'TS)
- Charity or service recommendations\n`;
        finalContext = finalContext ? finalContext + remedyInstructions : remedyInstructions;
      }

      // Prepare the request payload - ensure rag_with_context is properly set
      const payload = {
        question: finalQuestion,
        context: finalContext,
        rag_with_context: ragWithContext !== false, // Default to true if not specified
        includeRemedy: isRemedy, // Pass flag to backend
        user_name: user_name, // Pass user name for greeting personalization
        language: userLanguage || (userInfo && userInfo.language) || undefined,
        religion: userReligion || (userInfo && userInfo.religion) || undefined
      };

      // If normalized user info (including coords) is available, attach it as structured data
      if (userInfo && userInfo._normalized) {
        payload.user_info = userInfo._normalized;
      }

      console.log('Sending to Astro API:', payload);

      const response = await axios.post(
        `${this.baseURL}/astro/ask/`,
        payload,
        {
          headers: {
            'accept': 'application/json',
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json'
          },
          timeout: 45000 // Increased timeout for better responses
        }
      );

      console.log('Raw API Response:', response.data);

      // Check if we're getting the generic greeting instead of a real answer
      const isGenericGreeting = response.data.answer && 
        (response.data.answer.includes('How can I help you today') || 
         response.data.answer.includes('Hello!'));

      if (isGenericGreeting) {
        console.log('WARNING: Received generic greeting instead of specific answer');
        
        // If we have a generic greeting, try to get a more specific response
        // by modifying the question to be more direct
        const moreSpecificQuestion = `${question}. Please provide specific astrological insights and avoid generic greetings.`;
        
        console.log('Retrying with more specific question:', moreSpecificQuestion);
        
        const retryResponse = await axios.post(
          `${this.baseURL}/astro/ask/`,
          {
            question: moreSpecificQuestion,
            context: finalContext,
            rag_with_context: true, // Force RAG context for better answers
            includeRemedy: isRemedy
          },
          {
            headers: {
              'accept': 'application/json',
              'x-api-key': this.apiKey,
              'Content-Type': 'application/json'
            },
            timeout: 45000
          }
        );

        console.log('Retry API Response:', retryResponse.data);
        
        // Use the retry response if it's better
        if (!retryResponse.data.answer.includes('How can I help you today')) {
          response.data = retryResponse.data;
        }
      }

      // Process the response for frontend
      // CRITICAL FIX: Send remedy if USER asked for it (based on isRemedy flag), not based on AI answer mention
      // The isRemedy flag is already set based on user's question keywords
      const processedResponse = {
        ...response.data,
        hasIntro: false,
        introMessage: '',
        // Include remedy if user explicitly asked for it (isRemedy=true)
        // If remedy field is empty despite user asking, it will still be returned
        // (backend fallback ensures it's never completely empty)
        remedy: isRemedy ? (response.data.remedy || '') : ''
      };

      console.log('Final processed response:', processedResponse);
      console.log('=== ASK QUESTION END ===');

      return {
        success: true,
        data: processedResponse
      };

    } catch (error) {
      console.error('Error calling Astro RAG API:', error.message);
      
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        return {
          success: false,
          error: error.response.data?.detail || error.response.data?.error || 'API request failed',
          statusCode: error.response.status
        };
      } else if (error.request) {
        console.error('No response received:', error.request);
        return {
          success: false,
          error: 'No response from Astro API. Please try again later.',
          statusCode: 503
        };
      } else {
        console.error('Request setup error:', error.message);
        return {
          success: false,
          error: error.message,
          statusCode: 500
        };
      }
    }
  }

  // Format time for display (convert 24h to 12h format)
  formatTimeForDisplay(timeString) {
    if (!timeString) return '';
    
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return timeString;
    }
  }

  // Method to generate just the intro message (if needed separately)
  generateIntroMessage(userInfo) {
    return `Hi ${userInfo.name}. I find this is your birth date: ${userInfo.birthDate}, birth place: ${userInfo.birthPlace}, birth time: ${this.formatTimeForDisplay(userInfo.birthTime)}. Let me briefly solve your questions...`;
  }
}

export default new AstroRagService();