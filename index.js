// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/connectdb.js";
// import authRoutes from "./routes/authRoutes.js";
// import astroRoutes from "./routes/astroRoutes.js";
// import kundliRoutes from "./routes/kundliRoutes.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// const app = express();

// dotenv.config();
// connectDB();

// const PORT = process.env.PORT || 5000;

// // CORS configuration - MUST be first middleware
// // const corsOptions = {
// //   origin: ["https://astrolozee.com", "http://localhost:5173", "http://localhost:3000"],
// //   credentials: true,
// //   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
// //   allowedHeaders: ["Content-Type", "Authorization", "Content-Length", "X-Requested-With", "Accept"],
// //   optionsSuccessStatus: 200,
// // };


// const corsOptions = {
//   origin: [
//     "https://astrolozee.com", 
//     "http://localhost:5173", // Add this
//     "http://localhost:3000",
//     "https://demoastroclient.vercel.app",
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   // allowedHeaders: ["Content-Type", "Authorization", "Content-Length", "X-Requested-With", "Accept", "Access-Control-Allow-Origin"],
//   // exposedHeaders: ["Access-Control-Allow-Origin"],
//   // preflightContinue: true,
//   // optionsSuccessStatus: 200
// };


// app.use(cors(corsOptions));

// // Parse request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Health check endpoint
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Backend is running" });
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/astro", astroRoutes);
// app.use("/api/kundli", kundliRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: err.message });
// });

// app.listen(PORT,()=>{
//   console.log(`Server is running on port ${PORT}`);
// })

// export default app;





import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";
import authRoutes from "./routes/authRoutes.js";
import astroRoutes from "./routes/astroRoutes.js";
import kundliRoutes from "./routes/kundliRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://astrolozee.com",
      "https://demoastroclient.vercel.app",
      "https://astrologer2.netlify.app",
    ];
    // Allow localhost on any port for development
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Content-Length", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running" });
});

// Google Maps API Proxy Routes
app.post("/api/places-autocomplete", async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || input.length < 2) {
      return res.status(400).json({ 
        status: 'ERROR',
        message: 'Input too short' 
      });
    }

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAoBl7NNCqtw_7g9K7bWrPq1m3ZI6P2_g8';
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_API_KEY}&types=geocode`
    );
    
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Places API error:', error);
    res.status(500).json({ 
      status: 'ERROR',
      message: 'Internal server error',
      error: error.message 
    });
  }
});

app.post("/api/reverse-geocode", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ 
        status: 'ERROR',
        message: 'Latitude and longitude are required' 
      });
    }

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAoBl7NNCqtw_7g9K7bWrPq1m3ZI6P2_g8';
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
    );
    
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Reverse Geocode API error:', error);
    res.status(500).json({ 
      status: 'ERROR',
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Geocode by address (backend proxy) - returns coordinates for a given address string
app.post("/api/geocode", async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Address is required'
      });
    }

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAoBl7NNCqtw_7g9K7bWrPq1m3ZI6P2_g8';

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Geocode API error:', error);
    res.status(500).json({ 
      status: 'ERROR',
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/astro", astroRoutes);
app.use("/api/kundli", kundliRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})

export default app;