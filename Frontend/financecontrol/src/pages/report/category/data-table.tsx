"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { ColumnDef } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { observer } from "mobx-react-lite"
import { toJS } from "mobx"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface IPaginatedReport<T> {
  data?: T[]
  totalsByPerson?: T[]
  totalsByCategory?: T[]
  page: number
  pageSize: number
  totalRecords: number
  totalIncome?: number
  totalExpense?: number
  totalBalance?: number
}

export interface ICategoryTotal {
  categoryId: string
  name: string
  description?: string
  purpose?: "Income" | "Expense"
  totalIncome: number
  totalExpense: number
  balance: number
}

interface DataTableProps {
  data: IPaginatedReport<ICategoryTotal>
}

const columnLabels: Record<string, string> = {
  name: "Categoria",
  description: "Descrição",
  purpose: "Tipo",
  totalIncome: "Receitas",
  totalExpense: "Despesas",
  balance: "Saldo",
}

const hiddenFields = ["id", "categoryId"]

const formatHeader = (key: string): string =>
  columnLabels[key] ??
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())

const DataTableCategory = ({ data }: DataTableProps) => {
  const rows = React.useMemo<ICategoryTotal[]>(() => {
    const raw =
      data.data ??
      data.totalsByCategory ??
      []
    return toJS(raw)
  }, [data])

  const columns = React.useMemo<ColumnDef<ICategoryTotal>[]>(() => {
    if (!rows.length) return []

    return Object.keys(rows[0])
      .filter((key) => !hiddenFields.includes(key))
      .map((key) => ({
        accessorKey: key,
        header: formatHeader(key),
        cell: ({ row }) => {
          const value = row.original[key as keyof ICategoryTotal]

          if (key === "purpose") {
            const isIncome = value === "Income"

            return (
              <Badge
                className={
                  isIncome
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400"
                    : "bg-rose-100 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/20 dark:text-rose-400"
                }
              >
                {isIncome ? "Receita" : "Despesa"}
              </Badge>
            )
          }

          if (typeof value === "number") {
            return value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }

          return String(value ?? "-")
        },
      }))
  }, [rows])

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const totalPages = Math.ceil(data.totalRecords / data.pageSize) || 1

  return (
    <div className="overflow-hidden rounded-lg border bg-white dark:bg-gray-900">
      <div className="p-6 flex flex-col gap-1 border-b bg-gray-50 dark:bg-gray-800">
        <CardTitle className="text-sm font-semibold">
          Relatório por Categoria
        </CardTitle>
        <CardDescription className="text-xs">
          Total de {data.totalRecords} registros encontrados.
        </CardDescription>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length || 1}
                className="h-24 text-center"
              >
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center p-4 border-t">
        <span className="text-sm text-muted-foreground">
          Página {data.page} de {totalPages}
        </span>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={data.page === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={data.page === totalPages}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default observer(DataTableCategory)