import { UserButton } from "@clerk/nextjs"
import AddNewInterview from "./_components/AddNewInterview"
import { Sparkles, FileText, Clock, TrendingUp, Brain, BarChart3 } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">

        {/* BRAND */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center rounded-xl font-bold text-xl">
            IQ
          </div>

          <div>
            <h2 className="font-bold text-2xl tracking-tight">
              InterviewIQ
            </h2>
            <p className="text-sm text-gray-400">
              AI Powered Interview Intelligence
            </p>
          </div>
        </div>

        <UserButton />
      </div>

      {/* WELCOME SECTION */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back 👋
        </h1>
        <p className="text-gray-400 max-w-xl">
          Track your interview performance, analyze AI feedback,
          and continuously improve your interview readiness.
        </p>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

        <StatCard
          icon={<BarChart3 />}
          title="Total Interviews"
          value="12"
          color="from-blue-500 to-cyan-500"
        />

        <StatCard
          icon={<TrendingUp />}
          title="Average Score"
          value="78%"
          color="from-green-500 to-emerald-500"
        />

        <StatCard
          icon={<Brain />}
          title="Strongest Area"
          value="Communication"
          color="from-purple-500 to-pink-500"
        />

        <StatCard
          icon={<Clock />}
          title="Last Activity"
          value="2 days ago"
          color="from-orange-500 to-red-500"
        />

      </div>

      {/* MAIN ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {/* START INTERVIEW */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition duration-300">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Sparkles /> Start New Mock Interview
          </h3>
          <p className="text-sm opacity-90 mb-4">
            Generate a structured AI-powered mock interview tailored to your role.
          </p>
          <AddNewInterview />
        </div>

        {/* FEATURE CARD */}
        <FeatureCard
          icon={<FileText className="text-blue-400" />}
          title="AI Generated Questions"
          desc="Behavioral, technical and scenario-based questions crafted intelligently."
        />

        {/* FEATURE CARD */}
        <FeatureCard
          icon={<Brain className="text-purple-400" />}
          title="Intelligent Evaluation"
          desc="Receive structured feedback and performance insights instantly."
        />

      </div>

      {/* UPCOMING FEATURE BANNER */}
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <Sparkles size={18} /> Resume-Based Interviews (Coming Soon)
        </h3>
        <p className="text-gray-400 text-sm">
          Upload your resume and receive AI-tailored interview questions
          specifically aligned to your experience and projects.
        </p>
      </div>

    </div>
  )
}


/* ---------- COMPONENTS ---------- */

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-600 transition">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h4 className="text-sm text-gray-400 mb-1">{title}</h4>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-gray-600 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  )
}