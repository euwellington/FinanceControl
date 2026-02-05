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
  LayoutDashboard,
  Dock,
} from "lucide-react"

import { NavMain } from "@/components/layoutmain/nav-main"
import { NavDoc } from "@/components/layoutmain/nav-doc"
import NavUser from "@/components/layoutmain/nav-user"
import { ProjectHeader } from "@/components/layoutmain/project-header"
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
          title: "Pessoas/Transações",
          url: "/relatorios/pessoas",
          icon: UserCheck,
        },
        {
          title: "Categorias/Transações",
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
          title: "Visão Geral",
          url: "/docs/backend/visao-geral",
          icon: Dock,
        },
        {
          title: "Autenticação",
          url: "/docs/backend/autenticacao",
          icon: Lock,
        },
        {
          title: "Dashboard",
          url: "/docs/backend/dashboard",
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
        {
          title: "Relatórios",
          url: "/docs/backend/relatorios",
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
          title: "Visão Geral",
          url: "/docs/frontend/visao-geral",
          icon: Dock,
        },
        {
          title: "Autenticação",
          url: "/docs/frontend/autenticacao",
          icon: Lock,
        },
        {
          title: "Dashboard",
          url: "/docs/frontend/dashboard",
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
        {
          title: "Relatórios",
          url: "/docs/frontend/relatorios",
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
