"use server"

import { db } from "@/utils/db"
import { mockInterviews } from "@/utils/schema"

export async function createMockInterview(data) {
  await db.insert(mockInterviews).values({
    mockId: data.mockId,
    createdBy: data.createdBy,
    jobPosition: data.jobPosition,
    jobDesc: data.jobDesc,
    jobExperience: data.jobExperience,
    jsonMockResp: JSON.stringify(data.jsonMockResp),
  })
}
