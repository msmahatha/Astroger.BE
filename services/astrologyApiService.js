import axios from 'axios';

const ASTROLOGY_API_BASE_URL = 'https://json.astrologyapi.com/v1';
const USER_ID = process.env.ASTROLOGY_API_USER_ID || 'your_user_id';
const API_KEY = process.env.ASTROLOGY_API_KEY || 'your_api_key';

console.log('AstrologyAPI Service initialized with USER_ID:', USER_ID);

// Create axios instance with basic auth
const astrologyApiClient = axios.create({
  baseURL: ASTROLOGY_API_BASE_URL,
  auth: {
    username: USER_ID,
    password: API_KEY
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Get Birth Details / Panchang
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getBirthDetails = async (params) => {
  try {
    const response = await astrologyApiClient.post('/birth_details', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching birth details:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Planetary Positions
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getPlanetaryPositions = async (params) => {
  try {
    const response = await astrologyApiClient.post('/planets', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching planetary positions:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Ascendant Report
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getAscendantReport = async (params) => {
  try {
    const response = await astrologyApiClient.post('/ascendant_report', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching ascendant report:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Planet Report
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone, planet }
 */
export const getPlanetReport = async (params) => {
  try {
    const response = await astrologyApiClient.post('/planet_report', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching planet report:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Vimshottari Dasha
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getVimshottariDasha = async (params) => {
  try {
    const response = await astrologyApiClient.post('/major_vdasha', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching Vimshottari Dasha:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Current Vimshottari Dasha
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getCurrentVimshottariDasha = async (params) => {
  try {
    const response = await astrologyApiClient.post('/current_vdasha', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching current Vimshottari Dasha:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Yogini Dasha
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getYoginiDasha = async (params) => {
  try {
    const response = await astrologyApiClient.post('/major_yogini_dasha', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching Yogini Dasha:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Char Dasha
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getCharDasha = async (params) => {
  try {
    const response = await astrologyApiClient.post('/major_chara_dasha', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching Char Dasha:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get General Horoscope Report
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getGeneralHoroscopeReport = async (params) => {
  try {
    const response = await astrologyApiClient.post('/general_horoscope', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching general horoscope report:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get KP Horoscope
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getKPHoroscope = async (params) => {
  try {
    const response = await astrologyApiClient.post('/kp_horoscope', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching KP horoscope:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Divisional Charts
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone, chart_type }
 * chart_type: D1, D2, D3, D4, D7, D9, D10, D12, D16, D20, D24, D27, D30, D40, D45, D60
 */
export const getDivisionalChart = async (params) => {
  try {
    const response = await astrologyApiClient.post('/divisional_charts', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching divisional chart:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Ashtakvarga
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone, planet }
 */
export const getAshtakvarga = async (params) => {
  try {
    const response = await astrologyApiClient.post('/ashtakvarga', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching Ashtakvarga:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Sarvashtak
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getSarvashtak = async (params) => {
  try {
    const response = await astrologyApiClient.post('/sarvashtak', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching Sarvashtak:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Basic Panchang
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getBasicPanchang = async (params) => {
  try {
    const response = await astrologyApiClient.post('/basic_panchang', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching basic panchang:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get Advanced Panchang
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getAdvancedPanchang = async (params) => {
  try {
    const response = await astrologyApiClient.post('/advanced_panchang', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching advanced panchang:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Match Making - Ashtakoot Points
 * @param {Object} params - { m_day, m_month, m_year, m_hour, m_min, m_lat, m_lon, m_tzone, f_day, f_month, f_year, f_hour, f_min, f_lat, f_lon, f_tzone }
 */
export const getAshtakootPoints = async (params) => {
  try {
    const response = await astrologyApiClient.post('/match_ashtakoot_points', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching Ashtakoot points:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Match Making - Manglik Report
 * @param {Object} params - { day, month, year, hour, min, lat, lon, tzone }
 */
export const getManglikReport = async (params) => {
  try {
    const response = await astrologyApiClient.post('/manglik', params);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching Manglik report:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

export default {
  getBirthDetails,
  getPlanetaryPositions,
  getAscendantReport,
  getPlanetReport,
  getVimshottariDasha,
  getCurrentVimshottariDasha,
  getYoginiDasha,
  getCharDasha,
  getGeneralHoroscopeReport,
  getKPHoroscope,
  getDivisionalChart,
  getAshtakvarga,
  getSarvashtak,
  getBasicPanchang,
  getAdvancedPanchang,
  getAshtakootPoints,
  getManglikReport
};
