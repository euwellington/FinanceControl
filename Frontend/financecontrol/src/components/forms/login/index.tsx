import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import type { ILogin, ILoginRequest } from "@/interfaces/ILogin"
import { useAuth } from "@/hooks/auth.hook"
import { LoginValidation } from "@/validations/LoginValidation"
import RegisterPeople from "../dialog/firstaccess/register-people"
import { observer } from "mobx-react-lite"

const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const { authentication, loading, success } = useAuth();
  const [request, setRequest] = useState<ILoginRequest>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [progress, setProgress] = useState(0)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let interval: number; 
    if (loading) {
      setProgress(0);
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 95 ? 95 : prev + 5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading, success]);

  useEffect(() => {
    if (hasError) {
      const timer = setTimeout(() => setHasError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  const handleChange = (field: keyof ILoginRequest, value: string) => {
    setRequest(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const validationErrors = LoginValidation(request)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setHasError(true)
      return
    }

    try {
      await authentication(request as ILogin);
    } catch {
      setHasError(true);
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login com seu acesso</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Entre com o seu usuário e senha para acessar o painel
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" onChange={v => handleChange("email", v.target.value)} />
          {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
          </div>
          <Input id="password" type="password" onChange={v => handleChange("password", v.target.value)} />
          {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
        </Field>

        {loading && <Progress value={progress} className="h-2" />}

        <Field>
          <Button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full transition-colors duration-300 text-white",
              success ? "bg-green-600 hover:bg-green-700" :
                hasError ? "bg-red-600 hover:bg-red-700" :
                  "bg-[#2c2f6e]"
            )}
          >
            {loading ? "Autenticando..." : success ? "Sucesso!" : hasError ? "Erro ao entrar" : "Entrar"}
          </Button>
        </Field>
        <FieldSeparator>Ou</FieldSeparator>
        <RegisterPeople/>
      </FieldGroup>
    </form>
  )
}

export default observer(LoginForm);