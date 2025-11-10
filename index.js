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

// CORS configuration - MUST be first middleware
// const corsOptions = {
//   origin: ["https://astrolozee.com", "http://localhost:5173", "http://localhost:3000"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "Content-Length", "X-Requested-With", "Accept"],
//   optionsSuccessStatus: 200,
// };


const corsOptions = {
  origin: [
    "https://astrolozee.com", 
    "http://localhost:5173", // Add this
    "http://localhost:3000",
    "https://demoastroclient.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Content-Length", "X-Requested-With", "Accept", "Access-Control-Allow-Origin"],
  exposedHeaders: ["Access-Control-Allow-Origin"],
  preflightContinue: true,
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
