"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles, Briefcase } from "lucide-react"
import { chatSession } from "@/utils/GeminiAIModal"
import { v4 as uuidv4 } from "uuid"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

// keep relative import (safe)
import { createMockInterview } from "../../../actions/mockInterview"

function AddNewInterview() {
  const { user } = useUser()
  const router = useRouter()

  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [jobExperience, setJobExperience] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!user?.primaryEmailAddress?.emailAddress) {
      alert("Please sign in again to continue.")
      return
    }

    setLoading(true)
    const mockId = uuidv4()

    const InputPrompt = `
You are an expert interview coach.

Job Position: ${jobPosition}
Job Description: ${jobDesc}
Experience Level: ${jobExperience} years

Generate 5 interview questions with ideal answers.
Return STRICT JSON:
[
  { "question": "...", "answer": "..." }
]
`

    try {
      const result = await chatSession.sendMessage(InputPrompt)

      let cleaned = result.response.text()
        .replace(/```json|```/g, "")
        .trim()

      const parsedData = JSON.parse(cleaned)

      await createMockInterview({
        mockId,
        createdBy: user.primaryEmailAddress.emailAddress,
        jobPosition,
        jobDesc,
        jobExperience,
        jsonMockResp: parsedData,
      })

      setOpenDialog(false)
      router.push(`/dashboard/interview/${mockId}`)

    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* ADD NEW CARD */}
      <div
        onClick={() => setOpenDialog(true)}
        className="p-10 rounded-xl border bg-gradient-to-br from-gray-50 to-gray-100
        hover:from-indigo-50 hover:to-blue-50 hover:shadow-lg hover:scale-105
        transition cursor-pointer text-center"
      >
        <h2 className="font-bold text-lg mb-1">+ New Mock Interview</h2>
        <p className="text-sm text-gray-600">
          Practice with AI-generated questions
        </p>
      </div>

      {/* DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase size={18} />
              Create Mock Interview
            </DialogTitle>
            <DialogDescription>
              Tell us about the role you’re preparing for.  
              AI will generate questions tailored to your profile.
            </DialogDescription>
          </DialogHeader>

          {/* PREMIUM NOTE */}
          <div className="mb-4 p-3 rounded-lg bg-blue-50 text-sm text-blue-800 flex items-center gap-2">
            <Sparkles size={16} />
            Resume-based interviews available (Premium)
          </div>

          <form onSubmit={onSubmit}>
            {/* JOB ROLE */}
            <div className="my-4">
              <label className="text-sm font-semibold">
                Job Role
              </label>
              <input
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                placeholder="e.g. Full Stack Developer"
              />
            </div>

            {/* JOB DESCRIPTION */}
            <div className="my-4">
              <label className="text-sm font-semibold">
                Job Description / Skills
              </label>
              <textarea
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="React, Node.js, SQL, REST APIs…"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Mention key technologies or responsibilities
              </p>
            </div>

            {/* EXPERIENCE */}
            <div className="my-4">
              <label className="text-sm font-semibold">
                Years of Experience
              </label>
              <input
                type="number"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
                placeholder="e.g. 2"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Generating…
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
