// // import Kundli from "../models/Kundli.js";
// // import kundliService from "../services/kundliService.js";

// // export const generateKundli = async (req, res) => {
// //   const startTime = Date.now();
  
// //   try {
// //     const { name, birth_date, birth_time, place, gender, latitude, longitude } = req.body;

// //     // Validation: require name, birth_date, birth_time, gender and either a place string or coordinates
// //     if (!name || !birth_date || !birth_time || !gender || (!place && (latitude == null || longitude == null))) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'All fields are required: name, birth_date, birth_time, gender and (place or latitude+longitude)'
// //       });
// //     }

// //     // Validate gender
// //     if (!['Male', 'Female', 'Other'].includes(gender)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Gender must be Male, Female, or Other'
// //       });
// //     }

// //     // Get userId from authenticated user (if using auth middleware)
// //     const userId = req.user?._id;

// //     // Create database record
// //     const kundli = new Kundli({
// //       userId,
// //       name: name.trim(),
// //       birth_date,
// //       birth_time,
// //       place: place ? place.trim() : '',
// //       latitude: latitude ?? null,
// //       longitude: longitude ?? null,
// //       gender,
// //       status: 'pending'
// //     });

// //     await kundli.save();

// //     // Call the Kundli API
// //     const result = await kundliService.generateKundli({
// //       name: name.trim(),
// //       birth_date,
// //       birth_time,
// //       place: place ? place.trim() : undefined,
// //       latitude: latitude ?? undefined,
// //       longitude: longitude ?? undefined,
// //       gender
// //     });

// //     const responseTime = Date.now() - startTime;

// //     if (result.success) {
// //       // Update database record with successful response
// //       kundli.chart = result.data.chart;
// //       kundli.responseTime = responseTime;
// //       kundli.status = 'success';
      
// //       await kundli.save();

// //       return res.status(200).json({
// //         success: true,
// //         data: {
// //           kundliId: kundli._id,
// //           name: result.data.name,
// //           birth_date: result.data.birth_date,
// //           birth_time: result.data.birth_time,
// //           place: result.data.place,
// //           gender: result.data.gender,
// //           chart: result.data.chart,
// //           responseTime
// //         }
// //       });
// //     } else {
// //       // Update database record with error
// //       kundli.status = 'failed';
// //       kundli.errorMessage = typeof result.error === 'string' 
// //         ? result.error 
// //         : JSON.stringify(result.error);
// //       kundli.responseTime = responseTime;
      
// //       await kundli.save();

// //       return res.status(result.statusCode || 500).json({
// //         success: false,
// //         message: 'Failed to generate Kundli',
// //         error: result.error
// //       });
// //     }
// //   } catch (error) {
// //     console.error('Error in generateKundli controller:', error);
// //     return res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };










// // import Kundli from "../models/Kundli.js";
// // import kundliService from "../services/kundliService.js";

// // export const generateKundli = async (req, res) => {
// //   const startTime = Date.now();

// //   try {
// //     const { name, birth_date, birth_time, place, gender, latitude, longitude } = req.body;

// //     // Basic validation
// //     if (!name || !birth_date || !birth_time || !gender || (!place && (latitude == null || longitude == null))) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "All fields are required: name, birth_date, birth_time, gender, and (place or latitude+longitude)",
// //       });
// //     }

// //     // Gender validation
// //     const validGenders = ["Male", "Female", "Other"];
// //     if (!validGenders.includes(gender)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Gender must be Male, Female, or Other",
// //       });
// //     }

// //     const userId = req.user?._id || null;

// //     // Create an initial record
// //     const kundli = new Kundli({
// //       userId,
// //       name: name.trim(),
// //       birth_date,
// //       birth_time,
// //       place: place?.trim() || "",
// //       latitude: latitude ?? null,
// //       longitude: longitude ?? null,
// //       gender,
// //       status: "pending",
// //     });

// //     await kundli.save();

// //     console.log("➡️ Calling Kundli API with data:", {
// //       name,
// //       birth_date,
// //       birth_time,
// //       place,
// //       gender,
// //       latitude,
// //       longitude,
// //     });

