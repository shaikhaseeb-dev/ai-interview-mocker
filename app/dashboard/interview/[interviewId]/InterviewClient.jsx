"use client"

import { useState, useRef } from "react"
import Webcam from "react-webcam"
import { Video, VideoOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuestionSection from "@/components/QuestionSection"

export default function InterviewClient({ interview, questions }) {
  const [started, setStarted] = useState(false)
  const [cameraOn, setCameraOn] = useState(false)
  const webcamRef = useRef(null)

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AI Mock Interview</h1>
        <p className="text-gray-600">
          {interview.jobPosition} • {interview.jobExperience} Years Experience
        </p>
      </div>

      {/* PRE-INTERVIEW GUIDELINES */}
      {!started && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* INFO */}
          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <h2 className="font-semibold mb-4">Interview Details</h2>
            <ul className="text-sm space-y-2 text-gray-700">
              <li><strong>Role:</strong> {interview.jobPosition}</li>
              <li><strong>Experience:</strong> {interview.jobExperience} years</li>
              <li><strong>Total Questions:</strong> {questions.length}</li>
              <li><strong>User:</strong> {interview.createdBy}</li>
            </ul>
          </div>

          {/* GUIDELINES */}
          <div className="md:col-span-2 border rounded-xl p-6 bg-blue-50">
            <h2 className="font-semibold mb-4 text-blue-900">
              Before You Start 🚀
            </h2>

            <ul className="space-y-3 text-sm text-blue-900">
              <li>✅ Sit in a quiet place with minimal distractions</li>
              <li>🎥 Webcam is optional but recommended</li>
              <li>✍️ Answer honestly before evaluating</li>
              <li>🧠 AI scores clarity, relevance & completeness</li>
              <li>⏱️ No time limit — focus on quality</li>
            </ul>

            <div className="mt-5 p-4 bg-white border rounded-lg text-sm text-gray-700">
              <strong>Note:</strong> This mock interview is for practice.
              Mistakes are part of learning — use feedback to improve.
            </div>

            <Button className="mt-6" onClick={() => setStarted(true)}>
              Start Interview
            </Button>
          </div>
        </div>
      )}

      {/* INTERVIEW MODE */}
      {started && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* QUESTIONS */}
          <div className="md:col-span-2">
            <QuestionSection questions={questions}
  mockId={interview.mockId} />
          </div>

          {/* WEBCAM */}
          <div className="border rounded-xl p-4 bg-gray-900 text-white h-fit">
            <p className="text-xs font-semibold mb-2 text-center">Webcam</p>

            {cameraOn ? (
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored
                className="rounded-lg w-full h-40 object-cover"
              />
            ) : (
              <div className="h-40 flex items-center justify-center text-gray-400 border border-dashed rounded-lg text-xs">
                Camera Off
              </div>
            )}

            <Button
              size="sm"
              className="mt-3 w-full"
              variant={cameraOn ? "destructive" : "secondary"}
              onClick={() => setCameraOn(!cameraOn)}
            >
              {cameraOn ? <VideoOff size={14} /> : <Video size={14} />}
              {cameraOn ? " Disable Camera" : " Enable Camera"}
            </Button>

            <p className="mt-2 text-[11px] text-gray-400 text-center">
              Webcam is optional. No video is recorded.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
