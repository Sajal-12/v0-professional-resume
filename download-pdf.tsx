"use client"

import { Button } from "@/components/ui/button"
import { useRef } from "react"
import Resume from "./resume"
import { FileDown } from "lucide-react"

export default function DownloadPDF() {
  const resumeRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (resumeRef.current) {
      // Store the current body overflow style
      const originalOverflow = document.body.style.overflow

      // Hide scrollbars during printing
      document.body.style.overflow = "hidden"

      window.print()

      // Restore the original overflow style
      document.body.style.overflow = originalOverflow
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:py-0">
      <div className="container mx-auto">
        <div className="flex justify-center mb-6 print:hidden">
          <Button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          >
            <FileDown size={18} />
            Download PDF
          </Button>
        </div>
        <div ref={resumeRef}>
          <Resume />
        </div>
      </div>
    </div>
  )
}
