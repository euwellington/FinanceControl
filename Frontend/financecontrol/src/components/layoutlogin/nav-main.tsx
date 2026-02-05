"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

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
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = !!item.items?.length
          const isParentActive = pathname === item.url || item.items?.some(sub => pathname === sub.url)

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || isParentActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className={cn(
                      "relative transition-all",
                      pathname === item.url && "after:absolute after:left-0 after:h-4 after:w-[2px] after:bg-[#2c2f6e] dark:after:bg-blue-500"
                    )}
                  >
                    {hasSubItems ? (
                      <div className="flex flex-1 items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <Link to={item.url} className="flex flex-1 items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </Link>
                    )}

                    {hasSubItems && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {hasSubItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className={cn(
                              "relative transition-all",
                              pathname === subItem.url && "after:absolute after:left-0 after:h-4 after:w-[2px] after:bg-[#2c2f6e] dark:after:bg-blue-500 font-medium text-[#2c2f6e] dark:text-blue-400"
                            )}
                          >
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
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