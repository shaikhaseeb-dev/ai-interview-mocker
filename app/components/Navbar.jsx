import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-800 bg-black text-white px-6 py-4 flex justify-between items-center">

      {/* LEFT: LOGO + BRAND */}
      <Link href="/dashboard" className="flex items-center gap-3">

        {/* Logo Icon */}
        <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg">
          IA
        </div>

        {/* Brand Name */}
        <span className="text-xl font-semibold tracking-wide">
          IntervueAI
        </span>

      </Link>

      {/* RIGHT: NAV LINKS */}
      <div className="flex items-center gap-8 text-sm font-medium">

        <Link href="/dashboard" className="hover:text-indigo-400 transition">
          Dashboard
        </Link>

        <Link href="/dashboard/questions" className="hover:text-indigo-400 transition">
          Questions
        </Link>

        <Link href="/dashboard/upgrade" className="hover:text-indigo-400 transition">
          Upgrade
        </Link>

        <Link href="/dashboard/how-it-works" className="hover:text-indigo-400 transition">
          How It Works?
        </Link>

        <UserButton />

      </div>
    </nav>
  )
}
