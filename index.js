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

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configuration
const corsOptions = {
  origin: [
    "https://demoastroclient.vercel.app", // your frontend (Vercel)
    "https://astrolozee.com",             // your main domain
    "http://localhost:5173",              // local dev (Vite)
    "http://localhost:3000"               // local dev (React)
  ],
  credentials: true, // allow cookies and tokens
};

// ✅ Use CORS middleware (MUST come first)
app.use(cors(corsOptions));

// ✅ Handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions));

// ✅ Parse request bodies and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running successfully 🚀" });
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/astro", astroRoutes);
app.use("/api/kundli", kundliRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
