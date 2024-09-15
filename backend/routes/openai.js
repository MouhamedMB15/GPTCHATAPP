

// Import required libraries
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from '../index.js';

// load enviorment var
dotenv.config();

// Router
const router = express.Router();

// Route to handle text based response
router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body; // retriver user message and chat id

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // model gpt
      messages: [
        { role: "system", content: "You are a helpful assistant." }, // system role
        { role: "user", content: text }, // user message
      ],
    });

    // return the bots response from the bot in chat engine
    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,        // project id
          "User-Name": process.env.BOT_USER_NAME,      // Bot username
          "User-Secret": process.env.BOT_USER_SECRET,  // Bot secret
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error in OpenAI request:", error.response ? error.response.data.error : error.message);
    res.status(500).json({ error: error.message });
  }
});

// Export the router
export default router;
