import { UserButton } from "@clerk/nextjs"
import AddNewInterview from "./_components/AddNewInterview"
import { Sparkles, FileText, Clock } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        {/* LOGO + BRAND */}
        <div className="flex items-center gap-3">
          
          {/* Logo Icon */}
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg font-bold text-lg">
            IQ
          </div>

          {/* Brand Text */}
          <div>
            <h2 className="font-bold text-2xl">
              InterviewIQ
            </h2>
            <p className="text-sm text-gray-500">
              AI Powered Interview Training Platform
            </p>
          </div>

        </div>

        {/* User */}
        <UserButton />

      </div>

      {/* INFO BANNER */}
      <div className="mb-8 p-5 rounded-xl bg-gray-900 text-white">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
          <Sparkles size={18} /> Resume-Based Interviews (Coming Soon)
        </h3>
        <p className="text-sm opacity-80">
          Upload your resume and receive AI-tailored technical and behavioral questions.
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
            Structured questions generated based on job role and experience.
          </p>
        </div>

        {/* FEATURE CARD */}
        <div className="p-6 border rounded-xl bg-white hover:shadow-md transition">
          <Clock className="text-green-600 mb-3" />
          <h3 className="font-semibold mb-1">
            Intelligent Evaluation
          </h3>
          <p className="text-sm text-gray-600">
            Get instant AI feedback and performance scoring.
          </p>
        </div>
      </div>

    </div>
  )
}
