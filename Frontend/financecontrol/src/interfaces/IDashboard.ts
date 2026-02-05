export interface ITransactionHistory {
  transactionDate: string;
  amount: number;
  type: "Income" | "Expense";
  description: string;
}

export interface IDashboardStats {
  totalCategories: number;
  totalPeople: number;
  totalTransactions: number;
  revenue: number;
  expenses: number;
  netBalance: number;
  avgAgeOfTransactingPeople: number;
  isPositiveBalance: boolean;
  history: ITransactionHistory[];
}