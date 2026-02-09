"use server"

import { chatSession } from "@/utils/GeminiAIModal"

export async function evaluateAnswer({ question, userAnswer, correctAnswer }) {
  const prompt = `
You are an interview evaluator.

Question:
${question}

Candidate Answer:
${userAnswer}

Ideal Answer:
${correctAnswer}

Return STRICT JSON only:
{
  "score": number (0-10),
  "feedback": "short honest feedback",
  "improvements": "how the answer can be improved"
}
`

  const result = await chatSession.sendMessage(prompt)

  let text = result.response.text()
  text = text.replace(/```json|```/g, "").trim()

  return JSON.parse(text)
}
