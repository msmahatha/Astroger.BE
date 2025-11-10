// // import axios from 'axios';

// // class KundliService {
// //   constructor() {
// //     // Prefer explicit env var; in development fall back to local AI server
// //     this.baseURL = process.env.ASTRO_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://astrolozee.onrender.com');
// //     this.apiKey = process.env.ASTRO_API_KEY || 'supersecret@123A$trolzee';

// //     if (!this.apiKey) {
// //       throw new Error('ASTRO_API_KEY is not defined in environment variables');
// //     }
// //   }

// //   async generateKundli(kundliData) {
// //     try {
// //       const { name, birth_date, birth_time, place, gender, latitude, longitude } = kundliData;

// //       // Validation: require name, birth_date, birth_time, gender and either place string or coordinates
// //       if (!name || !birth_date || !birth_time || !gender || (!place && (latitude == null || longitude == null))) {
// //         return {
// //           success: false,
// //           error: 'All fields are required: name, birth_date, birth_time, gender and (place or latitude+longitude)',
// //           statusCode: 400
// //         };
// //       }

// //       // Build payload for external Kundli API. Include coordinates when available to avoid geocoding failures.
// //       const payload = {
// //         name,
// //         birth_date,
// //         birth_time,
// //         gender,
// //       };
// //       if (place) payload.place = place;
// //       if (latitude != null && longitude != null) {
// //         payload.latitude = latitude;
// //         payload.longitude = longitude;
// //       }

// //       const response = await axios.post(
// //         `${this.baseURL}/astro/generate/`,
// //         payload,
// //         {
// //           headers: {
// //             'accept': 'application/json',
// //             'x-api-key': this.apiKey,
// //             'Content-Type': 'application/json'
// //           },
// //         //   timeout: 30000 // 30 seconds timeout
// //         }
// //       );

// //       return {
// //         success: true,
// //         data: response.data
// //       };
// //     } catch (error) {
// //   console.error('Error calling Kundli API:', error.message);
// //   console.error(error.stack);
      
// //       if (error.response) {
// //         // API returned an error response
// //         return {
// //           success: false,
// //           error: error.response.data || error.response.data?.detail || 'API request failed',
// //           statusCode: error.response.status
// //         };
// //       } else if (error.request) {
// //         // Request was made but no response received
// //         return {
// //           success: false,
// //           error: 'No response from Kundli API. Please try again later.',
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
// // }

// // export default new KundliService();


// import axios from 'axios';

// class KundliService {
//   constructor() {
//     // Use the correct backend URL
//     this.baseURL = process.env.REACT_APP_ASTRO_API_URL || 'http://localhost:5000';
//     this.apiKey = process.env.REACT_APP_ASTRO_API_KEY || 'supersecret@123A$trolzee';

//     if (!this.apiKey) {
//       throw new Error('REACT_APP_ASTRO_API_KEY is not defined in environment variables');
//     }
//   }

//   async generateKundli(kundliData) {
//     try {
//       const { name, birth_date, birth_time, place, gender, latitude, longitude } = kundliData;

//       // Enhanced validation
//       if (!name?.trim()) {
//         return {
//           success: false,
//           error: 'Name is required',
//           statusCode: 400
//         };
//       }

//       if (!birth_date) {
//         return {
//           success: false,
//           error: 'Birth date is required',
//           statusCode: 400
//         };
//       }

//       if (!birth_time) {
//         return {
//           success: false,
//           error: 'Birth time is required',
//           statusCode: 400
//         };
//       }

//       if (!gender) {
//         return {
//           success: false,
//           error: 'Gender is required',
//           statusCode: 400
//         };
//       }

//       if (!place && (latitude == null || longitude == null)) {
//         return {
//           success: false,
//           error: 'Either place or latitude and longitude are required',
//           statusCode: 400
//         };
//       }

//       // Build payload - ensure consistent field names
//       const payload = {
//         name: name.trim(),
//         birth_date,
//         birth_time,
//         gender,
//         place: place || '',
//       };
      
//       // Only add coordinates if provided
//       if (latitude != null && longitude != null) {
//         payload.latitude = parseFloat(latitude);
//         payload.longitude = parseFloat(longitude);
//       }

//       console.log('Sending payload to Kundli API:', payload);

