
import React, { useState } from 'react';
import { Category, ExpenseType, Expense } from '../types';

interface Props {
  onAdd: (expense: Expense) => void;
}

const ExpenseForm: React.FC<Props> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(Category.FOOD);
  const [type, setType] = useState(ExpenseType.SINGLE);
  const [installments, setInstallments] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      category,
      type,
      installments: type === ExpenseType.INSTALLMENTS ? parseInt(installments) : undefined,
      currentInstallment: type === ExpenseType.INSTALLMENTS ? 1 : undefined,
      date: new Date().toISOString()
    };

    onAdd(newExpense);
    setDescription('');
    setAmount('');
    setInstallments('1');
    setType(ExpenseType.SINGLE);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white">
      <div>
        <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
          Descrição
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Supermercado"
          className="w-full px-4 py-3 bg-white text-black rounded-xl border-2 border-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Valor (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0,00"
            className="w-full px-4 py-3 bg-white text-black rounded-xl border-2 border-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Categoria
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-4 py-3 bg-white text-black rounded-xl border-2 border-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium appearance-none"
          >
            {Object.values(Category).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Tipo de Pagamento
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ExpenseType)}
            className="w-full px-4 py-3 bg-white text-black rounded-xl border-2 border-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium appearance-none"
          >
            {Object.values(ExpenseType).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        {type === ExpenseType.INSTALLMENTS && (
          <div className="animate-in slide-in-from-left-2 duration-200">
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Qtd. Parcelas
            </label>
            <input
              type="number"
              min="2"
              value={installments}
              onChange={(e) => setInstallments(e.target.value)}
              className="w-full px-4 py-3 bg-white text-black rounded-xl border-2 border-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md uppercase tracking-wider mt-2"
      >
        Adicionar Despesa
      </button>
    </form>
  );
};

export default ExpenseForm;
