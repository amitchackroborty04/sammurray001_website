"use client"

export default function ProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Post",
      description:
        "Show the world what you need or what you're offering. List your property or space requirement in minutes with a simple guided form. No jargon, no hassle, just clear, professional visibility.",
    },
    {
      number: "02",
      title: "Match",
      description:
        "Let our intelligent system do the work for you. It automatically finds the best matches based on location, property type, size, and budget, bringing the right opportunities straight to you.",
    },
    {
      number: "03",
      title: "Connect",
      description:
        "Turn matches into meaningful conversations. Chat directly, share details, and build real partnerships all within a secure, modern platform designed to make real estate transactions effortless and authentic.",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto py-[80px]">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-semibold mb-2">working process</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#000000]">
          Simple easy steps to get started
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-cyan-400 transition"
            >
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{step.description}</p>
              <p className="text-4xl font-bold text-cyan-400">{step.number}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
