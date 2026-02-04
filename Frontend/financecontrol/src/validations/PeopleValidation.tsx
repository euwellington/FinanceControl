import { isEmail, minLength } from "@/utils/validator"
import type { ValidationRules } from "./rules"
import type { IPeopleRequest } from "@/interfaces/IPeople";

export const rules: ValidationRules<IPeopleRequest> = {
    name: {
        required: true,
        validate: (value) => {
            if (!minLength(value || "", 3)) return "Nome deve ter pelo menos 3 caracteres";
        },
    },
    age: {
        required: true,
        validate: (value) => {
            const ageNum = Number(value);
            if (isNaN(ageNum) || ageNum <= 0) return "Idade inválida";
        },
    },
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

export const PeopleValidation = (
    data: IPeopleRequest
): Partial<Record<keyof IPeopleRequest, string>> => {
    const errors: Partial<Record<keyof IPeopleRequest, string>> = {}
    const fields = Object.keys(rules) as Array<keyof IPeopleRequest>

    fields.forEach((field) => {
        const rule = rules[field]
        const value = data[field]

        if (rule?.required && (value === null || value === undefined || value === "")) {
            errors[field] = "Campo obrigatório"
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