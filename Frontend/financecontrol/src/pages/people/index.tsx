"use client"

import { observer } from 'mobx-react-lite'
import SidebarLayout from "@/components/layout"
import { useContext, useEffect, useMemo } from 'react'
import { StoresContext } from '@/stores/inject'
import DataTable from './data-table'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ArrowUp, ArrowDown, BarChart3 } from "lucide-react"
import AddPeople from "@/components/forms/dialog/people/add"
import { Skeleton } from "@/components/ui/skeleton"

const PagePeople = () => {
  const { peopleStore } = useContext(StoresContext)

  useEffect(() => {
    peopleStore.getAll({ page: 1, pageSize: 10 })
  }, [peopleStore])

  const stats = useMemo(() => {
    const list = peopleStore.people?.data || []
    if (list.length === 0) return { oldest: 0, youngest: 0, average: 0, median: 0 }

    const ages = list.map(p => Number(p.age)).sort((a, b) => a - b)
    
    const oldest = Math.max(...ages)
    const youngest = Math.min(...ages)
    const average = ages.reduce((a, b) => a + b, 0) / ages.length

    let median = 0
    const mid = Math.floor(ages.length / 2)
    if (ages.length % 2 === 0) {
      median = (ages[mid - 1] + ages[mid]) / 2
    } else {
      median = ages[mid]
    }

    return { oldest, youngest, average, median }
  }, [peopleStore.people?.data])

  return (
    <SidebarLayout>
      <div className="flex flex-col gap-8">
        
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestão de Pessoas</h1>
            <p className="text-muted-foreground text-sm font-medium">
              Análise demográfica e listagem de usuários do sistema.
            </p>
          </div>
          <AddPeople/>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Total de Pessoas</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              {peopleStore.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{peopleStore.people?.totalRecords ?? 0}</div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Registros na base</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Mais Jovem / Velha</CardTitle>
              <div className="flex gap-1">
                <ArrowDown className="h-4 w-4 text-emerald-500" />
                <ArrowUp className="h-4 w-4 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              {peopleStore.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">
                  {stats.youngest} / {stats.oldest}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Amplitude de idade</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Média de Idade</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              {peopleStore.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{stats.average.toFixed(1)} <span className="text-sm font-normal">anos</span></div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Média aritmética</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Mediana</CardTitle>
              <BarChart3 className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              {peopleStore.loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{stats.median} <span className="text-sm font-normal">anos</span></div>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 uppercase">Ponto central da base</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-card-foreground shadow-sm">
          {peopleStore.loading && !peopleStore.people ? (
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
            peopleStore.people && <DataTable data={peopleStore.people} />
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}

export default observer(PagePeople)