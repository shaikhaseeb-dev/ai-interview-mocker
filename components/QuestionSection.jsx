"use client"

import React, { useEffect, useRef, useState } from "react"
import { Volume2, Sparkles, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { evaluateAnswer } from "@/actions/evaluateAnswer"
import { saveInterviewAnswer } from "@/actions/saveInterviewAnswer"

function QuestionSection({ questions, mockId }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [evaluations, setEvaluations] = useState({})
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)

  const recognitionRef = useRef(null)
  const currentQuestion = questions[currentIndex]

  /* ================= TEXT TO SPEECH ================= */
  const speakQuestion = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }
  }

  /* ================= SPEECH TO TEXT ================= */
  useEffect(() => {
    if (typeof window === "undefined") return

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ")

      setAnswers((prev) => ({
        ...prev,
        [currentIndex]: transcript,
      }))
    }

    recognitionRef.current = recognition
    return () => recognition.stop()
  }, [currentIndex])

  const toggleListening = () => {
    const recognition = recognitionRef.current
    if (!recognition) {
      alert("Speech recognition not supported in this browser.")
      return
    }

    if (listening) {
      recognition.stop()
      setListening(false)
    } else {
      recognition.start()
      setListening(true)
    }
  }

  /* ================= AI EVALUATION + SAVE ================= */
  const handleEvaluate = async () => {
    const userAnswer = answers[currentIndex]

    if (!userAnswer || userAnswer.trim() === "") {
      alert("Please type or speak your answer first.")
      return
    }

    setLoading(true)
    try {
      // 1️⃣ AI Evaluation
      const evaluation = await evaluateAnswer({
        question: currentQuestion.question,
        userAnswer,
        correctAnswer: currentQuestion.answer,
      })

      setEvaluations((prev) => ({
        ...prev,
        [currentIndex]: evaluation,
      }))

      // 2️⃣ Save to Database

      console.log("Saving answer with:", {
  mockId,
  questionIndex: currentIndex,
})

      await saveInterviewAnswer({
        mockId,
        questionIndex: currentIndex,
        question: currentQuestion.question,
        userAnswer,
        correctAnswer: currentQuestion.answer,
        evaluation,
      })
    } catch (error) {
      console.error(error)
      alert("Failed to evaluate or save answer.")
    } finally {
      setLoading(false)
    }
  }

  const evaluation = evaluations[currentIndex]

  return (
    <div className="p-6 border rounded-2xl bg-white shadow-sm">

      {/* PROGRESS */}
      <p className="text-sm text-gray-500 mb-3">
        Question {currentIndex + 1} of {questions.length}
      </p>

      {/* QUESTION */}
      <div className="p-5 bg-blue-50 rounded-xl mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-blue-700">
            Interview Question
          </h2>
          <Volume2
            className="cursor-pointer"
            onClick={() => speakQuestion(currentQuestion.question)}
          />
        </div>
        <p className="font-semibold text-lg">
          {currentQuestion.question}
        </p>
      </div>

      {/* HELPER NOTE */}
      <p className="text-xs text-gray-500 mb-2">
        Tip: Speak your answer first, then refine it in text.
      </p>

      {/* ANSWER HEADER */}
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-gray-700">
          Your Answer
        </label>

        <Button
          size="sm"
          variant={listening ? "destructive" : "secondary"}
          onClick={toggleListening}
        >
          {listening ? <MicOff size={14} /> : <Mic size={14} />}
          {listening ? " Stop" : " Speak"}
        </Button>
      </div>

      {/* ANSWER INPUT */}
      <textarea
        className="w-full p-4 border rounded-xl mb-3 resize-none"
        rows={5}
        placeholder="Type or speak your answer here..."
        value={answers[currentIndex] || ""}
        onChange={(e) =>
          setAnswers({ ...answers, [currentIndex]: e.target.value })
        }
      />

      {/* EVALUATE BUTTON */}
      <Button onClick={handleEvaluate} disabled={loading} className="gap-2">
        <Sparkles size={16} />
        {loading ? "Evaluating..." : "Evaluate Answer"}
      </Button>

      <p className="text-xs text-gray-400 mt-2">
        AI evaluates clarity, relevance, and structure.
      </p>

      {/* EVALUATION RESULT */}
      {evaluation && (
        <div className="mt-5 p-4 border rounded-xl bg-gray-50">
          <p className="font-semibold">
            Score:{" "}
            <span className="text-green-700">
              {evaluation.score}/10
            </span>
          </p>
          <p className="text-sm mt-1">
            <strong>Feedback:</strong> {evaluation.feedback}
          </p>
          <p className="text-sm mt-1">
            <strong>Improvements:</strong> {evaluation.improvements}
          </p>
        </div>
      )}

      {/* NAVIGATION */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          Previous
        </Button>

        <Button
          disabled={currentIndex === questions.length - 1}
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          Next
        </Button>
      </div>

      {/* FINISH INTERVIEW */}
      {currentIndex === questions.length - 1 && evaluation && (
        <Button
          className="mt-6 w-full"
          onClick={() =>
            window.location.href = `/dashboard/interview/${mockId}/summary`
          }
        >
          Finish Interview & View Summary
        </Button>
      )}
    </div>
  )
}

export default QuestionSection
