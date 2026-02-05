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

export interface IPaginatedReport<T> {
  data?: T[]
  totalsByPerson?: T[]
  page: number
  pageSize: number
  totalRecords: number
  totalIncome?: number
  totalExpense?: number
  totalBalance?: number
}

interface DataTableProps<T extends Record<string, any>> {
  data: IPaginatedReport<T>
}

const columnLabels: Record<string, string> = {
  name: "Nome",
  totalIncome: "Receitas",
  totalExpense: "Despesas",
  balance: "Saldo",
}

const hiddenFields = ["id", "personId", "categoryId"]

const formatHeader = (key: string): string =>
  columnLabels[key] ??
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())

const DataTable = <T extends Record<string, any>>({
  data,
}: DataTableProps<T>) => {
  const rows = React.useMemo<T[]>(() => {
    const raw = data.data ?? data.totalsByPerson ?? []
    return toJS(raw)
  }, [data])

  const columns = React.useMemo<ColumnDef<T>[]>(() => {
    if (!rows.length) return []

    return Object.keys(rows[0])
      .filter((key) => !hiddenFields.includes(key))
      .map((key) => ({
        accessorKey: key,
        header: formatHeader(key),
        cell: ({ row }) => {
          const value = row.original[key]

          if (typeof value === "number") {
            return value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }

          return String(value)
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
          Relatório
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

export default observer(DataTable)