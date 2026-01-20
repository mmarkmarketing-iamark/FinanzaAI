
import React, { useState } from 'react';
import { Plus, TrendingDown, PlusCircle, X } from 'lucide-react';

interface Props {
  onAddExpense: () => void;
  onAddIncome: () => void;
}

const FloatingActionMenu: React.FC<Props> = ({ onAddExpense, onAddIncome }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[60] flex flex-col items-end gap-3">
      {/* Menu Options */}
      {isOpen && (
        <div className="flex flex-col items-end gap-3 mb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <button
            onClick={() => handleAction(onAddIncome)}
            className="flex items-center gap-3 bg-white text-emerald-600 px-4 py-2 rounded-full shadow-lg border border-emerald-100 hover:bg-emerald-50 transition-all group"
          >
            <span className="text-sm font-semibold">Nova Receita</span>
            <div className="bg-emerald-500 text-white p-2 rounded-full group-hover:scale-110 transition-transform">
              <PlusCircle size={20} />
            </div>
          </button>
          
          <button
            onClick={() => handleAction(onAddExpense)}
            className="flex items-center gap-3 bg-white text-red-600 px-4 py-2 rounded-full shadow-lg border border-red-100 hover:bg-red-50 transition-all group"
          >
            <span className="text-sm font-semibold">Nova Despesa</span>
            <div className="bg-red-500 text-white p-2 rounded-full group-hover:scale-110 transition-transform">
              <TrendingDown size={20} />
            </div>
          </button>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={toggleMenu}
        className={`${
          isOpen ? 'bg-slate-800 rotate-0' : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white p-4 rounded-full shadow-xl shadow-indigo-200 transition-all duration-300 active:scale-90`}
      >
        {isOpen ? <X size={28} /> : <Plus size={28} />}
      </button>

      {/* Backdrop for mobile to close menu when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/5 z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionMenu;
