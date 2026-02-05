"use client"

import AreaChart from "@/components/dashboard"
import SidebarLayout from "@/components/layoutmain"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StoresContext } from "@/stores/inject"
import {
  Users,
  DollarSign,
  Wallet,
  ArrowDownCircle,
  LayoutGrid,
  Activity,
  TrendingUp
} from "lucide-react"
import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"

const HomePage = () => {
  const { dashboardStore } = useContext(StoresContext)
  const data = dashboardStore.dashboard
  const loading = dashboardStore.loading

  useEffect(() => {
    dashboardStore.getDashboard()
  }, [dashboardStore])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value)
  }

  const getTrendLabel = (value: number) => {
    if (value > 0) return "Crescimento"
    if (value < 0) return "Queda"
    return "Estável"
  }

  const getBalanceStatus = (value: number) => {
    return value >= 0 ? "Saldo positivo" : "Saldo negativo"
  }

  return (
    <SidebarLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Olá! Acompanhe aqui o desempenho das suas movimentações e indicadores em tempo real
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Categorias"
            value={data?.totalCategories.toString() || "0"}
            icon={<LayoutGrid className="h-4 w-4 text-amber-500" />}
            borderColor="border-l-amber-500"
            loading={loading}
            trend={data ? `${data.totalCategories}` : "0"}
            subtitle="categorias cadastradas"
          />

          <MetricCard
            title="Pessoas"
            value={data?.totalPeople.toString() || "0"}
            icon={<Users className="h-4 w-4 text-violet-500" />}
            borderColor="border-l-violet-500"
            loading={loading}
            trend={data ? `${data.totalPeople}` : "0"}
            subtitle="pessoas registradas"
          />

          <MetricCard
            title="Transações"
            value={data?.totalTransactions.toString() || "0"}
            icon={<Activity className="h-4 w-4 text-sky-500" />}
            borderColor="border-l-sky-500"
            loading={loading}
            trend={data ? `${data.totalTransactions}` : "0"}
            subtitle="movimentações registradas"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Receita"
            value={data ? formatCurrency(data.revenue) : ""}
            icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
            borderColor="border-l-emerald-500"
            loading={loading}
            trend={data ? getTrendLabel(data.revenue) : ""}
            subtitle="entrada total"
          />

          <MetricCard
            title="Despesas"
            value={data ? formatCurrency(data.expenses) : ""}
            icon={<ArrowDownCircle className="h-4 w-4 text-rose-500" />}
            borderColor="border-l-rose-500"
            loading={loading}
            trend={data ? getTrendLabel(data.expenses * -1) : ""}
            subtitle="saídas acumuladas"
          />

          <MetricCard
            title="Saldo Líquido"
            value={data ? formatCurrency(data.netBalance) : ""}
            icon={
              <Wallet
                className={`h-4 w-4 ${
                  data?.isPositiveBalance ? "text-blue-500" : "text-rose-500"
                }`}
              />
            }
            borderColor={
              data?.isPositiveBalance
                ? "border-l-blue-500"
                : "border-l-rose-500"
            }
            loading={loading}
            trend={data ? getBalanceStatus(data.netBalance) : ""}
            subtitle="disponível em conta"
          />
        </div>

        <Card className="shadow-sm border-l-4 border-l-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                Fluxo de Caixa
              </CardTitle>
              <p className="text-[10px] text-muted-foreground uppercase mt-1">
                Análise de performance mensal
              </p>
            </div>
            <TrendingUp className="h-4 w-4 text-slate-800" />
          </CardHeader>

          <CardContent className="h-[300px] pt-4">
            <AreaChart
              history={dashboardStore.dashboard?.history || []}
              loading={dashboardStore.loading}
            />
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  )
}

interface MetricCardProps {
  title: string
  value: string
  unit?: string
  icon: React.ReactNode
  borderColor: string
  loading: boolean
  trend: string
  subtitle: string
}

function MetricCard({
  title,
  value,
  unit,
  icon,
  borderColor,
  loading,
  trend,
  subtitle
}: MetricCardProps) {
  return (
    <Card className={`border-l-4 ${borderColor} shadow-sm`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>

      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold tracking-tight">
            {value}
            {unit && (
              <span className="text-sm font-normal text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
        )}

        <p className="text-[10px] text-muted-foreground mt-1 uppercase">
          <span className="font-bold text-foreground mr-1">{trend}</span>
          {subtitle}
        </p>
      </CardContent>
    </Card>
  )
}

export default observer(HomePage)