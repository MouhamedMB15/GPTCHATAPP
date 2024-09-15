
// Imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import OpenAI from "openai";  // Use the default export
import openAiRoutes from "./routes/openai.js";
import authRoutes from "./routes/auth.js";

// Eviorment vars
dotenv.config();
// test
console.log("OpenAI API Key:", process.env.OPEN_API_KEY);  
//express
const app = express();
// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Open Ai configuration
export const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY, //open ai key
});



// Routes
app.use("/openai", openAiRoutes);  // OpenAI routes
app.use("/auth", authRoutes);      // Authentication routes

// Server set
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
