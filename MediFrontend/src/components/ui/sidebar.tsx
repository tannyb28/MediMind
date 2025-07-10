import * as React from 'react';
import { cn } from '../../lib/utils';

const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <>{children}</>
}

const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("bg-secondary border-r flex-col py-3 md:flex hidden md:grid", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex h-14 items-center shrink-0", className)} ref={ref} {...props} />
  },
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex flex-col gap-2 px-3 py-2 text-sm", className)} ref={ref} {...props} />
  },
)
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("mt-auto border-t p-3", className)} ref={ref} {...props} />
  },
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      className={cn("flex flex-col gap-1", className)}
      ref={ref}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => {
    return <li className={cn("", className)} ref={ref} {...props} />
  },
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLAnchorElement,
  { isActive?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, isActive, ...props }, ref) => {
  return (
    <a
      className={cn(
        "group flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary/50 data-[active=true]:bg-secondary/50 font-medium outline-none transition-colors data-[active=true]:text-primary",
        className,
      )}
      data-active={isActive}
      ref={ref}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarTrigger = () => {
  return null
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
}