"use client"

import * as React from "react"
import { observer } from "mobx-react-lite"
import { useContext, useState, useEffect } from "react"
import { StoresContext } from "@/stores/inject"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Pencil, Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { useCategory } from "@/hooks/category.hook"
import { CategoryValidation } from "@/validations/CategoryValidation"
import type { ICategory } from "@/interfaces/ICategory"

const UpdateCategory = () => {
  const { update, loading } = useCategory()
  const { categoryStore } = useContext(StoresContext)
  const [isOpen, setIsOpen] = useState(false)
  const [request, setRequest] = useState<Partial<ICategory>>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (isOpen && categoryStore.selected) {
      setRequest(categoryStore.selected)
      setErrors({})
    }
  }, [isOpen, categoryStore.selected])

  const handleChange = (field: keyof ICategory, value: string) => {
    setRequest(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const validationErrors = CategoryValidation(request as any)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    update(request as ICategory, () => setIsOpen(false))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="h-9 w-9 p-0 bg-[#2c2f6e] text-white hover:bg-[#3a3e8f] hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-none transition-colors"
        >
          <Pencil size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
        )}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#2c2f6e] dark:text-blue-400">
              <Save size={20} />
              Atualizar Categoria
            </DialogTitle>
            <DialogDescription>
              Editando a categoria: <span className="font-bold text-foreground">{categoryStore.selected?.description}</span>
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-4">
            <Field>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Ex: Alimentação, Transporte..."
                value={request.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="bg-gray-50 dark:bg-slate-900"
              />
              {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
            </Field>

            <Field>
              <Label htmlFor="purpose">Tipo</Label>
              <Select
                value={request.purpose}
                onValueChange={(value) => handleChange("purpose", value)}
              >
                <SelectTrigger id="purpose" className="bg-gray-50 dark:bg-slate-900 w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Income">Receita</SelectItem>
                  <SelectItem value="Expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
              {errors.purpose && <span className="text-xs text-red-500">{errors.purpose}</span>}
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={loading}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#2c2f6e] text-white ml-2 hover:bg-[#3a3e8f] dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default observer(UpdateCategory)