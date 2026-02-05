import { minLength } from "@/utils/validator"
import type { ValidationRules } from "./rules"
import type { ITransactionRequest } from "@/interfaces/ITransaction";
import type { IPeople } from "@/interfaces/IPeople";
import type { ICategory } from "@/interfaces/ICategory";

export const rules: ValidationRules<ITransactionRequest> = {
    categoryId: {
        required: true,
        validate: (value) => {
            if (!value || value === "") return "Selecione uma categoria";
        },
    },
    personId: {
        required: true,
        validate: (value) => {
            if (!value || value === "") return "Selecione uma pessoa";
        },
    },
    description: {
        required: true,
        validate: (value) => {
            if (!minLength(value || "", 3)) return "A descrição deve ter pelo menos 3 caracteres";
            if (value && value.length > 400) return "A descrição deve ter no máximo 400 caracteres";
        },
    },
    amount: {
        required: true,
        validate: (value) => {
            const val = Number(value);
            if (isNaN(val) || val <= 0) return "O valor deve ser um número positivo";
        },
    },
    type: {
        required: true,
        validate: (value) => {
            if (value !== "Income" && value !== "Expense") return "Tipo inválido";
        },
    }
}

export const TransactionValidation = (
    data: ITransactionRequest,
    selectedPerson?: IPeople | null,
    selectedCategory?: ICategory | null
): Partial<Record<keyof ITransactionRequest, string>> => {
    const errors: Partial<Record<keyof ITransactionRequest, string>> = {}
    const fields = Object.keys(rules) as Array<keyof ITransactionRequest>

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

    if (selectedPerson && Number(selectedPerson.age) < 18) {
        if (data.type === "Income") {
            errors.type = "Menores de idade só podem registrar despesas";
        }
    }

    if (selectedCategory && data.type) {
        if (selectedCategory.purpose !== data.type) {
            errors.categoryId = "A categoria selecionada é incompatível com o tipo de transação";
        }
    }

    return errors
}