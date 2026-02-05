export interface ITotalItem {
  id: string
  name: string
  totalIncome: number
  totalExpense: number
  balance: number
}

export interface IPaginatedReport<T> {
  data: T[]
  totalIncome: number
  totalExpense: number
  totalBalance: number
  page: number
  pageSize: number
  totalRecords: number
}