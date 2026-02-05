"use client"

import { observer } from "mobx-react-lite"
import SidebarLayout from "@/components/layoutmain"
import { useContext, useEffect, useMemo } from "react"
import { StoresContext } from "@/stores/inject"
import DataTable from "./data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, TrendingUp, TrendingDown } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/empty"
import AddCategory from "@/components/forms/dialog/category/add"

const PageCategory = () => {
  const { categoryStore } = useContext(StoresContext)

  useEffect(() => {
    categoryStore.getAll({ page: 1, pageSize: 10 })
  }, [categoryStore])

  const stats = useMemo(() => {
    const data = categoryStore.categories?.data ?? []

    return {
      total: categoryStore.categories?.totalRecords ?? 0,
      income: data.filter((c) => c.purpose === "Income").length,
      expense: data.filter((c) => c.purpose === "Expense").length,
    }
  }, [categoryStore.categories])

  const renderContent = () => {
    if (categoryStore.loading && !categoryStore.categories) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-[100px] w-full rounded-xl" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      )
    }

    const hasData = categoryStore.categories?.data && categoryStore.categories.data.length > 0

    if (!hasData) {
      return (
        <div className="bg-card rounded-xl border border-dashed p-4 shadow-sm">
          <EmptyState
            title="Nenhuma categoria encontrada"
            description="Parece que você ainda não possui categorias cadastradas ou a lista está vazia."
            actionComponent={<AddCategory />} />
        </div>
      )
    }
    return <DataTable data={categoryStore.categories!} />
  }

  return (
    <SidebarLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Gestão de Categorias
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Organize suas receitas e despesas por tipo.
            </p>
          </div>
          
          {categoryStore.categories && categoryStore.categories?.data?.length > 0 && <AddCategory />}

        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-l-4 border-l-blue-500 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                Total Registrado
              </CardTitle>
              <Layers className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              {categoryStore.loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats.total}</div>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                Entradas (Income)
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              {categoryStore.loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats.income}</div>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-rose-500 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                Saídas (Expense)
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              {categoryStore.loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats.expense}</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-full">
          {renderContent()}
        </div>
      </div>
    </SidebarLayout>
  )
}

export default observer(PageCategory)