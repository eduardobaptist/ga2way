"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, X, AlertCircle, Target, CheckSquare, Package, Lightbulb, Edit3, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const sectionConfig = {
  goals: {
    title: "Goals & Objectives",
    icon: Target,
    colors: {
      bg: "bg-gradient-to-br from-blue-100 to-blue-200",
      hover: "hover:from-blue-200 hover:to-blue-300",
      border: "border-blue-300",
      gradient: "from-blue-500 to-blue-600",
      text: "text-blue-800",
    },
  },
  tasks: {
    title: "Tasks & Actions",
    icon: CheckSquare,
    colors: {
      bg: "bg-gradient-to-br from-purple-100 to-purple-200",
      hover: "hover:from-purple-200 hover:to-purple-300",
      border: "border-purple-300",
      gradient: "from-purple-500 to-purple-600",
      text: "text-purple-800",
    },
  },
  resources: {
    title: "Resources & Tools",
    icon: Package,
    colors: {
      bg: "bg-gradient-to-br from-indigo-100 to-indigo-200",
      hover: "hover:from-indigo-200 hover:to-indigo-300",
      border: "border-indigo-300",
      gradient: "from-indigo-500 to-indigo-600",
      text: "text-indigo-800",
    },
  },
  notes: {
    title: "Notes & Ideas",
    icon: Lightbulb,
    colors: {
      bg: "bg-gradient-to-br from-violet-100 to-violet-200",
      hover: "hover:from-violet-200 hover:to-violet-300",
      border: "border-violet-300",
      gradient: "from-violet-500 to-violet-600",
      text: "text-violet-800",
    },
  },
}

