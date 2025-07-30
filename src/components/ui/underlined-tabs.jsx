import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const UnderlinedTabs = TabsPrimitive.Root

const UnderlinedTabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-start border-b border-border bg-transparent p-0 text-muted-foreground",
      className
    )}
    {...props} />
))
UnderlinedTabsList.displayName = TabsPrimitive.List.displayName

const UnderlinedTabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-4 py-2 text-sm font-medium ring-offset-background transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
      className
    )}
    {...props} />
))
UnderlinedTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const UnderlinedTabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} />
))
UnderlinedTabsContent.displayName = TabsPrimitive.Content.displayName

export { UnderlinedTabs, UnderlinedTabsList, UnderlinedTabsTrigger, UnderlinedTabsContent }