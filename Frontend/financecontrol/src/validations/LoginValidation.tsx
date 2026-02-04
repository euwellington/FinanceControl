import type { ILoginRequest } from "@/interfaces/ILogin"
import { isEmail, minLength } from "@/utils/validator"
import type { ValidationRules } from "./rules"

export const rules: ValidationRules<ILoginRequest> = {
    email: {
        required: true,
        validate: (value) => {
            if (!isEmail(value || "")) return "Email inválido";
        },
    },
    password: {
        required: true,
        validate: (value) => {
            if (!minLength(value || "", 6)) return "A senha deve ter ao menos 6 caracteres";
        },
    }

}

export const LoginValidation = (
    data: ILoginRequest
): Partial<Record<keyof ILoginRequest, string>> => {
    const errors: Partial<Record<keyof ILoginRequest, string>> = {}
    const fields = Object.keys(rules) as Array<keyof ILoginRequest>

    fields.forEach((field) => {
        const rule = rules[field]
        const value = data[field]

        if (rule?.required && (value === null || value === undefined || value === "")) {
            errors[field] = `${field} é obrigatório.`
            return
        }

        if (rule?.validate) {
            const validateFn = rule.validate as (v: unknown) => string | undefined
            const validationError = validateFn(value)
            if (validationError) errors[field] = validationError
        }
    })

    return errors
}
