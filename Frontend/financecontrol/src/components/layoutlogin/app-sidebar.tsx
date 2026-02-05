"use client"

import * as React from "react"
import {
  Users,
  Tags,
  ArrowLeftRight,
  Server,
  Monitor,
  Lock,
  Dock,
  LogInIcon,
} from "lucide-react"

import { NavDoc } from "@/components/layoutmain/nav-doc"
import NavUser from "@/components/layoutmain/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"

const data = {
  navMain: [
    {
      title: "Login",
      url: "/",
      icon: LogInIcon,
      isActive: false,
    },
  ],
  projects: [
    
    {
      name: "Frontend",
      url: "#",
      icon: Monitor,
      items: [
        {
          title: "Visão Geral",
          url: "/docs/public/frontend/visao-geral",
          icon: Dock,
        },
        {
          title: "Autenticação",
          url: "/docs/public/frontend/autenticacao",
          icon: Lock,
        },
        {
          title: "Dashboard",
          url: "/docs/public/frontend/dashboard",
          icon: Lock,
        },
        {
          title: "Cadastro de Pessoas",
          url: "/docs/public/frontend/pessoas",
          icon: Users,
        },
        {
          title: "Cadastro de Categorias",
          url: "/docs/public/frontend/categorias",
          icon: Tags,
        },
        {
          title: "Transações",
          url: "/docs/public/frontend/transacoes",
          icon: ArrowLeftRight,
        },
        {
          title: "Relatórios",
          url: "/docs/public/frontend/relatorios",
          icon: ArrowLeftRight,
        },
      ],
    },
    {
      name: "Backend",
      url: "#",
      icon: Server,
      items: [
        {
          title: "Visão Geral",
          url: "/docs/public/backend/visao-geral",
          icon: Dock,
        },
        {
          title: "Autenticação",
          url: "/docs/public/backend/autenticacao",
          icon: Lock,
        },
        {
          title: "Dashboard",
          url: "/docs/public/backend/dashboard",
          icon: Lock,
        },
        {
          title: "Cadastro de Pessoas",
          url: "/docs/public/backend/pessoas",
          icon: Users,
        },
        {
          title: "Cadastro de Categorias",
          url: "/docs/public/backend/categorias",
          icon: Tags,
        },
        {
          title: "Transações",
          url: "/docs/public/backend/transacoes",
          icon: ArrowLeftRight,
        },
        {
          title: "Relatórios",
          url: "/docs/public/backend/relatorios",
          icon: ArrowLeftRight,
        },
      ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDoc projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
