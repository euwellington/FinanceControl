"use client"

import { observer } from 'mobx-react-lite'
import SidebarLayout from "@/components/layoutmain"
import { useContext, useEffect, useMemo } from 'react'
import { StoresContext } from '@/stores/inject'
import DataTable from './data-table'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ArrowUpCircle, ArrowDownCircle, Banknote } from "lucide-react"
import AddTransaction from "@/components/forms/dialog/transaction/add"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { EmptyState } from '@/components/empty'

const PageTransaction = () => {
  const { transactionStore } = useContext(StoresContext)

  useEffect(() => {
    transactionStore.getAll({ page: 1, pageSize: 10 })
  }, [transactionStore])

  const stats = useMemo(() => {
    const list = transactionStore.transactions?.data || []
    
    const income = list
      .filter(t => t.type === "Income")
      .reduce((acc, curr) => acc + curr.amount, 0)
    
    const expense = list
      .filter(t => t.type === "Expense")
      .reduce((acc, curr) => acc + curr.amount, 0)

    const balance = income - expense

    return { 
      income, 
      expense, 
      balance,
      count: transactionStore.transactions?.totalRecords ?? 0 
    }
  }, [transactionStore.transactions?.data, transactionStore.transactions?.totalRecords])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const renderContent = () => {
    // 1. Estado de Carregamento
    if (transactionStore.loading && !transactionStore.transactions) {
      return (
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
      )
    }

    // 2. Estado Vazio (Empty State)
    const hasData = transactionStore.transactions?.data && transactionStore.transactions.data.length > 0
    
    if (!hasData) {
      return (
        <div className="bg-card rounded-xl border border-dashed p-12 shadow-sm flex justify-center items-center text-center">
          <EmptyState
            title="Nenhuma transação encontrada"
            description="Parece que você ainda não possui movimentações financeiras cadastradas ou a lista está vazia."
            actionComponent={<AddTransaction />} 
          />
        </div>
      )
    }

    // 3. Tabela com Dados
    return <DataTable data={transactionStore.transactions!} />
  }

  return (
    <SidebarLayout>
      <div className="flex flex-col gap-8">
        
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestão de Transações</h1>
            <p className="text-muted-foreground text-sm font-medium">
              Controle seu fluxo de caixa, receitas e despesas detalhadas.
            </p>
          </div>
          <AddTransaction />
        </div>

        {/* Dashboard de Finanças */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Saldo Total (Pág.)</CardTitle>
              <Wallet className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              {transactionStore.loading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className={cn(
                  "text-2xl font-bold",
                  stats.balance >= 0 ? "text-foreground" : "text-rose-600"
                )}>
                  {formatCurrency(stats.balance)}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Resultado líquido atual</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Receitas</CardTitle>
              <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              {transactionStore.loading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(stats.income)}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Total de entradas</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-rose-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Despesas</CardTitle>
              <ArrowDownCircle className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              {transactionStore.loading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className="text-2xl font-bold text-rose-600">
                  {formatCurrency(stats.expense)}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Total de saídas</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Total de Lançamentos</CardTitle>
              <Banknote className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              {transactionStore.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{stats.count}</div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Registros no banco</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-card-foreground shadow-sm">
          {renderContent()}
        </div>
      </div>
    </SidebarLayout>
  )
}

export default observer(PageTransaction)