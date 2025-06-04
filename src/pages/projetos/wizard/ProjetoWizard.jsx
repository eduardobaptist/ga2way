import { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { InfosGeraisStep } from "./InfosGeraisStep"
import { ProjectCanvasStep } from "./ProjectCanvasStep"
import { cn } from "@/lib/utils"

// Define the schema for the entire form
export const projectSchema = z.object({
  // General Info (Step 1)
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  dueDate: z.date().min(new Date(), "Due date must be in the future"),
  team: z.array(z.string()).min(1, "Select at least one team member"),

  // Project Canvas (Step 2)
  canvas: z.object({
    goals: z.array(
      z.object({
        id: z.string(),
        content: z.string().min(1),
      }),
    ),
    tasks: z.array(
      z.object({
        id: z.string(),
        content: z.string().min(1),
      }),
    ),
    resources: z.array(
      z.object({
        id: z.string(),
        content: z.string().min(1),
      }),
    ),
    notes: z.array(
      z.object({
        id: z.string(),
        content: z.string().min(1),
      }),
    ),
  }),
})

const steps = [
  { id: "step-1", name: "General Info" },
  { id: "step-2", name: "Project Canvas" },
]

export function ProjetoWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isStep1Valid, setIsStep1Valid] = useState(false)

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      dueDate: undefined,
      team: [],
      canvas: {
        goals: [{ id: crypto.randomUUID(), content: "Define project scope" }],
        tasks: [{ id: crypto.randomUUID(), content: "Create initial mockups" }],
        resources: [{ id: crypto.randomUUID(), content: "Design team" }],
        notes: [{ id: crypto.randomUUID(), content: "Check with stakeholders" }],
      },
    },
    mode: "onChange",
  })

  const { trigger, getValues, watch } = form

  // Watch step 1 fields to validate in real-time
  const watchedFields = watch(["name", "description", "dueDate", "team"])


  const next = async () => {
    const fields = currentStep === 0 ? ["name", "description", "dueDate", "team"] : ["canvas"]

    const output = await trigger(fields, { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit the form
      const values = getValues()
      console.log("Form submitted!", values)
      // Here you would typically send the data to your backend
      alert("Project created successfully!")
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex) => {
    if (stepIndex === 0 || (stepIndex === 1 && isStep1Valid)) {
      setCurrentStep(stepIndex)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Steps indicator - Card Style */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {steps.map((step, index) => {
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            const isAccessible = index === 0 || (index === 1 && isStep1Valid)

            return (
              <div key={step.id} className="flex-1 max-w-[240px]">
                <button
                  type="button"
                  onClick={() => goToStep(index)}
                  disabled={!isAccessible}
                  className={cn(
                    "w-full p-4 rounded-lg border transition-all duration-200 flex items-center gap-3",
                    isActive
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : isCompleted
                        ? "border-purple-500 bg-purple-50 cursor-pointer hover:bg-purple-100"
                        : isAccessible
                          ? "border-green-500 bg-green-50 cursor-pointer hover:bg-green-100"
                          : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-70",
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-md flex items-center justify-center text-white",
                      isActive
                        ? "bg-blue-500"
                        : isCompleted
                          ? "bg-purple-500"
                          : isAccessible
                            ? "bg-green-500"
                            : "bg-gray-300",
                    )}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                  </div>
                  <div className="text-left">
                    <p
                      className={cn(
                        "font-medium",
                        isActive
                          ? "text-blue-700"
                          : isCompleted
                            ? "text-purple-700"
                            : isAccessible
                              ? "text-green-700"
                              : "text-gray-500",
                      )}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {index === 0 ? "Project details" : "Organize ideas"}
                      {index === 1 && isStep1Valid && !isActive && !isCompleted && (
                        <span className="text-green-600 font-medium"> • Ready</span>
                      )}
                    </p>
                  </div>
                </button>

                {index < steps.length - 1 && (
                  <div className="hidden sm:flex justify-center my-2">
                    <div
                      className={cn(
                        "h-6 w-0.5",
                        index < currentStep ? "bg-purple-500" : isStep1Valid ? "bg-green-500" : "bg-gray-200",
                      )}
                    ></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form card */}
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          {currentStep === 0 && <InfosGeraisStep form={form} />}
          {currentStep === 1 && <ProjectCanvasStep form={form} />}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button type="button" onClick={prev} disabled={currentStep === 0} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="button" onClick={next}>
              {currentStep === steps.length - 1 ? "Create Project" : "Next"}
              {currentStep !== steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
