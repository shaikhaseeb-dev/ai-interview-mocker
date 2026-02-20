import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl font-bold mb-6">
          Master Interviews with AI
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          Practice real interview questions, get instant AI feedback,
          and improve your confidence before the real interview.
        </p>

        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/sign-in"
            className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-gray-900">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          
          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-bold mb-2">AI Mock Interviews</h3>
            <p className="text-gray-400">
              Generate real-world interview questions tailored to your role.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
            <p className="text-gray-400">
              Get performance insights and improvement suggestions instantly.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-400">
              Monitor your interview performance over time.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}