"use client"

import * as React from "react"
import {
  Users,
  Tags,
  ArrowLeftRight,
  BarChart3,
  UserCheck,
  Layers,
  Server,
  Monitor,
  Lock,
  UserPlus,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import { NavDoc } from "@/components/layout/nav-doc"
import NavUser from "@/components/layout/nav-user"
import { ProjectHeader } from "@/components/layout/project-header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard", 
      icon: LayoutDashboard,
      isActive: false, 
    },
    {
      title: "Cadastros",
      url: "#",
      icon: Layers,
      isActive: true,
      items: [
        {
          title: "Pessoas",
          url: "/pessoas",
          icon: Users,
        },
        {
          title: "Categorias",
          url: "/categorias",
          icon: Tags,
        },
        {
          title: "Transações",
          url: "/transacoes",
          icon: ArrowLeftRight,
        },
      ],
    },
    {
      title: "Relatórios",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Por Pessoas",
          url: "/relatorios/pessoas",
          icon: UserCheck,
        },
        {
          title: "Por Categorias",
          url: "/relatorios/categorias",
          icon: Tags,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Backend",
      url: "#",
      icon: Server,
      items: [
        {
          title: "Autenticação",
          url: "/docs/backend/autenticacao",
          icon: Lock,
        },
        {
          title: "Cadastro de Pessoas",
          url: "/docs/backend/pessoas",
          icon: Users,
        },
        {
          title: "Cadastro de Categorias",
          url: "/docs/backend/categorias",
          icon: Tags,
        },
        {
          title: "Transações",
          url: "/docs/backend/transacoes",
          icon: ArrowLeftRight,
        },
      ],
    },
    {
      name: "Frontend",
      url: "#",
      icon: Monitor,
      items: [
        {
          title: "Login",
          url: "/docs/frontend/login",
          icon: Lock,
        },
        {
          title: "Primeiro Acesso",
          url: "/docs/frontend/primeiro-acesso",
          icon: UserPlus,
        },
        {
          title: "Autenticação",
          url: "/docs/frontend/autenticacao",
          icon: Lock,
        },
        {
          title: "Cadastro de Pessoas",
          url: "/docs/frontend/pessoas",
          icon: Users,
        },
        {
          title: "Cadastro de Categorias",
          url: "/docs/frontend/categorias",
          icon: Tags,
        },
        {
          title: "Transações",
          url: "/docs/frontend/transacoes",
          icon: ArrowLeftRight,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDoc projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
