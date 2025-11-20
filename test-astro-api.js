import 'dotenv/config';
import axios from 'axios';

const USER_ID = process.env.ASTROLOGY_API_USER_ID;
const API_KEY = process.env.ASTROLOGY_API_KEY;

console.log('Testing with USER_ID:', USER_ID);
console.log('API_KEY length:', API_KEY?.length);

const client = axios.create({
  baseURL: 'https://json.astrologyapi.com/v1',
  auth: {
    username: USER_ID,
    password: API_KEY
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

const testData = {
  day: 15,
  month: 8,
  year: 1990,
  hour: 10,
  min: 30,
  lat: 28.6139,
  lon: 77.2090,
  tzone: 5.5
};

client.post('/birth_details', testData)
  .then(response => {
    console.log('SUCCESS! Response:', JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error('ERROR:', error.response?.data || error.message);
  });
