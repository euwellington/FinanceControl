"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { observer } from "mobx-react-lite"
import { useLocation, Link } from "react-router-dom" // Importes do React Router
import React from "react"

const SiteHeader = () => {
    const location = useLocation()
    
    // Divide a path: "/config/usuarios" -> ["config", "usuarios"]
    const pathnames = location.pathname.split("/").filter((x) => x)

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        {/* {pathnames.length > 0 && (
                            <BreadcrumbSeparator className="hidden md:block" />
                        )} */}

                        {pathnames.map((value, index) => {
                            const last = index === pathnames.length - 1
                            const to = `/${pathnames.slice(0, index + 1).join("/")}`
                            
                            // Formata o texto (ex: "area-chart" -> "Area Chart")
                            const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ")

                            return (
                                <React.Fragment key={to}>
                                    <BreadcrumbItem>
                                        {last ? (
                                            <BreadcrumbPage>{label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild className="hidden md:block">
                                                <Link to={to}>{label}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!last && (
                                        <BreadcrumbSeparator className="hidden md:block" />
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}

export default observer(SiteHeader);