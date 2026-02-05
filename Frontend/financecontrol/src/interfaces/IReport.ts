export interface IPersonTotal {
  personId: string
  name: string
  totalIncome: number
  totalExpense: number
  balance: number
}

export interface IReport {
  totalsByPerson: IPersonTotal[]
  totalIncome: number
  totalExpense: number
  totalBalance: number 
  page: number
  pageSize: number
  totalRecords: number
}



export interface ICategoryTotal {
  categoryId: string
  name: string
  totalIncome: number
  totalExpense: number
  balance: number
}

export interface IReportPeopleQueryParams {
  peopleId?: string
  name?: string
  page?: number;
  pageSize?: number;
}

export interface IReportCategoryQueryParams {
  categoryId?: string
  name?: string
  page?: number;
  pageSize?: number;
}
