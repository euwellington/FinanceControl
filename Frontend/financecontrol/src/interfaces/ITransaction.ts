export interface ITransaction {
  id: string
  categoryId: string
  personId: string
  description: string
  peopleName: string
  peopleAge: number
  descriptionCategory: string
  typeCategory: "Income" | "Expense"
  amount: number
  type: "Income" | "Expense"
  typeString: string
  createdAt: string
  updatedAt: string | null
}

export interface ITransactionRequest extends Partial<ITransaction> { }

export interface ITransactionQueryParams {
  categoryId?: string
  personId?: string
  type?: "Income" | "Expense"
  startDate?: Date
  endDate?: Date
  page?: number;
  pageSize?: number;
}
