"use server"

import { db } from "@/utils/db"
import { interviewAnswers } from "@/utils/schema"
import { currentUser } from "@clerk/nextjs/server"

export async function saveInterviewAnswer({
  mockId,
  questionIndex,
  question,
  userAnswer,
  correctAnswer,
  evaluation,
}) {
  const user = await currentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const userEmail =
    user.emailAddresses?.[0]?.emailAddress

  if (!userEmail) {
    throw new Error("User email not found")
  }

  if (!mockId) {
    throw new Error("mockId missing")
  }

  await db.insert(interviewAnswers).values({
    mockId,
    userEmail,
    questionIndex,
    question,
    userAnswer,
    correctAnswer,
    score: evaluation.score,
    feedback: evaluation.feedback,
    improvements: evaluation.improvements,
  })

  return { success: true }
}
