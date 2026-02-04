import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { observer } from "mobx-react-lite";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import SiteHeader from "./site-header";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <div data-sidebar-wrapper className="flex min-h-svh w-full">
        <AppSidebar />
        <SidebarInset data-sidebar-inset="true" className="flex flex-col">
          <SiteHeader />
          <main className="p-6"> 
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
export default observer(SidebarLayout);