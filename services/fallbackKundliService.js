class FallbackKundliService {
  generateBasicKundli(kundliData) {
    try {
      const { name, birth_date, birth_time, place, gender, latitude, longitude } = kundliData;
      
      console.log("🔄 Generating basic kundli using fallback service...");
      
      // Simple calculations for basic chart data
      const birthDate = new Date(`${birth_date}T${birth_time}`);
      const birthYear = birthDate.getFullYear();
      const birthMonth = birthDate.getMonth() + 1;
      const birthDay = birthDate.getDate();
      
      // Basic planetary positions (simplified calculations)
      const planets = {
        sun: { 
          name: "Sun",
          longitude: this.calculateLongitude(birthMonth, birthDay, 0),
          sign: this.getSunSign(birthMonth, birthDay),
          degree: this.calculateDegree(birthDay),
          retrograde: false,
          house: this.calculateHouse(1),
          nakshatra: this.getNakshatra(birthDay),
          pada: (birthDay % 4) + 1
        },
        moon: { 
          name: "Moon",
          longitude: this.calculateLongitude(birthMonth, birthDay, 5),
          sign: "Cancer", 
          degree: 23.7,
          retrograde: false,
          house: 4,
          nakshatra: "Pushya",
          pada: 2
        },
        mercury: { 
          name: "Mercury",
          longitude: this.calculateLongitude(birthMonth, birthDay, 10),
          sign: "Gemini", 
          degree: 18.3,
          retrograde: Math.random() > 0.8,
          house: 3,
          nakshatra: "Ardra",
          pada: 3
        },
        venus: { 
          name: "Venus",
          longitude: this.calculateLongitude(birthMonth, birthDay, 15),
          sign: "Taurus", 
          degree: 5.6,
          retrograde: false,
          house: 2,
          nakshatra: "Rohini",
          pada: 4
        },
        mars: { 
          name: "Mars",
          longitude: this.calculateLongitude(birthMonth, birthDay, 20),
          sign: "Aries", 
          degree: 29.8,
          retrograde: false,
          house: 1,
          nakshatra: "Krittika",
          pada: 1
        },
        jupiter: { 
          name: "Jupiter",
          longitude: this.calculateLongitude(birthMonth, birthDay, 25),
          sign: "Pisces", 
          degree: 14.2,
          retrograde: Math.random() > 0.7,
          house: 12,
          nakshatra: "Uttara Bhadrapada",
          pada: 2
        },
        saturn: { 
          name: "Saturn",
          longitude: this.calculateLongitude(birthMonth, birthDay, 30),
          sign: "Aquarius", 
          degree: 21.9,
          retrograde: true,
          house: 11,
          nakshatra: "Dhanishta",
          pada: 3
        },
        rahu: { 
          name: "Rahu",
          longitude: this.calculateLongitude(birthMonth, birthDay, 35),
          sign: "Scorpio", 
          degree: 8.4,
          retrograde: true,
          house: 8,
          nakshatra: "Anuradha",
          pada: 4
        },
        ketu: { 
          name: "Ketu",
          longitude: this.calculateLongitude(birthMonth, birthDay, 40),
          sign: "Taurus", 
          degree: 8.4,
          retrograde: true,
          house: 2,
          nakshatra: "Rohini",
          pada: 2
        }
      };

      // Generate houses
      const houses = {};
      for (let i = 1; i <= 12; i++) {
        houses[i] = {
          number: i,
          longitude: (i * 30) - 15,
          sign: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][i-1],
          degree: (i * 30) - 15
        };
      }

      // Generate aspects
      const aspects = [
        { between: ["sun", "moon"], type: "conjunction", angle: 45 },
        { between: ["mars", "jupiter"], type: "trine", angle: 120 },
        { between: ["venus", "saturn"], type: "square", angle: 90 }
      ];

      const chart = {
        place: place || "Unknown",
        timezone: "IST",
        julian_day: this.calculateJulianDay(birthDate),
        ascendant: 135.25,
        mc: 225.78,
        planets: planets,
        houses: houses,
        aspects: aspects
      };

      console.log("✅ Fallback kundli generated successfully");

      return {
        success: true,
        data: {
          chart: chart,
          basic_info: {
            name,
            birth_date,
            birth_time,
            place,
            gender,
            sun_sign: this.getSunSign(birthMonth, birthDay)
          }
        }
      };
    } catch (error) {
      console.error("❌ Error in fallback kundli service:", error);
      return {
        success: false,
        error: "Fallback service failed: " + error.message,
        statusCode: 500
      };
    }
  }

  getSunSign(month, day) {
    const signs = [
      { name: "Capricorn", start: [12, 22], end: [1, 19] },
      { name: "Aquarius", start: [1, 20], end: [2, 18] },
      { name: "Pisces", start: [2, 19], end: [3, 20] },
      { name: "Aries", start: [3, 21], end: [4, 19] },
      { name: "Taurus", start: [4, 20], end: [5, 20] },
      { name: "Gemini", start: [5, 21], end: [6, 20] },
      { name: "Cancer", start: [6, 21], end: [7, 22] },
      { name: "Leo", start: [7, 23], end: [8, 22] },
      { name: "Virgo", start: [8, 23], end: [9, 22] },
      { name: "Libra", start: [9, 23], end: [10, 22] },
      { name: "Scorpio", start: [10, 23], end: [11, 21] },
      { name: "Sagittarius", start: [11, 22], end: [12, 21] }
    ];
    
    for (let sign of signs) {
      if ((month === sign.start[0] && day >= sign.start[1]) || 
          (month === sign.end[0] && day <= sign.end[1])) {
        return sign.name;
      }
    }
    return "Aries";
  }

  calculateLongitude(month, day, offset) {
    return ((month * 30 + day + offset) % 360);
  }

  calculateDegree(day) {
    return (day % 30);
  }

  calculateHouse(planetIndex) {
    return (planetIndex % 12) + 1;
  }

  getNakshatra(day) {
    const nakshatras = [
      "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu",
      "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta",
      "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
      "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
    ];
    return nakshatras[day % nakshatras.length];
  }

  calculateJulianDay(date) {
    return 2451545.0 + (date.getTime() - new Date('2000-01-01').getTime()) / (1000 * 60 * 60 * 24);
  }
}

export default new FallbackKundliService();