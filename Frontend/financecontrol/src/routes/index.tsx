"use client"

import * as React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { jwtDecode } from "jwt-decode";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/notfound";
import HomePage from "@/pages/dashboard";
import ButtonTheme from "@/components/buttontheme";
import PagePeople from "@/pages/people";
import PageCategory from "@/pages/category";
import PageTransaction from "@/pages/transaction";
import PagePeopleReport from "@/pages/report/people";
import PageCategoryReport from "@/pages/report/category";

import PageDocBackendOverview from "@/pages/doc/backend/overview";
import PageDocBackendAuth from "@/pages/doc/backend/auth";
import PageDocBackendDashboard from "@/pages/doc/backend/dashboard";
import PageDocBackendPeople from "@/pages/doc/backend/people";
import PageDocBackendCategory from "@/pages/doc/backend/category";
import PageDocBackendTransaction from "@/pages/doc/backend/transaction";
import PageDocBackendReport from "@/pages/doc/backend/report";

import PageDocFrontendOverview from "@/pages/doc/frontend/overview";
import PageDocFrontendAuth from "@/pages/doc/frontend/auth";
import PageDocFrontendDashboard from "@/pages/doc/frontend/dashboard";
import PageDocFrontendPeople from "@/pages/doc/frontend/people";
import PageDocFrontendCategory from "@/pages/doc/frontend/category";
import PageDocFrontendTransaction from "@/pages/doc/frontend/transaction";
import PageDocFrontendReport from "@/pages/doc/frontend/report";

import SidebarLoginLayout from '@/components/layoutlogin';
import SidebarLayout from "@/components/layoutmain"


const TOKEN_KEY = "@token";

const AuthService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),

  isValid: (): boolean => {
    const token = AuthService.getToken();
    if (!token) return false;

    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return exp >= Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }
};

const ProtectedLayout = () => {
  if (!AuthService.isValid()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <ButtonTheme />
      <Outlet />
    </>
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return AuthService.isValid() ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const RouteLogin = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />

      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/pessoas" element={<PagePeople />} />
        <Route path="/categorias" element={<PageCategory />} />
        <Route path="/transacoes" element={<PageTransaction />} />

        {/* Report  */}
        <Route path="/realtorio" element={<PageTransaction />} />
        <Route path="/relatorios/pessoas" element={<PagePeopleReport />} />
        <Route path="/relatorios/categorias" element={<PageCategoryReport />} />

        {/* Doc */}
        <Route path="/docs/backend/visao-geral" element={<SidebarLayout><PageDocBackendOverview /></SidebarLayout>} />
        <Route path="/docs/backend/autenticacao" element={<SidebarLayout><PageDocBackendAuth /></SidebarLayout>} />
        <Route path="/docs/backend/dashboard" element={<SidebarLayout><PageDocBackendDashboard /></SidebarLayout>} />
        <Route path="/docs/backend/pessoas" element={<SidebarLayout><PageDocBackendPeople /></SidebarLayout>} />
        <Route path="/docs/backend/categorias" element={<SidebarLayout><PageDocBackendCategory /></SidebarLayout>} />
        <Route path="/docs/backend/transacoes" element={<SidebarLayout><PageDocBackendTransaction /></SidebarLayout>} />
        <Route path="/docs/backend/relatorios" element={<SidebarLayout><PageDocBackendReport /></SidebarLayout>} />

        <Route path="/docs/frontend/visao-geral" element={<SidebarLayout><PageDocFrontendOverview /></SidebarLayout>} />
        <Route path="/docs/frontend/autenticacao" element={<SidebarLayout><PageDocFrontendAuth /></SidebarLayout>} />
        <Route path="/docs/frontend/dashboard" element={<SidebarLayout><PageDocFrontendDashboard /></SidebarLayout>} />
        <Route path="/docs/frontend/pessoas" element={<SidebarLayout><PageDocFrontendPeople /></SidebarLayout>} />
        <Route path="/docs/frontend/categorias" element={<SidebarLayout><PageDocFrontendCategory /></SidebarLayout>} />
        <Route path="/docs/frontend/transacoes" element={<SidebarLayout><PageDocFrontendTransaction /></SidebarLayout>} />
        <Route path="/docs/frontend/relatorios" element={<SidebarLayout><PageDocFrontendReport /></SidebarLayout>} />
      </Route>

      <Route path="/docs/public/backend/visao-geral" element={<SidebarLoginLayout><PageDocBackendOverview /></SidebarLoginLayout>} />
      <Route path="/docs/public/backend/autenticacao" element={<SidebarLoginLayout><PageDocBackendAuth /></SidebarLoginLayout>} />
      <Route path="/docs/public/backend/dashboard" element={<SidebarLoginLayout><PageDocBackendDashboard /></SidebarLoginLayout>} />
      <Route path="/docs/public/backend/pessoas" element={<SidebarLoginLayout><PageDocBackendPeople /></SidebarLoginLayout>} />
      <Route path="/docs/public/backend/categorias" element={<SidebarLoginLayout><PageDocBackendCategory /></SidebarLoginLayout>} />
      <Route path="/docs/public/backend/transacoes" element={<SidebarLoginLayout><PageDocBackendTransaction /></SidebarLoginLayout>} />
      <Route path="/docs/public/backend/relatorios" element={<SidebarLoginLayout><PageDocBackendReport /></SidebarLoginLayout>} />

      <Route path="/docs/public/frontend/visao-geral" element={<SidebarLoginLayout><PageDocFrontendOverview /></SidebarLoginLayout>} />
      <Route path="/docs/public/frontend/autenticacao" element={<SidebarLoginLayout><PageDocFrontendAuth /></SidebarLoginLayout>} />
      <Route path="/docs/public/frontend/dashboard" element={<SidebarLoginLayout><PageDocFrontendDashboard /></SidebarLoginLayout>} />
      <Route path="/docs/public/frontend/pessoas" element={<SidebarLoginLayout><PageDocFrontendPeople /></SidebarLoginLayout>} />
      <Route path="/docs/public/frontend/categorias" element={<SidebarLoginLayout><PageDocFrontendCategory /></SidebarLoginLayout>} />
      <Route path="/docs/public/frontend/transacoes" element={<SidebarLoginLayout><PageDocFrontendTransaction /></SidebarLoginLayout>} />
      <Route path="/docs/public/frontend/relatorios" element={<SidebarLoginLayout><PageDocFrontendReport /></SidebarLoginLayout>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default observer(RouteLogin);