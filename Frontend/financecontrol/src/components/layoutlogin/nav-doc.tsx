"use client"

import * as React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavDoc({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { pathname } = useLocation()

  React.useEffect(() => {
    const activeItem = projects
      .flatMap(p => [{ title: p.name, url: p.url }, ...(p.items || [])])
      .find(i => i.url === pathname)

    if (activeItem) {
      document.title = `Documentação - ${activeItem.title}`
    }
  }, [pathname, projects])

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documentação</SidebarGroupLabel>

      <SidebarMenu>
        {projects.map((project) => {
          const isProjectActive = pathname === project.url
          const hasSubItems = !!project.items?.length
          const hasActiveSub = project.items?.some(
            (sub) => pathname === sub.url
          )

          return (
            <Collapsible
              key={project.name}
              asChild
              defaultOpen={project.isActive || hasActiveSub}
            >
              <SidebarMenuItem>
                {hasSubItems ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={project.name}
                      isActive={isProjectActive || hasActiveSub}
                      className="relative flex items-center w-full"
                    >
                      {(isProjectActive || hasActiveSub) && (
                        <div className="absolute left-0 h-4 w-[2px] bg-[#2c2f6e] dark:bg-blue-500" />
                      )}
                      <project.icon className="h-4 w-4" />
                      <span>{project.name}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  <SidebarMenuButton
                    asChild
                    tooltip={project.name}
                    isActive={isProjectActive}
                    className="relative"
                  >
                    <Link to={project.url} className="flex items-center w-full">
                      {isProjectActive && (
                        <div className="absolute left-0 h-4 w-[2px] bg-[#2c2f6e] dark:bg-blue-500" />
                      )}
                      <project.icon className="h-4 w-4" />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                )}

                {hasSubItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {project.items!.map((item) => {
                        const isSubActive = pathname === item.url

                        return (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isSubActive}
                              className="relative"
                            >
                              <Link
                                to={item.url}
                                className="flex items-center w-full"
                              >
                                {isSubActive && (
                                  <div className="absolute left-[-13px] h-4 w-[2px] bg-[#2c2f6e] dark:bg-blue-500" />
                                )}
                                <span
                                  className={cn(
                                    isSubActive &&
                                      "text-[#2c2f6e] dark:text-blue-400 font-medium"
                                  )}
                                >
                                  {item.title}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}