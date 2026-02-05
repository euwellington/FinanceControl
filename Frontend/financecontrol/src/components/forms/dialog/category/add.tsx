"use client"

import { Button } from "@/components/ui/button"
import { observer } from 'mobx-react-lite';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ICategory } from "@/interfaces/ICategory";
import { useCategory } from "@/hooks/category.hook";
import { CategoryValidation } from "@/validations/CategoryValidation";

const AddCategory = () => {
  const { insert, loading } = useCategory();
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState<Partial<ICategory>>({
    purpose: "Income"
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpen = () => {
    setRequest({ purpose: "Income" });
    setErrors({});
    setIsOpen(true);
  };

  const handleChange = (field: keyof ICategory, value: string) => {
    setRequest(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = CategoryValidation(request as any);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await insert(request as ICategory);
    if (result) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="bg-[#2c2f6e] text-white hover:bg-[#3a3e8f] hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-none transition-colors gap-2"
          onClick={handleOpen}
        >
          <PlusCircle size={18} />
          Nova categoria
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className={cn(
          "sm:max-w-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
        )}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nova Categoria</DialogTitle>
            <DialogDescription>
              Cadastre uma nova categoria para organizar suas finanças.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-4">
            <Field>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Ex: Salário, Aluguel, Alimentação..."
                value={request.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              {errors.description && (
                <span className="text-xs text-red-500 font-medium">{errors.description}</span>
              )}
            </Field>

            <Field>
              <Label htmlFor="purpose">Tipo de Categoria</Label>
              <Select
                value={request.purpose}
                onValueChange={(value) => handleChange("purpose", value)}
              >
                <SelectTrigger id="purpose" className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Income">Receita</SelectItem>
                  <SelectItem value="Expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
              {errors.purpose && (
                <span className="text-xs text-red-500 font-medium">{errors.purpose}</span>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={loading}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-[#2c2f6e] ml-2 text-white hover:bg-[#3a3e8f]" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar Categoria"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default observer(AddCategory);