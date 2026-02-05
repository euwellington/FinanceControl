"use client"

import { observer } from 'mobx-react-lite'
import SidebarLayout from "@/components/layout"
import { useContext, useEffect } from 'react'
import { StoresContext } from '@/stores/inject'
import DataTable from './data-table'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const PagePeopleReport = () => {
  const { reportStore } = useContext(StoresContext)

  useEffect(() => {
    reportStore.getTransactionsPeople({ page: 1, pageSize: 10, name: '' })
  }, [reportStore])

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const reportData = reportStore.transactionPeople

  return (
    <SidebarLayout>
      <div className="flex flex-col gap-8">
        
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Relatório Financeiro por Pessoa</h1>
            <p className="text-muted-foreground text-sm font-medium">
              Acompanhamento de fluxos de caixa, saldos e totais por integrante.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Total de Pessoas</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              {reportStore.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{reportData?.totalRecords ?? 0}</div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Pessoas listadas</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Receita Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              {reportStore.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(reportData?.totalIncome ?? 0)}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Entradas acumuladas</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Despesa Total</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              {reportStore.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(reportData?.totalExpense ?? 0)}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Saídas acumuladas</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Saldo Geral</CardTitle>
              <Wallet className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              {reportStore.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className={`text-2xl font-bold ${(reportData?.totalBalance ?? 0) < 0 ? 'text-red-600' : 'text-amber-600'}`}>
                  {formatCurrency(reportData?.totalBalance ?? 0)}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Balanço líquido</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-card-foreground shadow-sm">
          {reportStore.loading && !reportData ? (
            <div className="p-8 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-8 w-[100px]" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </div>
          ) : (
            reportData && <DataTable data={reportData} />
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}

export default observer(PagePeopleReport)