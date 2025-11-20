import express from 'express';
import * as astrologyService from '../services/astrologyApiService.js';

const router = express.Router();

// Helper function to validate required params
const validateParams = (params, requiredFields) => {
  const missing = requiredFields.filter(field => !params[field]);
  if (missing.length > 0) {
    return { valid: false, message: `Missing required fields: ${missing.join(', ')}` };
  }
  return { valid: true };
};

/**
 * POST /api/astrology/birth-details
 * Get birth details / panchang
 * Required: day, month, year, hour, min, lat, lon, tzone
 */
router.post('/birth-details', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getBirthDetails(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/planets
 * Get planetary positions
 */
router.post('/planets', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getPlanetaryPositions(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/ascendant-report
 * Get ascendant report
 */
router.post('/ascendant-report', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getAscendantReport(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/planet-report
 * Get planet report
 * Required additional: planet (sun, moon, mars, mercury, jupiter, venus, saturn)
 */
router.post('/planet-report', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone', 'planet']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getPlanetReport(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/vimshottari-dasha
 * Get Vimshottari Dasha
 */
router.post('/vimshottari-dasha', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getVimshottariDasha(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/current-vimshottari-dasha
 * Get current Vimshottari Dasha
 */
router.post('/current-vimshottari-dasha', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getCurrentVimshottariDasha(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/general-horoscope
 * Get general horoscope report
 */
router.post('/general-horoscope', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getGeneralHoroscopeReport(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/kp-horoscope
 * Get KP horoscope
 */
router.post('/kp-horoscope', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getKPHoroscope(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/divisional-chart
 * Get divisional chart
 * Required additional: chart_type (D1, D2, D3, D4, D7, D9, D10, D12, D16, D20, D24, D27, D30, D40, D45, D60)
 */
router.post('/divisional-chart', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone', 'chart_type']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getDivisionalChart(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/basic-panchang
 * Get basic panchang
 */
router.post('/basic-panchang', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getBasicPanchang(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/advanced-panchang
 * Get advanced panchang
 */
router.post('/advanced-panchang', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getAdvancedPanchang(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/ashtakoot-match
 * Match making - Ashtakoot points
 * Required: m_day, m_month, m_year, m_hour, m_min, m_lat, m_lon, m_tzone, f_day, f_month, f_year, f_hour, f_min, f_lat, f_lon, f_tzone
 */
router.post('/ashtakoot-match', async (req, res) => {
  try {
    const validation = validateParams(req.body, [
      'm_day', 'm_month', 'm_year', 'm_hour', 'm_min', 'm_lat', 'm_lon', 'm_tzone',
      'f_day', 'f_month', 'f_year', 'f_hour', 'f_min', 'f_lat', 'f_lon', 'f_tzone'
    ]);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getAshtakootPoints(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/astrology/manglik
 * Get Manglik report
 */
router.post('/manglik', async (req, res) => {
  try {
    const validation = validateParams(req.body, ['day', 'month', 'year', 'hour', 'min', 'lat', 'lon', 'tzone']);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await astrologyService.getManglikReport(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
