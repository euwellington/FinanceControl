export interface ICategory {
    id: string
    description: string
    purpose: "Income" | "Expense"
    createdAt: Date
    updatedAt: Date | null
}

export interface ICategoryRequest extends Partial<ICategory> { }

export interface ICategoryQueryParams {
    description?: string;
    purpose?: "Income" | "Expense";
    page?: number;
    pageSize?: number;
}