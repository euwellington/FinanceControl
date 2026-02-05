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
import { type ITransaction } from "@/interfaces/ITransaction"
import { type IPaginated } from "@/interfaces/IPaginated"
import { StoresContext } from "@/stores/inject"
import { cn } from "@/lib/utils"
import UpdateTransaction from "@/components/forms/dialog/transaction/update"
import RemoveTransaction from "@/components/forms/dialog/transaction/remove"

const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => <span className="font-medium">{row.original.description}</span>,
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = row.original.amount
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const isIncome = row.original.type === "Income"
      return (
        <Badge
          className={cn(
            "font-semibold shadow-none",
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
    accessorKey: "descriptionCategory",
    header: "Categoria",
    cell: ({ row }) => {
      const isIncomeCategory = row.original.typeCategory === "Income"
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-medium">{row.original.descriptionCategory}</span>
            <span className="text-[10px] text-muted-foreground uppercase">
              {isIncomeCategory ? "Finalidade: Receita" : "Finalidade: Despesa"}
            </span>
          </div>
          <Badge
            className={cn(
              "font-semibold shadow-none text-[10px] h-5",
              isIncomeCategory
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400"
                : "bg-rose-100 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/20 dark:text-rose-400"
            )}
            variant="outline"
          >
            {isIncomeCategory ? "Receita" : "Despesa"}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "peopleName",
    header: "Pessoa",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.peopleName}</span>
        <span className="text-[10px] text-muted-foreground">{row.original.peopleAge} anos</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const { transactionStore } = React.useContext(StoresContext)
      return (
        <div className="flex items-center" onClick={() => transactionStore.setSelected(row.original.id)}>
          <UpdateTransaction />
          <RemoveTransaction item={row.original} />
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
  data: IPaginated<ITransaction>
}

const DataTable = ({ data }: DataTableProps) => {
  const { transactionStore } = React.useContext(StoresContext)
  const plainData = React.useMemo<ITransaction[]>(() => toJS(data.data) ?? [], [data.data])
  const [currentPage, setCurrentPage] = React.useState<number>(data.page)
  const [pageSize, setPageSize] = React.useState<number>(data.pageSize)

  React.useEffect(() => {
    setCurrentPage(data.page)
    setPageSize(data.pageSize)
  }, [data.page, data.pageSize])

  const table = useReactTable<ITransaction>({
    data: plainData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const totalPages: number = data.totalPages

  const fetchData = (pageParam: number, pageSizeParam: number): void => {
    transactionStore.getAll({ page: pageParam, pageSize: pageSizeParam })
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
              <CardTitle className="text-gray-900 dark:text-gray-100 text-sm font-semibold">Transações</CardTitle>
              <CardDescription className="text-xs">
                Total de {data.totalRecords} lançamentos encontrados.
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
              {transactionStore.loading ? (
                Array.from({ length: pageSize }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-6 w-full" /></TableCell>
                    ))}
                  </TableRow>
                ))
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
            <div className="text-sm text-muted-foreground">Página {currentPage} de {totalPages}</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || transactionStore.loading}>Anterior</Button>
              {pages.map((page, index) => (
                page === "..." ? <span key={index} className="px-2 text-sm text-muted-foreground">...</span> :
                  <Button key={index} variant={currentPage === page ? "default" : "outline"} size="sm" disabled={transactionStore.loading} onClick={() => handlePageChange(Number(page))}>{page}</Button>
              ))}
              <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || transactionStore.loading}>Próximo</Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default observer(DataTable)