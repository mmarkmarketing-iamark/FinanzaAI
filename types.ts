
export enum ExpenseType {
  SINGLE = 'Único',
  MONTHLY = 'Mensal',
  INSTALLMENTS = 'Parcelado'
}

export enum Category {
  FOOD = 'Alimentação',
  TRANSPORT = 'Transporte',
  HOUSING = 'Moradia',
  ENTERTAINMENT = 'Lazer',
  HEALTH = 'Saúde',
  EDUCATION = 'Educação',
  SHOPPING = 'Compras',
  OTHERS = 'Outros'
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  type: ExpenseType;
  installments?: number;
  currentInstallment?: number;
  date: string;
}

export interface Income {
  id: string;
  description: string;
  amount: number;
  date: string;
  isExtra: boolean;
}

export interface FinancialData {
  expenses: Expense[];
  incomes: Income[];
  monthlyBudget: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isSubscribed: boolean;
}