// //     // Call the external API service
// //     const result = await kundliService.generateKundli({
// //       name: name.trim(),
// //       birth_date,
// //       birth_time,
// //       place: place?.trim(),
// //       latitude,
// //       longitude,
// //       gender,
// //     });

// //     const responseTime = Date.now() - startTime;

// //     if (result.success) {
// //       kundli.chart = result.data.chart || result.data;
// //       kundli.responseTime = responseTime;
// //       kundli.status = "success";
// //       await kundli.save();

// //       return res.status(200).json({
// //         success: true,
// //         data: {
// //           kundliId: kundli._id,
// //           ...result.data,
// //           responseTime,
// //         },
// //       });
// //     } else {
// //       kundli.status = "failed";
// //       kundli.errorMessage =
// //         typeof result.error === "string" ? result.error : JSON.stringify(result.error);
// //       kundli.responseTime = responseTime;
// //       await kundli.save();

// //       return res.status(result.statusCode || 500).json({
// //         success: false,
// //         message: "Failed to generate Kundli",
// //         error: result.error,
// //       });
// //     }
// //   } catch (error) {
// //     console.error("❌ Error in generateKundli controller:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Internal server error",
// //       error: error.message,
// //     });
// //   }
// // };


// import Kundli from "../models/Kundli.js";
// import kundliService from "../services/kundliService.js";

// export const generateKundli = async (req, res) => {
//   const startTime = Date.now();

//   try {
//     const { name, birth_date, birth_time, place, gender, latitude, longitude } = req.body;

//     console.log("📥 Received kundli data:", {
//       name,
//       birth_date,
//       birth_time,
//       place,
//       gender,
//       latitude,
//       longitude,
//       user: req.user ? req.user._id : 'No user'
//     });

//     // Enhanced validation
//     if (!name?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Name is required",
//       });
//     }

//     if (!birth_date) {
//       return res.status(400).json({
//         success: false,
//         message: "Birth date is required",
//       });
//     }

//     if (!birth_time) {
//       return res.status(400).json({
//         success: false,
//         message: "Birth time is required",
//       });
//     }

//     if (!gender) {
//       return res.status(400).json({
//         success: false,
//         message: "Gender is required",
//       });
//     }

//     if (!place && (latitude == null || longitude == null)) {
//       return res.status(400).json({
//         success: false,
//         message: "Either place or both latitude and longitude are required",
//       });
//     }

//     // Gender validation
//     const validGenders = ["Male", "Female", "Other"];
//     if (!validGenders.includes(gender)) {
//       return res.status(400).json({
//         success: false,
//         message: "Gender must be Male, Female, or Other",
//       });
//     }

//     const userId = req.user?._id || null;

//     // Create an initial record
//     const kundli = new Kundli({
//       userId,
//       name: name.trim(),
//       birth_date,
//       birth_time,
//       place: place?.trim() || "",
//       latitude: latitude || null,
//       longitude: longitude || null,
//       gender,
//       status: "pending",
//     });

//     await kundli.save();

//     console.log("➡️ Calling external Kundli API service...");

//     // Call the external API service
//     const result = await kundliService.generateKundli({
//       name: name.trim(),
//       birth_date,
//       birth_time,
//       place: place?.trim(),
//       latitude,
//       longitude,
//       gender,
//     });

//     const responseTime = Date.now() - startTime;

//     console.log("📨 External API response:", {
//       success: result.success,
//       statusCode: result.statusCode,
//       hasData: !!result.data
//     });

//     if (result.success) {
//       // Update the kundli with chart data
//       kundli.chart = result.data.chart || result.data;
//       kundli.responseTime = responseTime;
//       kundli.status = "success";
//       await kundli.save();

//       return res.status(200).json({
//         success: true,
//         message: "Kundli generated successfully",
//         data: {
//           kundliId: kundli._id,
//           chart: kundli.chart,
//           responseTime,
//         },
//       });
//     } else {
//       // Handle external API error
//       kundli.status = "failed";
//       kundli.errorMessage = result.error || 'Unknown error from external service';
//       kundli.responseTime = responseTime;
//       await kundli.save();

