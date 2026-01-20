
import React, { useState } from 'react';
import { Income } from '../types';

interface Props {
  onAdd: (income: Income) => void;
}

const IncomeForm: React.FC<Props> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isExtra, setIsExtra] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newIncome: Income = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      isExtra
    };

    onAdd(newIncome);
    setDescription('');
    setAmount('');
    setIsExtra(false);
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
          placeholder="Ex: Salário, Freelance..."
          className="w-full px-4 py-3 bg-white text-black rounded-xl border-2 border-black focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium"
          required
        />
      </div>

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
          className="w-full px-4 py-3 bg-white text-black rounded-xl border-2 border-black focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium"
          required
        />
      </div>

      <div className="flex items-center gap-3 py-2">
        <div className="relative flex items-center">
          <input
            id="isExtra"
            type="checkbox"
            checked={isExtra}
            onChange={(e) => setIsExtra(e.target.checked)}
            className="w-6 h-6 rounded border-2 border-black text-black focus:ring-emerald-500 cursor-pointer"
          />
        </div>
        <label htmlFor="isExtra" className="text-sm font-bold text-black select-none cursor-pointer">
          Esta é uma receita extra (não recorrente)
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md uppercase tracking-wider"
      >
        Adicionar Receita
      </button>
    </form>
  );
};

export default IncomeForm;
