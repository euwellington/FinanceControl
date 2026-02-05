"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { observer } from "mobx-react-lite"
import { toJS } from "mobx"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { StoresContext } from "@/stores/inject"
import { format } from "date-fns"

export interface ICategory {
  id: string
  description: string
  purpose: "Income" | "Expense"
  createdAt: Date
  updatedAt: Date | null
}

import UpdateCategory from "@/components/forms/dialog/category/update"
import RemoveCategory from "@/components/forms/dialog/category/remove"
import type { IPaginated } from "@/interfaces/IPaginated"
import { cn } from "@/lib/utils"

const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => <span className="font-medium">{row.original.description}</span>,
  },
  {
    accessorKey: "purpose",
    header: "Tipo",
    cell: ({ row }) => {
      const isIncome = row.original.purpose === "Income"
      return (
        <Badge
          className={cn(
            "font-semibold",
            isIncome
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400"
              : "bg-rose-100 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/20 dark:text-rose-400"
          )}
          variant="outline"
        >
          {isIncome ? "Receita" : "Despesa"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy HH:mm"),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const { categoryStore } = React.useContext(StoresContext)
      return (
        <div onClick={() => categoryStore.setSelected(row.original.id)} className="flex gap-2">
          <UpdateCategory />
          <RemoveCategory item={row.original} />
        </div>
      )
    },
  },
]

function generatePageNumbers(current: number, total: number): (number | string)[] {
  const pages: (number | string)[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", total)
    } else if (current >= total - 3) {
      pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total)
    }
  }
  return pages
}

interface DataTableProps {
  data: IPaginated<ICategory>
}

const CategoryDataTable = ({ data }: DataTableProps) => {
  const { categoryStore } = React.useContext(StoresContext)

  const plainData = React.useMemo<ICategory[]>(
    () => toJS(data.data) ?? [],
    [data.data]
  )

  const [currentPage, setCurrentPage] = React.useState<number>(data.page)
  const [pageSize, setPageSize] = React.useState<number>(data.pageSize)

  React.useEffect(() => {
    setCurrentPage(data.page)
    setPageSize(data.pageSize)
  }, [data.page, data.pageSize])

  const table = useReactTable<ICategory>({
    data: plainData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const totalPages: number = data.totalPages

  const fetchData = (pageParam: number, pageSizeParam: number): void => {
    categoryStore.getAll({
      page: pageParam,
      pageSize: pageSizeParam
    })
  }

  const handlePageChange = (page: number): void => {
    if (page < 1 || page > totalPages || page === currentPage) return
    setCurrentPage(page)
    fetchData(page, pageSize)
  }

  const handlePageSizeChange = (value: string): void => {
    const newSize = Number(value)
    setPageSize(newSize)
    setCurrentPage(1)
    fetchData(1, newSize)
  }

  const pages = generatePageNumbers(currentPage, totalPages)

  return (
    <Tabs defaultValue="list" className="flex w-full flex-col justify-start">
      <TabsContent value="list" className="relative flex flex-col overflow-auto">
        <div className="overflow-hidden rounded-lg border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700">
          <div className="p-6 flex flex-wrap items-center justify-between gap-6 rounded-t-lg bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-sm font-semibold">Categorias</CardTitle>
              <CardDescription className="text-xs">
                Total de {data.totalRecords} registros encontrados.
              </CardDescription>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col min-w-[120px]">
                <Label className="text-xs font-medium mb-1">Itens por página</Label>
                <Select onValueChange={handlePageSizeChange} value={pageSize.toString()}>
                  <SelectTrigger className="h-8 bg-white dark:bg-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 50].map((size) => (
                      <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {categoryStore.loading ? (
                Array.from({ length: pageSize }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Nenhuma categoria encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center w-full flex-wrap gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || categoryStore.loading}
              >
                Anterior
              </Button>
              {pages.map((page, index) =>
                page === "..." ? (
                  <span key={index} className="px-2 text-sm text-muted-foreground">...</span>
                ) : (
                  <Button
                    key={index}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    disabled={categoryStore.loading}
                    onClick={() => handlePageChange(Number(page))}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || categoryStore.loading}
              >
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default observer(CategoryDataTable)