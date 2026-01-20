
import React from 'react';
import { FinancialData, Expense, Income, ExpenseType } from '../types';
// Added missing Wallet import
import { Trash2, AlertCircle, Calendar, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

interface Props {
  data: FinancialData;
  onDeleteExpense: (id: string) => void;
  onDeleteIncome: (id: string) => void;
}

const Dashboard: React.FC<Props> = ({ data, onDeleteExpense, onDeleteIncome }) => {
  const totalIncome = data.incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = data.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpenses;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 text-sm font-medium">Saldo Atual</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Wallet size={20} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-slate-900' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs text-slate-400">
            <Calendar size={12} />
            <span>Referente ao mês atual</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 text-sm font-medium">Receitas</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
          <div className="mt-4 flex gap-2">
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded uppercase tracking-wider font-bold">Total Recebido</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 text-sm font-medium">Despesas</span>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <ArrowDownRight size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
          <div className="mt-4 flex gap-2">
             <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] rounded uppercase tracking-wider font-bold">Total Gastos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lista de Últimos Lançamentos */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Despesas Recentes</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {data.expenses.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <AlertCircle className="mx-auto mb-2 opacity-20" size={48} />
                <p>Nenhuma despesa cadastrada.</p>
              </div>
            ) : (
              data.expenses.map(expense => (
                <div key={expense.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                      {expense.category[0]}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{expense.description}</h4>
                      <div className="flex gap-2 items-center text-xs text-slate-500">
                        <span className="bg-slate-200 px-1.5 py-0.5 rounded uppercase text-[10px] font-bold">{expense.category}</span>
                        <span>•</span>
                        <span>{expense.type} {expense.type === ExpenseType.INSTALLMENTS && `(${expense.currentInstallment}/${expense.installments})`}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-red-500">-{formatCurrency(expense.amount)}</span>
                    <button 
                      onClick={() => onDeleteExpense(expense.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Lista de Receitas */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Receitas do Mês</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {data.incomes.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <AlertCircle className="mx-auto mb-2 opacity-20" size={48} />
                <p>Nenhuma receita cadastrada.</p>
              </div>
            ) : (
              data.incomes.map(income => (
                <div key={income.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div className="flex gap-4 items-center">
                    <div className={`w-10 h-10 rounded-full ${income.isExtra ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'} flex items-center justify-center text-sm font-bold`}>
                      $
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{income.description}</h4>
                      <div className="flex gap-2 items-center text-xs text-slate-500">
                        <span className={`${income.isExtra ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'} px-1.5 py-0.5 rounded uppercase text-[10px] font-bold`}>
                          {income.isExtra ? 'Extra' : 'Fixo'}
                        </span>
                        <span>•</span>
                        <span>{new Date(income.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-emerald-600">+{formatCurrency(income.amount)}</span>
                    <button 
                      onClick={() => onDeleteIncome(income.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
