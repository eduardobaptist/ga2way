"use client"

import { format } from "date-fns"
import { CalendarIcon, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock team members data
const teamMembers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Alex Johnson" },
  { id: "4", name: "Sam Wilson" },
  { id: "5", name: "Taylor Brown" },
]

export function InfosGeraisStep({ form }) {
  const { register, formState, setValue, watch } = form
  const { errors } = formState

  const selectedTeam = watch("team") || []
  const selectedDate = watch("dueDate")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" placeholder="Enter project name" {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your project"
          className="min-h-[100px]"
          {...register("description")}
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="dueDate"
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setValue("dueDate", date)}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
        {errors.dueDate && <p className="text-sm text-destructive">{errors.dueDate.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Team Members</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTeam.map((memberId) => {
            const member = teamMembers.find((m) => m.id === memberId)
            return (
              <div
                key={memberId}
                className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center"
              >
                <User className="h-3 w-3 mr-1" />
                {member?.name}
                <button
                  type="button"
                  className="ml-2 text-primary hover:text-primary/80"
                  onClick={() => {
                    setValue(
                      "team",
                      selectedTeam.filter((id) => id !== memberId),
                      { shouldValidate: true },
                    )
                  }}
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
        <Select
          onValueChange={(value) => {
            if (!selectedTeam.includes(value)) {
              setValue("team", [...selectedTeam, value], { shouldValidate: true })
            }
          }}
          value=""
        >
          <SelectTrigger>
            <SelectValue placeholder="Add team members" />
          </SelectTrigger>
          <SelectContent>
            {teamMembers.map((member) => (
              <SelectItem key={member.id} value={member.id} disabled={selectedTeam.includes(member.id)}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.team && <p className="text-sm text-destructive">{errors.team.message}</p>}
      </div>
    </div>
  )
}
