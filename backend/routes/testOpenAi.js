// Imports
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

//e5 module test
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Enviorments
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// log test
console.log("OpenAI API Key:", process.env.OPEN_API_KEY);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

// Test function to call OpenAI
async function testOpenAI() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Tell me a joke." },
      ],
    });
    console.log("OpenAI Response:", completion.choices[0].message.content);
  } catch (error) {
    console.error("Error in test:", error.response ? error.response.data : error.message);
  }
}

// Run the test function
testOpenAI();