function PostItItem({ id, content, section, onRemove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const config = sectionConfig[section]
  const inputRef = useRef(null)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditContent(content)
  }

  const handleSave = () => {
    if (editContent.trim()) {
      onEdit(editContent.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent(content)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-lg shadow-lg transform ${isDragging ? "rotate-0 scale-105 z-50 shadow-2xl" : "rotate-[-1deg] hover:rotate-0"} relative ${config.colors.bg} ${config.colors.hover} transition-all duration-200 hover:scale-105 cursor-grab active:cursor-grabbing border-2 ${config.colors.border}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-3">
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              ref={inputRef}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-sm border-0 bg-white/80 shadow-sm"
              onBlur={handleSave}
            />
            <button
              type="button"
              onClick={handleSave}
              className="text-green-600 hover:text-green-700 p-1 rounded hover:bg-white/50 transition-colors"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <p className={`flex-1 break-words text-sm font-medium ${config.colors.text}`}>{content}</p>
            <button
              type="button"
              onClick={handleEdit}
              className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-white/50 transition-colors"
              aria-label={`Edit ${content}`}
            >
              <Edit3 className="h-4 w-4" />
            </button>
          </>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="text-gray-500 hover:text-red-500 p-1 rounded hover:bg-white/50 transition-colors"
          aria-label={`Remove ${content}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function ProjectCanvasStep({ form }) {
  const { watch, setValue } = form
  const canvas = watch("canvas")

  const [newPostIt, setNewPostIt] = useState({
    goals: "",
    tasks: "",
    resources: "",
    notes: "",
  })

  const [maxItems, setMaxItems] = useState({
    goals: 6,
    tasks: 6,
    resources: 6,
    notes: 6,
  })

  const containerRefs = useRef({
    goals: null,
    tasks: null,
    resources: null,
    notes: null,
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Calculate max items based on container height
  useEffect(() => {
    const calculateMaxItems = () => {
      const newMaxItems = { ...maxItems }

      Object.keys(containerRefs.current).forEach((section) => {
        const container = containerRefs.current[section]
        if (container) {
          const containerHeight = container.clientHeight
          // Estimate: each post-it is about 80px (including margins)
          const postItHeight = 80
          const maxItemsForSection = Math.floor(containerHeight / postItHeight)
          newMaxItems[section] = Math.max(3, maxItemsForSection) // Minimum 3 items
        }
      })

      setMaxItems(newMaxItems)
    }

    // Calculate on mount and resize
    calculateMaxItems()
    window.addEventListener("resize", calculateMaxItems)

    return () => window.removeEventListener("resize", calculateMaxItems)
  }, [])

  const addPostIt = (section) => {
    if (!newPostIt[section].trim()) return
    if (canvas[section].length >= maxItems[section]) return

    const newItem = {
      id: crypto.randomUUID(),
      content: newPostIt[section],
    }

    setValue(`canvas.${section}`, [...canvas[section], newItem], { shouldValidate: true })
    setNewPostIt((prev) => ({ ...prev, [section]: "" }))
  }

  const removePostIt = (section, id) => {
    setValue(
      `canvas.${section}`,
      canvas[section].filter((item) => item.id !== id),
      { shouldValidate: true },
    )
  }

  const editPostIt = (section, id, newContent) => {
    const updatedItems = canvas[section].map((item) => (item.id === id ? { ...item, content: newContent } : item))
    setValue(`canvas.${section}`, updatedItems, { shouldValidate: true })
  }

  const handleDragEnd = (event, section) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const items = canvas[section]
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over?.id)

      const reorderedItems = arrayMove(items, oldIndex, newIndex)
      setValue(`canvas.${section}`, reorderedItems, { shouldValidate: true })
    }
  }

  const handleKeyDown = (e, section) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addPostIt(section)
    }
  }

  const sections = ["goals", "tasks", "resources", "notes"]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Project Canvas
        </h2>
        <p className="text-gray-600">
          Organize your project ideas using colorful post-it notes. Drag to reorder, click edit to modify content.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sections.map((section) => {
          const config = sectionConfig[section]
          const isAtLimit = canvas[section].length >= maxItems[section]
          const remainingSlots = maxItems[section] - canvas[section].length
          const IconComponent = config.icon

          return (
            <div key={section} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${config.colors.gradient} text-white shadow-lg`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">{config.title}</h3>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${config.colors.gradient} text-white shadow-sm`}
                >
                  {canvas[section].length}/{maxItems[section]}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Input
                  placeholder={`Add a ${section.slice(0, -1)}...`}
                  value={newPostIt[section]}
                  onChange={(e) => setNewPostIt((prev) => ({ ...prev, [section]: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(e, section)}
                  disabled={isAtLimit}
                  className="border-purple-200 focus:border-blue-400 focus:ring-blue-400"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => addPostIt(section)}
                  disabled={!newPostIt[section].trim() || isAtLimit}
                  className={`bg-gradient-to-r ${config.colors.gradient} hover:shadow-lg transition-all duration-200`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {isAtLimit && (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-sm text-amber-800">
                    This section is full. Remove a post-it to add a new one.
                  </AlertDescription>
                </Alert>
              )}

              {remainingSlots <= 2 && remainingSlots > 0 && (
                <p className="text-sm text-amber-600 font-medium">
                  {remainingSlots} slot{remainingSlots !== 1 ? "s" : ""} remaining
                </p>
              )}

              <div
                ref={(el) => (containerRefs.current[section] = el)}
                className="space-y-4 min-h-[320px] max-h-[420px] overflow-y-auto p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gradient-to-br from-white/50 to-gray-50/50 backdrop-blur-sm"
              >
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, section)}
                >
                  <SortableContext
                    items={canvas[section].map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {canvas[section].map((item) => (
                      <PostItItem
                        key={item.id}
                        id={item.id}
                        content={item.content}
                        section={section}
                        onRemove={() => removePostIt(section, item.id)}
                        onEdit={(newContent) => editPostIt(section, item.id, newContent)}
                      />
                    ))}
                  </SortableContext>
                </DndContext>

                {canvas[section].length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                    <IconComponent className="h-12 w-12 mb-3 opacity-50" />
                    <p className="text-sm">No {section} added yet</p>
                    <p className="text-xs mt-1">Start by adding your first item above</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
