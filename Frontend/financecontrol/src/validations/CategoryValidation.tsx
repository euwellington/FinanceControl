import { minLength } from "@/utils/validator"
import type { ValidationRules } from "./rules"
import type { ICategoryRequest } from "@/interfaces/ICategory";

export const rules: ValidationRules<ICategoryRequest> = {
    description: {
        required: true,
        validate: (value) => {
            if (!minLength(value || "", 3)) return "A descrição deve ter pelo menos 3 caracteres";
        },
    },
    purpose: {
        required: true,
        validate: (value) => {
            if (value !== "Income" && value !== "Expense") {
                return "Selecione um tipo válido";
            }
        }
    }
}

export const CategoryValidation = (
    data: ICategoryRequest
): Partial<Record<keyof ICategoryRequest, string>> => {
    const errors: Partial<Record<keyof ICategoryRequest, string>> = {}
    const fields = Object.keys(rules) as Array<keyof ICategoryRequest>

    fields.forEach((field) => {
        const rule = rules[field]
        const value = data[field]

        if (rule?.required && (value === null || value === undefined || String(value).trim() === "")) {
            errors[field] = "Campo obrigatório"
            return
        }

        if (rule?.validate) {
            const validateFn = rule.validate as (v: unknown) => string | undefined
            const validationError = validateFn(value)
            if (validationError) {
                errors[field] = validationError
            }
        }
    })

    return errors
}