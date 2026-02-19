import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ KEEP YOUR WORKING KEY HERE
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  // FIX: Switch to the "Experimental" version. 
  // The standard "gemini-2.0-flash" often requires billing (Limit: 0).
  // "gemini-2.0-flash-exp" is free for testing.
  model: "gemini-flash-latest",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});