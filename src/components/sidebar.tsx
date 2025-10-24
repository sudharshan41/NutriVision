"use client"

import * as React from "react"
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface SidebarContextProps {
  isExpanded: boolean
  isMobile: boolean
  collapsible: "icon" | "button"
  toggle: () => void
  close: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  collapsible?: "icon" | "button"
  defaultExpanded?: boolean
  onToggle?: (isExpanded: boolean) => void
}

function SidebarProvider({
  children,
  collapsible = "button",
  defaultExpanded = true,
  onToggle,
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

  const toggle = React.useCallback(() => {
    setIsExpanded((prev) => {
      onToggle?.(!prev)
      return !prev
    })
  }, [onToggle])

  const close = React.useCallback(() => {
    onToggle?.(false)
    setIsExpanded(false)
  }, [onToggle])

  React.useEffect(() => {
    if (isMobile) {
      close()
    } else {
      onToggle?.(defaultExpanded)
      setIsExpanded(defaultExpanded)
    }
  }, [isMobile, close, defaultExpanded, onToggle])

  return (
    <SidebarContext.Provider
      value={{ isExpanded, isMobile, collapsible, toggle, close }}
    >
      <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { isExpanded, isMobile } = useSidebar()
  const collapsed = !isExpanded && !isMobile
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
        isMobile && "z-50",
        isExpanded ? "w-64" : "w-16",
        className
      )}
      data-state={collapsed ? "collapsed" : "expanded"}
      {...props}
    >
      {children}
    </aside>
  )
}

function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex h-16 p-3", className)} {...props} />
}

function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  )
}

function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex flex-col gap-2 p-3", className)} {...props} />
}

function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />
}

interface SidebarMenuButtonProps extends ButtonProps {
  isActive?: boolean
  tooltip?: React.ComponentProps<typeof TooltipContent>
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, children, isActive, tooltip, ...props }, ref) => {
  const { isExpanded } = useSidebar()
  const collapsed = !isExpanded
  const Comp = (
    <Button
      ref={ref}
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "h-12 justify-start",
        collapsed ? "w-12 justify-center" : "w-full",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{Comp}</TooltipTrigger>
        <TooltipContent {...tooltip} />
      </Tooltip>
    )
  }

  return Comp
})
SidebarMenuButton.displayName = "SidebarMenuButton"

function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto", className)} {...props} />
}

function SidebarTrigger({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { isExpanded, toggle } = useSidebar()
  const Icon = isExpanded ? ChevronFirst : ChevronLast
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-8", className)}
      onClick={toggle}
      {...props}
    >
      <Icon />
    </Button>
  )
}

function SidebarInset({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isExpanded, isMobile } = useSidebar()

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        !isMobile && (isExpanded ? "ml-64" : "ml-16"),
        className
      )}
      {...props}
    />
  )
}

function SidebarUserDropdown({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar()
  return (
    <div
      className={cn(
        "flex items-center gap-3 overflow-hidden p-3",
        !isExpanded && "w-12 justify-center px-0 py-3"
      )}
    >
      {children}
      {isExpanded && (
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-semibold text-foreground">
            User Name
          </p>
          <p className="truncate text-xs text-muted-foreground">
            user.name@example.com
          </p>
        </div>
      )}
      {isExpanded && (
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      )}
    </div>
  )
}

export {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarUserDropdown,
}
