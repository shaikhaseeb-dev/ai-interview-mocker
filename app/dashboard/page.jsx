import { UserButton } from "@clerk/nextjs"
import AddNewInterview from "./_components/AddNewInterview"
import { Sparkles, FileText, Clock } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-bold text-3xl mb-1">
            AI Mock Interview Dashboard
          </h2>
          <p className="text-gray-600">
            Practice interviews, get AI feedback, and improve faster.
          </p>
        </div>

      </div>

      {/* PREMIUM INFO BANNER */}
      <div className="mb-8 p-5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
          <Sparkles size={18} /> Resume-Based Interviews (Premium)
        </h3>
        <p className="text-sm opacity-90">
          Upload your resume and get interview questions tailored to your real skills and experience.
        </p>
      </div>

      {/* MAIN ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* ADD NEW INTERVIEW */}
        <AddNewInterview />

        {/* FEATURE CARD */}
        <div className="p-6 border rounded-xl bg-white hover:shadow-md transition">
          <FileText className="text-blue-600 mb-3" />
          <h3 className="font-semibold mb-1">
            AI-Generated Questions
          </h3>
          <p className="text-sm text-gray-600">
            Questions generated based on job role, experience, and resume.
          </p>
        </div>

        {/* FEATURE CARD */}
        <div className="p-6 border rounded-xl bg-white hover:shadow-md transition">
          <Clock className="text-green-600 mb-3" />
          <h3 className="font-semibold mb-1">
            Real Interview Experience
          </h3>
          <p className="text-sm text-gray-600">
            Answer with voice or text, get instant AI scoring and feedback.
          </p>
        </div>
      </div>

      {/* CHILD CONTENT (FUTURE: HISTORY, ETC.) */}
      {/*
        This area will later show:
        - Interview history
        - Recent attempts
        - Progress
      */}
    </div>
  )
}
