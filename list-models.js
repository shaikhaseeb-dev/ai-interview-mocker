const { GoogleGenerativeAI } = require("@google/generative-ai");

// PASTE YOUR KEY HERE
const apiKey = "AIzaSyDE-vTsiiARsrSc2sM2H9Hmb_yCxjhtmDo"; 

async function listMyModels() {
  console.log("Checking available models for this key...");
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // This asks Google for the list
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy init
    
    // We access the underlying client to list models (Standard SDK way)
    // Note: Since the SDK abstracts this, we will use a raw fetch for absolute certainty
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
        console.log("❌ ERROR:", data.error.message);
        return;
    }

    console.log("✅ SUCCESS! Here are the models you can use:");
    console.log("---------------------------------------------");
    // Filter to only show "generateContent" models
    const availableModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
    
    availableModels.forEach(m => {
        console.log(`Name: ${m.name.replace("models/", "")}`);
    });

  } catch (error) {
    console.log("❌ CRITICAL FAILURE:", error.message);
  }
}

listMyModels();