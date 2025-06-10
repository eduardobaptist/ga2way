"use client"

import { useState } from "react"
import { Info, ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"

export const InfoSection = ({
  title = "Informações",
  description = "Clique para ver mais detalhes",
  sections = [],
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <Card className="w-full mb-6 border-blue-200 bg-blue-50/50">
      <div className="p-4">
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-blue-600" />
            <div className="text-left">
              <h3 className="font-semibold text-blue-900">{title}</h3>
              {!isExpanded && <p className="text-sm text-blue-700">{description}</p>}
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-blue-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-blue-600" />
          )}
        </button>

        {isExpanded && sections.length > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            {sections.map((section, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="font-bold text-gray-900 text-sm">{section.title}</div>
                <div className="text-gray-700 text-sm whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
