import { db } from "@/utils/db"
import { mockInterviews } from "@/utils/schema"
import { eq } from "drizzle-orm"
import InterviewClient from "./InterviewClient"

export default async function InterviewPage({ params }) {
  const { interviewId } = await params

  const result = await db
    .select()
    .from(mockInterviews)
    .where(eq(mockInterviews.mockId, interviewId))

  if (!result.length) {
    return <div className="p-10 text-center">Interview not found</div>
  }

  const interview = result[0]
  const questions = JSON.parse(interview.jsonMockResp)

  return (
    <InterviewClient interview={interview} questions={questions} />
  )
}
