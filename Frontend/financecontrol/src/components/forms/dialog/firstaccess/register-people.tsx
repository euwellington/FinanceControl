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
import { useState } from "react";
import { UserRoundPlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IPeople } from "@/interfaces/IPeople";
import { usePeople } from "@/hooks/people.hook";
import { PeopleValidation } from "@/validations/PeopleValidation";

const RegisterPeople = () => {
  const { firstRegister, loading } = usePeople();
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState<Partial<IPeople>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpen = () => {
    setRequest({});
    setErrors({});
    setIsOpen(true);
  };

  const handleChange = (field: keyof IPeople, value: string) => {
    setRequest(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); 

    const validationErrors = PeopleValidation(request as any);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await firstRegister(request as IPeople);
    if (result) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Field>
          <Button variant="outline" type="button" className="w-full" onClick={handleOpen}>
            <UserRoundPlus className="mr-2 h-4 w-4" />
            Criar uma conta
          </Button>
        </Field>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()} // Opcional: evita fechar ao clicar fora se quiser rigor
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
            <DialogTitle>Criar conta</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para criar sua conta no sistema.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={request.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
            </Field>

            <Field>
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                type="number"
                placeholder="Sua idade"
                value={request.age || ""}
                onChange={(e) => handleChange("age", e.target.value)}
              />
              {errors.age && <span className="text-xs text-red-500">{errors.age}</span>}
            </Field>

            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                value={request.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </Field>

            <Field>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={request.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={loading}>Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#2c2f6e] text-white" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default observer(RegisterPeople);