//       return res.status(result.statusCode || 500).json({
//         success: false,
//         message: "Failed to generate Kundli",
//         error: result.error,
//         kundliId: kundli._id
//       });
//     }
//   } catch (error) {
//     console.error("❌ Error in generateKundli controller:", error);
    
//     const responseTime = Date.now() - startTime;
    
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//       responseTime
//     });
//   }
// };


import Kundli from "../models/Kundli.js";
import kundliService from "../services/kundliService.js";
import fallbackKundliService from "../services/fallbackKundliService.js";

export const generateKundli = async (req, res) => {
  const startTime = Date.now();

  try {
    const { name, birth_date, birth_time, place, gender, latitude, longitude } = req.body;

    console.log("📥 Received kundli data:", {
      name,
      birth_date,
      birth_time,
      place,
      gender,
      latitude,
      longitude,
      user: req.user ? req.user._id : 'No user'
    });

    // Enhanced validation
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!birth_date) {
      return res.status(400).json({
        success: false,
        message: "Birth date is required",
      });
    }

    if (!birth_time) {
      return res.status(400).json({
        success: false,
        message: "Birth time is required",
      });
    }

    if (!gender) {
      return res.status(400).json({
        success: false,
        message: "Gender is required",
      });
    }

    if (!place && (latitude == null || longitude == null)) {
      return res.status(400).json({
        success: false,
        message: "Either place or both latitude and longitude are required",
      });
    }

    // Gender validation
    const validGenders = ["Male", "Female", "Other"];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Gender must be Male, Female, or Other",
      });
    }

    const userId = req.user?._id || null;

    // Create an initial record
    const kundli = new Kundli({
      userId,
      name: name.trim(),
      birth_date,
      birth_time,
      place: place?.trim() || "",
      latitude: latitude || null,
      longitude: longitude || null,
      gender,
      status: "pending",
    });

    await kundli.save();

    console.log("➡️ Calling external Kundli API service...");

    let finalResult;
    let source = "external_api";

    // Try external API first
    const externalResult = await kundliService.generateKundli({
      name: name.trim(),
      birth_date,
      birth_time,
      place: place?.trim(),
      latitude,
      longitude,
      gender,
    });

    const responseTime = Date.now() - startTime;

    console.log("📨 External API response:", {
      success: externalResult.success,
      statusCode: externalResult.statusCode,
    });

    if (externalResult.success) {
      // Success from external API
      finalResult = externalResult;
    } else {
      console.log("🔄 External API failed, trying fallback service...");
      
      // Use fallback service if external API fails
      const fallbackResult = fallbackKundliService.generateBasicKundli({
        name: name.trim(),
        birth_date,
        birth_time,
        place: place?.trim(),
        latitude,
        longitude,
        gender,
      });
      
      finalResult = fallbackResult;
      source = "fallback";
    }

    if (finalResult.success) {
      // Update the kundli with chart data
      kundli.chart = finalResult.data.chart || finalResult.data;
      kundli.responseTime = responseTime;
      kundli.status = "success";
      
      // Store error message if we used fallback
      if (source === "fallback") {
        kundli.errorMessage = "External API unavailable. Used fallback service. External error: " + 
          (externalResult.error || 'Unknown error');
      }
      
      await kundli.save();

      return res.status(200).json({
        success: true,
        message: source === "external_api" 
          ? "Kundli generated successfully" 
          : "Kundli generated using fallback service",
        data: {
          kundliId: kundli._id,
          chart: kundli.chart,
          responseTime,
          source: source,
          ...(source === "fallback" && {
            note: "External API unavailable, using basic calculations"
          })
        },
      });
    } else {
      // Both external API and fallback failed
      kundli.status = "failed";
      kundli.errorMessage = finalResult.error || 'Unknown error from both external and fallback services';
      kundli.responseTime = responseTime;
      await kundli.save();

      return res.status(finalResult.statusCode || 500).json({
        success: false,
        message: "Failed to generate Kundli",
        error: finalResult.error,
        kundliId: kundli._id,
        details: finalResult.details
      });
    }
  } catch (error) {
    console.error("❌ Error in generateKundli controller:", error);
    
    const responseTime = Date.now() - startTime;
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      responseTime
    });
  }
};