"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { observer } from "mobx-react-lite"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

export interface ITransactionHistory {
  transactionDate: string
  amount: number
  type: "Income" | "Expense"
  description: string
}

interface ChartAreaInteractiveProps {
  history: ITransactionHistory[]
  loading?: boolean
}

const chartConfig = {
  Income: {
    label: "Receita",
    color: "#22c55e",
  },
  Expense: {
    label: "Despesa",
    color: "#ef4444",
  },
} satisfies ChartConfig

const ChartAreaInteractive = ({ history, loading }: ChartAreaInteractiveProps) => {
  const [timeRange] = React.useState("90d")

  const chartData = React.useMemo(() => {
    if (!history || history.length === 0) return []

    const grouped = history.reduce((acc, curr) => {
      const dateKey = curr.transactionDate.split("T")[0]

      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, Income: 0, Expense: 0 }
      }

      if (curr.type === "Income") {
        acc[dateKey].Income += curr.amount
      } else {
        acc[dateKey].Expense += curr.amount
      }
      return acc
    }, {} as Record<string, { date: string; Income: number; Expense: number }>)

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }, [history])

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return chartData.filter((item) => new Date(item.date) >= startDate)
  }, [chartData, timeRange])

  if (loading) {
    return (
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-[160px] rounded-lg" />
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <Skeleton className="h-[250px] w-full rounded-xl" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="pt-0">
      <CardContent className="">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.Income.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartConfig.Income.color} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.Expense.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartConfig.Expense.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => format(parseISO(value), "dd MMM", { locale: ptBR })}
            />
            <YAxis hide domain={[0, 'auto']} />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => format(parseISO(value), "dd/MM/yyyy")}
                />
              }
            />
            <Area
              dataKey="Income"
              type="monotone"
              fill="url(#fillIncome)"
              stroke={chartConfig.Income.color}
              strokeWidth={2}
              stackId="income" 
            />
            <Area
              dataKey="Expense"
              type="monotone"
              fill="url(#fillExpense)"
              stroke={chartConfig.Expense.color}
              strokeWidth={2}
              stackId="expense" 
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default observer(ChartAreaInteractive)