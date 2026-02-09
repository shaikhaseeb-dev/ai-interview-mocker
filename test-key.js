const { GoogleGenerativeAI } = require("@google/generative-ai");

// PASTE YOUR KEY INSIDE THESE QUOTES
const apiKey = "AIzaSyDE-vTsiiARsrSc2sM2H9Hmb_yCxjhtmDo"; 

async function testKey() {
  console.log("Testing API Key...");
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ SUCCESS! The API Key is working.");
    console.log("Response from AI:", text);
  } catch (error) {
    console.log("❌ FAILED. The API Key is NOT working.");
    console.log("Error Message:", error.message);
  }
}

testKey();