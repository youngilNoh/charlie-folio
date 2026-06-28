import { ResumeHeader } from "@/components/resume/ResumeHeader"
import { ResumeSidebar } from "@/components/resume/ResumeSidebar"
import { ResumeMain } from "@/components/resume/ResumeMain"
import { ScrollTracking } from "@/components/resume/ScrollTracking"

export default function Home() {
  return (
    <div className="min-h-screen bg-page py-6 px-4 print:min-h-0 print:bg-white print:p-0">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <ScrollTracking />

      <div className="max-w-4xl mx-auto print:max-w-none">
        <ResumeHeader />

        <div className="flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden bg-card print:flex-row print:shadow-none print:rounded-none">
          {/* Sidebar — full width on mobile, fixed column from md up */}
          <div className="w-full md:w-64 shrink-0 print:w-48">
            <ResumeSidebar />
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <ResumeMain />
          </main>
        </div>
      </div>
    </div>
  )
}
