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
import { type IPeople } from "@/interfaces/IPeople"
import { type IPaginated } from "@/interfaces/IPaginated"
import { StoresContext } from "@/stores/inject"
import UpdatePeople from "@/components/forms/dialog/people/update"
import RemovePeople from "@/components/forms/dialog/people/remove"

const columns: ColumnDef<IPeople>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const { jwtStore } = React.useContext(StoresContext)

      return <span className="font-medium">{row.original.name} {jwtStore.decoded?.Id === row.original.id ? `(Você)` : ''}</span>
    },
  },
  {
    accessorKey: "age",
    header: "Idade",
    cell: ({ row }) => row.original.age,
  },
  {
    accessorKey: "email",
    header: "E-mail",
    cell: ({ row }) => row.original.email,
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const { peopleStore } = React.useContext(StoresContext)
      return (
        <div onClick={() => peopleStore.setSelected(row.original.id)}>
          <UpdatePeople />
          <RemovePeople item={row.original} />
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
  data: IPaginated<IPeople>
}

const DataTable = ({ data }: DataTableProps) => {
  const { peopleStore } = React.useContext(StoresContext)

  const plainData = React.useMemo<IPeople[]>(
    () => toJS(data.data) ?? [],
    [data.data]
  )

  const [currentPage, setCurrentPage] = React.useState<number>(data.page)
  const [pageSize, setPageSize] = React.useState<number>(data.pageSize)

  React.useEffect(() => {
    setCurrentPage(data.page)
    setPageSize(data.pageSize)
  }, [data.page, data.pageSize])

  const table = useReactTable<IPeople>({
    data: plainData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const totalPages: number = data.totalPages

  const fetchData = (pageParam: number, pageSizeParam: number): void => {
    peopleStore.getAll({
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
              <CardTitle className="text-gray-900 dark:text-gray-100 text-sm font-semibold">Pessoas</CardTitle>
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
              {peopleStore.loading ? (
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
                    Nenhum registro encontrado.
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
                disabled={currentPage === 1 || peopleStore.loading}
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
                    disabled={peopleStore.loading}
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
                disabled={currentPage === totalPages || peopleStore.loading}
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

export default observer(DataTable)