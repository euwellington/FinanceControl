"use client"

import * as React from "react"
import { observer } from "mobx-react-lite"
import { useContext, useState, useEffect } from "react"
import { StoresContext } from "@/stores/inject"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, UserRoundPenIcon, Loader2 } from "lucide-react"
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
import { usePeople } from "@/hooks/people.hook"
import { PeopleValidation } from "@/validations/PeopleValidation"
import type { IPeople } from "@/interfaces/IPeople"

const UpdatePeople = () => {
  const { update, loading } = usePeople() 
  const { peopleStore } = useContext(StoresContext)
  const [isOpen, setIsOpen] = useState(false)
  const [request, setRequest] = useState<Partial<IPeople>>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (isOpen && peopleStore.selected) {
      setRequest(peopleStore.selected) 
      setErrors({})
    }
  }, [isOpen, peopleStore.selected])

  const handleChange = (field: keyof IPeople, value: string) => {
    setRequest(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const validationErrors = PeopleValidation(request as any)

    console.log(Object.keys(validationErrors))
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const result = await update(request as IPeople, () => setIsOpen(false))
    if (result) {
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className=" h-10 w-10 px-2 text-sm ml-2 bg-[#2c2f6e] text-white hover:bg-[#3a3e8f] hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-none transition-colors gap-2"
        >
          <UserRoundPenIcon size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className={cn(
          "sm:max-w-md",
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
              Atualizar Pessoa
            </DialogTitle>
            <DialogDescription>
              Alterando os dados de <span className="font-bold">{peopleStore.selected?.name}</span>.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome completo"
                value={request.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-gray-50 dark:bg-slate-900"
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
            </Field>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <Field>
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    value={request.age || ""}
                    onChange={(e) => handleChange("age", e.target.value)}
                    className="bg-gray-50 dark:bg-slate-900"
                  />
                  {errors.age && <span className="text-xs text-red-500">{errors.age}</span>}
                </Field>
              </div>
              <div className="col-span-3">
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={request.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-gray-50 dark:bg-slate-900"
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </Field>
              </div>
               <div className="col-span-4">
                <Field>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={request.password || ""}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="bg-gray-50 dark:bg-slate-900"
                  />
                  {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
                </Field>
              </div>
            </div>
          </FieldGroup>

          <DialogFooter className="gap- sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={loading}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              className="bg-[#2c2f6e] ml-2 text-white hover:bg-[#3a3e8f] dark:bg-blue-600 dark:hover:bg-blue-700"
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

export default observer(UpdatePeople)