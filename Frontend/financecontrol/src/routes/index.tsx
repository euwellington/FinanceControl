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
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default observer(RouteLogin);