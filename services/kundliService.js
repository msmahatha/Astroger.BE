import axios from 'axios';

class KundliService {
  constructor() {
    // Prefer explicit env var; in development fall back to local AI server
    this.baseURL = process.env.ASTRO_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://astrolozee.onrender.com');
    this.apiKey = process.env.ASTRO_API_KEY || 'supersecret@123A$trolzee';

    if (!this.apiKey) {
      throw new Error('ASTRO_API_KEY is not defined in environment variables');
    }
  }

  async generateKundli(kundliData) {
    try {
      const { name, birth_date, birth_time, place, gender } = kundliData;

      // Validation
      if (!name || !birth_date || !birth_time || !place || !gender) {
        return {
          success: false,
          error: 'All fields are required: name, birth_date, birth_time, place, gender',
          statusCode: 400
        };
      }

      const response = await axios.post(
        `${this.baseURL}/astro/generate/`,
        {
          name,
          birth_date,
          birth_time,
          place,
          gender
        },
        {
          headers: {
            'accept': 'application/json',
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json'
          },
        //   timeout: 30000 // 30 seconds timeout
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
  console.error('Error calling Kundli API:', error.message);
  console.error(error.stack);
      
      if (error.response) {
        // API returned an error response
        return {
          success: false,
          error: error.response.data || error.response.data?.detail || 'API request failed',
          statusCode: error.response.status
        };
      } else if (error.request) {
        // Request was made but no response received
        return {
          success: false,
          error: 'No response from Kundli API. Please try again later.',
          statusCode: 503
        };
      } else {
        // Error in setting up the request
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