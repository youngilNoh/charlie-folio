import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold">Charlie Noh</h1>
      <p className="mt-2 text-gray-600">
        Frontend Developer | React, Next.js, Tailwind CSS | Passionate about
        building beautiful and performant web applications.
      </p>

      <section
        id="about-section"
        className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-lg"
      >
        <h2 className="text-xl font-semibold">About Me</h2>
        <p className="mt-2 text-sm">About Me Information</p>
      </section>

      <section
        id="projects-section"
        className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-lg"
      >
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="mt-4">
          <Button variant="default">Project A</Button>
        </div>
      </section>
    </main>
  )
}
