
import React, { useState, useEffect, useMemo } from 'react';
import { Expense, Income, ExpenseType, Category, FinancialData, User } from './types';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import Charts from './components/Charts';
import AIAssistant from './components/AIAssistant';
import FloatingActionMenu from './components/FloatingActionMenu';
import Auth from './components/Auth';
import Subscription from './components/Subscription';
import { PlusCircle, Wallet, TrendingDown, PieChart as PieChartIcon, MessageSquareCode, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'entries' | 'charts' | 'ai'>('dashboard');

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('finanza_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedExpenses = localStorage.getItem('finanza_expenses');
    const savedIncomes = localStorage.getItem('finanza_incomes');
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedIncomes) setIncomes(JSON.parse(savedIncomes));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (user) localStorage.setItem('finanza_user', JSON.stringify(user));
    localStorage.setItem('finanza_expenses', JSON.stringify(expenses));
    localStorage.setItem('finanza_incomes', JSON.stringify(incomes));
  }, [expenses, incomes, user]);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  const addIncome = (income: Income) => {
    setIncomes(prev => [income, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const deleteIncome = (id: string) => {
    setIncomes(prev => prev.filter(i => i.id !== id));
  };

  const handleAuthSuccess = (u: User) => {
    setUser(u);
  };

  const handlePaymentComplete = () => {
    if (user) {
      const updatedUser = { ...user, isSubscribed: true };
      setUser(updatedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('finanza_user');
    setUser(null);
  };

  const financialData: FinancialData = useMemo(() => ({
    expenses,
    incomes,
    monthlyBudget: 0
  }), [expenses, incomes]);

  const navigateToExpense = () => {
    setActiveTab('entries');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigateToIncome = () => {
    setActiveTab('entries');
    setTimeout(() => {
      const incomeSection = document.getElementById('income-section');
      if (incomeSection) {
        incomeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Render Auth flow if no user
  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  // Render Subscription flow if not subscribed
  if (!user.isSubscribed) {
    return <Subscription onPaymentComplete={handlePaymentComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Wallet size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Finanza AI</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('entries')}
              className={`px-3 py-2 rounded-md transition-colors ${activeTab === 'entries' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Lançamentos
            </button>
            <button 
              onClick={() => setActiveTab('charts')}
              className={`px-3 py-2 rounded-md transition-colors ${activeTab === 'charts' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Gráficos
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-2 rounded-md transition-colors ${activeTab === 'ai' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Assistente IA
            </button>
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <LogOut size={18} />
              <span className="text-xs font-bold uppercase">Sair</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            data={financialData} 
            onDeleteExpense={deleteExpense} 
            onDeleteIncome={deleteIncome}
          />
        )}
        
        {activeTab === 'entries' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <section id="expense-section" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 scroll-mt-24">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingDown className="text-red-500" size={24} />
                  <h2 className="text-lg font-semibold">Nova Despesa</h2>
                </div>
                <ExpenseForm onAdd={addExpense} />
              </section>
            </div>
            <div className="space-y-8">
              <section id="income-section" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 scroll-mt-24">
                <div className="flex items-center gap-2 mb-6">
                  <PlusCircle className="text-emerald-500" size={24} />
                  <h2 className="text-lg font-semibold">Nova Receita</h2>
                </div>
                <IncomeForm onAdd={addIncome} />
              </section>
            </div>
          </div>
        )}

        {activeTab === 'charts' && (
          <Charts data={financialData} />
        )}

        {activeTab === 'ai' && (
          <AIAssistant data={financialData} />
        )}
      </main>

      <FloatingActionMenu 
        onAddExpense={navigateToExpense}
        onAddIncome={navigateToIncome}
      />

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3 px-2 z-50">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <Wallet size={20} />
          <span className="text-xs">Início</span>
        </button>
        <button onClick={() => setActiveTab('entries')} className={`flex flex-col items-center gap-1 ${activeTab === 'entries' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <PlusCircle size={20} />
          <span className="text-xs">Lançar</span>
        </button>
        <button onClick={() => setActiveTab('charts')} className={`flex flex-col items-center gap-1 ${activeTab === 'charts' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <PieChartIcon size={20} />
          <span className="text-xs">Gráficos</span>
        </button>
        <button onClick={() => setActiveTab('ai')} className={`flex flex-col items-center gap-1 ${activeTab === 'ai' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <MessageSquareCode size={20} />
          <span className="text-xs">IA</span>
        </button>
        <button onClick={logout} className="flex flex-col items-center gap-1 text-slate-400">
          <LogOut size={20} />
          <span className="text-xs">Sair</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
