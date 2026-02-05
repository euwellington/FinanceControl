"use client"

import { 
  SidebarInset, 
  SidebarProvider, 
  SidebarTrigger // Importação necessária
} from "@/components/ui/sidebar";
import { observer } from "mobx-react-lite";
import React from "react";
import { AppSidebar } from "./app-sidebar";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLoginLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <div data-sidebar-wrapper className="flex min-h-svh w-full">
        <AppSidebar />
        <SidebarInset data-sidebar-inset="true" className="flex flex-col">
          {/* Header visível apenas no mobile ou para controle do menu */}
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 md:hidden">
            <SidebarTrigger className="-ml-1" />
          </header>
          
          <main className="p-6"> 
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default observer(SidebarLoginLayout);