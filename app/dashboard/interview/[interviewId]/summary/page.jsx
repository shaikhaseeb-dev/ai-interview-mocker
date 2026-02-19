import { db } from "@/utils/db"
import { interviewAnswers } from "@/utils/schema"
import { eq, and } from "drizzle-orm"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"


export const dynamic = "force-dynamic";

export default async function InterviewSummaryPage({ params }) {
  const { interviewId } = await params
  const user = await currentUser()

  // 🔐 Auth Guard (friendly)
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold mb-2">You’re not logged in</h2>
        <p className="text-gray-600 mb-4">
          Please sign in to view your interview summary.
        </p>
        <Link href="/sign-in" className="underline text-blue-600">
          Go to Sign In
        </Link>
      </div>
    )
  }

  const userEmail = user.emailAddresses?.[0]?.emailAddress

  if (!userEmail) {
    return (
      <div className="p-10 text-center text-red-600">
        User email not found.
      </div>
    )
  }

  const answers = await db
    .select()
    .from(interviewAnswers)
    .where(
      and(
        eq(interviewAnswers.mockId, interviewId),
        eq(interviewAnswers.userEmail, userEmail)
      )
    )

  if (!answers.length) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h2 className="text-xl font-semibold mb-2">
          Interview not completed yet
        </h2>
        <p className="text-gray-600">
          Please complete all questions to view the summary.
        </p>
      </div>
    )
  }

  // 📊 Calculations
  const scores = answers.map((a) => a.score || 0)
  const avgScore = Math.round(
    (scores.reduce((a, b) => a + b, 0) / scores.length) * 10
  ) / 10

  const best = answers.reduce((a, b) =>
    (a.score || 0) > (b.score || 0) ? a : b
  )

  const weakest = answers.reduce((a, b) =>
    (a.score || 0) < (b.score || 0) ? a : b
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Interview Summary
        </h1>
        <p className="text-gray-600">
          Here’s a detailed breakdown of your mock interview
        </p>
      </div>

      {/* OVERALL SCORE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="border rounded-xl p-6 bg-green-50 text-center">
          <p className="text-sm text-green-800">Overall Score</p>
          <p className="text-5xl font-bold text-green-900 mt-2">
            {avgScore}/10
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="font-semibold mb-2">Strongest Answer</p>
          <p className="text-sm text-gray-700">
            {best.question}
          </p>
          <p className="mt-2 text-sm">
            Score: <strong>{best.score}/10</strong>
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="font-semibold mb-2">Needs Improvement</p>
          <p className="text-sm text-gray-700">
            {weakest.question}
          </p>
          <p className="mt-2 text-sm">
            Score: <strong>{weakest.score}/10</strong>
          </p>
        </div>
      </div>

      {/* QUESTION BREAKDOWN */}
      <div className="border rounded-xl p-6 bg-white">
        <h2 className="font-semibold mb-4">
          Question-wise Feedback
        </h2>

        <div className="space-y-4">
          {answers.map((ans, index) => (
            <div
              key={ans.id}
              className="p-4 border rounded-lg bg-gray-50"
            >
              <p className="font-semibold mb-1">
                Q{index + 1}: {ans.question}
              </p>

              <p className="text-sm mb-1">
                <strong>Score:</strong> {ans.score}/10
              </p>

              <p className="text-sm mb-1">
                <strong>Feedback:</strong> {ans.feedback}
              </p>

              <p className="text-sm">
                <strong>Improve:</strong> {ans.improvements}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-end mt-8">
        <Link
          href="/dashboard"
          className="px-5 py-2 rounded-lg bg-black text-white"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
