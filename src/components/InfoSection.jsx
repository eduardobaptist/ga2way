import { useState } from "react"
import { Info, ChevronDown, ChevronUp } from "lucide-react"

export const InfoSection = ({
  title = "Informações",
  description = "Clique para ver mais detalhes",
  sections = [],
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="w-full mb-6 border border-gray-200 rounded-lg bg-gray-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="text-left">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-gray-700" />
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          {!isExpanded && <p className="text-sm text-gray-600 mt-0.5">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && sections.length > 0 && (
        <div className="px-4 pb-4">
          <div className="border-t border-gray-100 pt-3">
            {sections.map((section, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="font-medium text-gray-900 text-sm mb-1">{section.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}