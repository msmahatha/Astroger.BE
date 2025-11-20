# Astrology API Integration

This integration provides access to Indian Vedic Astrology calculations through [astrologyapi.com](https://astrologyapi.com/docs/indian-astrology).

## Setup

### 1. Get API Credentials

1. Sign up at [astrologyapi.com](https://astrologyapi.com)
2. Get your User ID and API Key from the dashboard

### 2. Add Environment Variables

Add these to your `.env` file:

```env
ASTROLOGY_API_USER_ID=your_user_id
ASTROLOGY_API_KEY=your_api_key
```

### 3. Test the Integration

Start your server and test with:

```bash
curl -X POST http://localhost:5000/api/astrology/birth-details \
  -H "Content-Type: application/json" \
  -d '{
    "day": 15,
    "month": 8,
    "year": 1990,
    "hour": 10,
    "min": 30,
    "lat": 28.6139,
    "lon": 77.2090,
    "tzone": 5.5
  }'
```

## Available Endpoints

All endpoints are POST requests to `http://localhost:5000/api/astrology/`

### Birth & Planetary Information

#### 1. Birth Details
**Endpoint:** `/birth-details`

Returns comprehensive birth details including Panchang.

**Request Body:**
```json
{
  "day": 15,
  "month": 8,
  "year": 1990,
  "hour": 10,
  "min": 30,
  "lat": 28.6139,
  "lon": 77.2090,
  "tzone": 5.5
}
```

#### 2. Planetary Positions
**Endpoint:** `/planets`

Returns positions of all planets in the birth chart.

#### 3. Ascendant Report
**Endpoint:** `/ascendant-report`

Detailed report about the ascendant (rising sign).

#### 4. Planet Report
**Endpoint:** `/planet-report`

Detailed report for a specific planet.

**Additional Parameter:**
- `planet`: "sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"

### Dasha Systems

#### 5. Vimshottari Dasha
**Endpoint:** `/vimshottari-dasha`

Complete Vimshottari Dasha periods.

#### 6. Current Vimshottari Dasha
**Endpoint:** `/current-vimshottari-dasha`

Currently running Mahadasha, Antardasha, and Pratyantardasha.

### Horoscope Reports

#### 7. General Horoscope
**Endpoint:** `/general-horoscope`

Comprehensive horoscope report covering all aspects of life.

#### 8. KP Horoscope
**Endpoint:** `/kp-horoscope`

Krishnamurti Paddhati horoscope with significators.

### Charts

#### 9. Divisional Charts
**Endpoint:** `/divisional-chart`

Get any divisional chart (D1 to D60).

**Additional Parameter:**
- `chart_type`: "D1", "D2", "D3", "D4", "D7", "D9", "D10", "D12", "D16", "D20", "D24", "D27", "D30", "D40", "D45", "D60"

Common charts:
- **D1** (Rashi): Main birth chart
- **D9** (Navamsa): Marriage and spouse
- **D10** (Dasamsa): Career and profession
- **D12** (Dwadasamsa): Parents

### Panchang

#### 10. Basic Panchang
**Endpoint:** `/basic-panchang`

Tithi, Vara, Nakshatra, Yoga, Karana.

#### 11. Advanced Panchang
**Endpoint:** `/advanced-panchang`

Detailed Panchang with timings and more details.

### Matching & Compatibility

#### 12. Ashtakoot Match
**Endpoint:** `/ashtakoot-match`

Gun Milan for marriage compatibility (out of 36 points).

**Request Body:**
```json
{
  "m_day": 15,
  "m_month": 8,
  "m_year": 1990,
  "m_hour": 10,
  "m_min": 30,
  "m_lat": 28.6139,
  "m_lon": 77.2090,
  "m_tzone": 5.5,
  "f_day": 20,
  "f_month": 6,
  "f_year": 1992,
  "f_hour": 14,
  "f_min": 45,
  "f_lat": 19.0760,
  "f_lon": 72.8777,
  "f_tzone": 5.5
}
```

#### 13. Manglik Report
**Endpoint:** `/manglik`

Check for Manglik Dosha and its severity.

## Common Parameters

- **day**: Day of birth (1-31)
- **month**: Month of birth (1-12)
- **year**: Year of birth (e.g., 1990)
- **hour**: Hour of birth in 24-hour format (0-23)
- **min**: Minute of birth (0-59)
- **lat**: Latitude (decimal degrees, e.g., 28.6139)
- **lon**: Longitude (decimal degrees, e.g., 77.2090)
- **tzone**: Timezone offset from UTC (e.g., 5.5 for IST)

## Example: Frontend Integration

```javascript
// Example: Get birth details
const getBirthDetails = async (birthData) => {
  try {
    const response = await fetch('http://localhost:5000/api/astrology/birth-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        day: birthData.day,
        month: birthData.month,
        year: birthData.year,
        hour: birthData.hour,
        min: birthData.min,
        lat: birthData.latitude,
        lon: birthData.longitude,
        tzone: 5.5 // IST
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('Birth Details:', result.data);
      return result.data;
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
};

// Example: Get planetary positions
const getPlanets = async (birthData) => {
  const response = await fetch('http://localhost:5000/api/astrology/planets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(birthData)
  });
  return await response.json();
};

// Example: Match making
const checkCompatibility = async (male, female) => {
  const response = await fetch('http://localhost:5000/api/astrology/ashtakoot-match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      m_day: male.day,
      m_month: male.month,
      m_year: male.year,
      m_hour: male.hour,
      m_min: male.min,
      m_lat: male.lat,
      m_lon: male.lon,
      m_tzone: male.tzone,
      f_day: female.day,
      f_month: female.month,
      f_year: female.year,
      f_hour: female.hour,
      f_min: female.min,
      f_lat: female.lat,
      f_lon: female.lon,
      f_tzone: female.tzone
    })
  });
  return await response.json();
};
```

## Timezone Helper

For Indian Standard Time (IST): `tzone = 5.5`

Common timezones:
- IST (India): 5.5
- PST (USA West): -8
- EST (USA East): -5
- GMT (UK): 0
- JST (Japan): 9

## Response Format

All endpoints return:

```json
{
  "success": true,
  "data": {
    // API response data
  }
}
```

On error:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Rate Limits

Check [astrologyapi.com pricing](https://astrologyapi.com/pricing) for rate limits and subscription plans.

## Support

For API documentation and support:
- Documentation: https://astrologyapi.com/docs/indian-astrology
- Support: Contact through astrologyapi.com

## Notes

- All calculations are based on Vedic/Indian astrology
- Use sidereal zodiac (Lahiri Ayanamsa)
- Coordinates should be in decimal degrees
- Time should be in 24-hour format
- Ensure accurate birth time for precise results