//       const response = await axios.post(
//         `${this.baseURL}/api/kundli/generate`, // Fixed endpoint
//         payload,
//         {
//           headers: {
//             'accept': 'application/json',
//             'x-api-key': this.apiKey,
//             'Content-Type': 'application/json'
//           },
//           timeout: 30000
//         }
//       );

//       return {
//         success: true,
//         data: response.data
//       };
//     } catch (error) {
//       console.error('Error calling Kundli API:', error.message);
      
//       if (error.response) {
//         // API returned an error response
//         const errorData = error.response.data;
//         return {
//           success: false,
//           error: errorData.message || errorData.error || 'API request failed',
//           statusCode: error.response.status,
//           details: errorData.error // Include detailed error if available
//         };
//       } else if (error.request) {
//         // Request was made but no response received
//         return {
//           success: false,
//           error: 'No response from Kundli API. Please try again later.',
//           statusCode: 503
//         };
//       } else {
//         // Error in setting up the request
//         return { 
//           success: false,
//           error: error.message,
//           statusCode: 500
//         };
//       }
//     }
//   }
// }

// export default new KundliService();

import axios from 'axios';

class KundliService {
  constructor() {
    // Use the correct backend URL - check if this is the right external API URL
    this.baseURL = process.env.ASTRO_API_URL || 'https://astrolozee.onrender.com';
    this.apiKey = process.env.ASTRO_API_KEY || 'supersecret@123A$trolzee';

    if (!this.apiKey) {
      throw new Error('ASTRO_API_KEY is not defined in environment variables');
    }

    console.log('KundliService initialized with:', {
      baseURL: this.baseURL,
      hasApiKey: !!this.apiKey
    });
  }

  async generateKundli(kundliData) {
    try {
      const { name, birth_date, birth_time, place, gender, latitude, longitude } = kundliData;

      // Enhanced validation
      if (!name?.trim()) {
        return {
          success: false,
          error: 'Name is required',
          statusCode: 400
        };
      }

      if (!birth_date) {
        return {
          success: false,
          error: 'Birth date is required',
          statusCode: 400
        };
      }

      if (!birth_time) {
        return {
          success: false,
          error: 'Birth time is required',
          statusCode: 400
        };
      }

      if (!gender) {
        return {
          success: false,
          error: 'Gender is required',
          statusCode: 400
        };
      }

      if (!place && (latitude == null || longitude == null)) {
        return {
          success: false,
          error: 'Either place or latitude and longitude are required',
          statusCode: 400
        };
      }

      // Build payload exactly as external API expects
      const payload = {
        name: name.trim(),
        birth_date,
        birth_time,
        gender: gender.toLowerCase(), // Some APIs expect lowercase
        place: place || '',
      };
      
      // Only add coordinates if provided
      if (latitude != null && longitude != null) {
        payload.latitude = parseFloat(latitude);
        payload.longitude = parseFloat(longitude);
      }

      console.log('🔐 Sending to external API:', {
        url: `${this.baseURL}/astro/generate/`,
        payload: payload,
        apiKey: this.apiKey ? '***' + this.apiKey.slice(-4) : 'missing'
      });

      // Try different authentication methods
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      // Method 1: x-api-key header (most common)
      headers['x-api-key'] = this.apiKey;

      // Method 2: Also try Authorization header as backup
      headers['Authorization'] = `Bearer ${this.apiKey}`;

      const response = await axios.post(
        `${this.baseURL}/astro/generate/`,
        payload,
        {
          headers,
          timeout: 45000, // 45 seconds for external API
          validateStatus: function (status) {
            return status < 500; // Resolve only if status code < 500
          }
        }
      );

      console.log('✅ External API response status:', response.status);
      console.log('✅ External API response data:', response.data);

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('❌ Error calling external Kundli API:', error.message);
      
      // Detailed error logging
      if (error.response) {
        console.error('🔍 External API Error Details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });
        
        return {
          success: false,
          error: error.response.data?.detail || error.response.data?.message || error.response.data || `External API error: ${error.response.status}`,
          statusCode: error.response.status,
          details: error.response.data
        };
      } else if (error.request) {
        console.error('🔍 No response received:', error.request);
        return {
          success: false,
          error: 'No response from external Kundli API. Service might be down.',
          statusCode: 503
        };
      } else {
        console.error('🔍 Request setup error:', error.message);
        return { 
          success: false,
          error: error.message,
          statusCode: 500
        };
      }
    }
  }
}

export default new KundliService();