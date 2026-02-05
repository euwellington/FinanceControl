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
import { useState, useContext, useEffect } from "react";
import { Loader2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoresContext } from "@/stores/inject";
import { useTransaction } from "@/hooks/transaction.hook";
import { TransactionValidation } from "@/validations/TransactionValidation";
import type { ITransaction, ITransactionRequest } from "@/interfaces/ITransaction";
import { Badge } from "@/components/ui/badge";
import { toJS } from "mobx";

const UpdateTransaction = () => {
  const { transactionStore, categoryStore, peopleStore } = useContext(StoresContext);
  const { update, loading } = useTransaction();
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState<Partial<ITransactionRequest>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen && transactionStore.selected) {
      const selected = toJS(transactionStore.selected);
      setRequest({
        id: selected.id,
        description: selected.description,
        amount: selected.amount,
        type: selected.type,
        personId: selected.personId,
        categoryId: selected.categoryId
      });
      categoryStore.getAll({ page: 1, pageSize: 999 });
      peopleStore.getAll({ page: 1, pageSize: 999 });
    }
  }, [isOpen, transactionStore.selected, categoryStore, peopleStore]);

  const handleChange = (field: keyof ITransactionRequest, value: any) => {
    setRequest(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = TransactionValidation(request);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await update(request as ITransaction, () => setIsOpen(false));
  };

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

      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
        )}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
            <DialogDescription>Atualize os dados da transação selecionada.</DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-4">
            <Field>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={request.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              {errors.description && (
                <span className="text-xs text-red-500 font-medium">{errors.description}</span>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={request.amount || ""}
                  onChange={(e) => handleChange("amount", Number(e.target.value))}
                />
                {errors.amount && (
                  <span className="text-xs text-red-500 font-medium">{errors.amount}</span>
                )}
              </Field>

              <Field>
                <Label htmlFor="type">Tipo</Label>
                <Select
                  value={request.type}
                  onValueChange={(value) => handleChange("type", value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Income">Receita</SelectItem>
                    <SelectItem value="Expense">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <Label htmlFor="personId">Pessoa</Label>
              <Select
                value={request.personId}
                onValueChange={(value) => handleChange("personId", value)}
              >
                <SelectTrigger id="personId">
                  <SelectValue placeholder="Quem realizou?" />
                </SelectTrigger>
                <SelectContent>
                  {peopleStore.people?.data.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      <div className="flex items-center gap-2">
                        {person.name}
                        <span className="text-[10px] text-muted-foreground">({person.age} anos)</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.personId && (
                <span className="text-xs text-red-500 font-medium">{errors.personId}</span>
              )}
            </Field>

            <Field>
              <Label htmlFor="categoryId">Categoria</Label>
              <Select
                value={request.categoryId}
                onValueChange={(value) => handleChange("categoryId", value)}
              >
                <SelectTrigger id="categoryId">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categoryStore.categories?.data.map((cat) => {
                    const isIncome = cat.purpose === "Income";
                    return (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center justify-between w-full gap-4">
                          <span>{cat.description}</span>
                          <Badge
                            className={cn(
                              "text-[10px] px-1.5 h-4 font-semibold shadow-none border-none",
                              isIncome
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                                : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                            )}
                          >
                            {isIncome ? "Receita" : "Despesa"}
                          </Badge>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <span className="text-xs text-red-500 font-medium">{errors.categoryId}</span>
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
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default observer(UpdateTransaction);