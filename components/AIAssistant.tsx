
import React, { useState } from 'react';
import { FinancialData } from '../types';
import { getFinancialAdvice } from '../services/geminiService';
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

interface Props {
  data: FinancialData;
}

interface Advice {
  resumoSaude: string;
  dicas: string[];
  alertaGastos: string;
}

const AIAssistant: React.FC<Props> = ({ data }) => {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getFinancialAdvice(data);
      setAdvice(res);
    } catch (err: any) {
      console.error(err);
      setError("Não foi possível carregar a análise da IA agora. Tente novamente em alguns instantes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="animate-pulse" />
              Assistente Finanza AI
            </h2>
            <p className="text-indigo-100 max-w-md">
              Deixe nossa inteligência artificial analisar seus gastos e sugerir as melhores estratégias de economia.
            </p>
          </div>
          <button
            onClick={fetchAdvice}
            disabled={loading}
            className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-2xl hover:bg-indigo-50 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            {advice ? 'Recalcular Análise' : 'Analisar Meus Gastos'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-20 text-center space-y-4">
          <div className="flex justify-center">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
          </div>
          <p className="text-slate-500 font-medium italic">Gemini está processando suas finanças...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-red-600 flex items-center gap-3">
          <AlertTriangle />
          <p>{error}</p>
        </div>
      )}

      {advice && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-indigo-600 font-bold uppercase text-xs tracking-widest">
              <CheckCircle2 size={16} />
              Diagnóstico de Saúde
            </div>
            <p className="text-slate-700 leading-relaxed text-lg">
              {advice.resumoSaude}
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-amber-600 font-bold uppercase text-xs tracking-widest">
              <AlertTriangle size={16} />
              Alerta de Gastos
            </div>
            <p className="text-slate-700 leading-relaxed italic border-l-4 border-amber-200 pl-4 bg-amber-50 py-2 rounded-r-lg">
              {advice.alertaGastos}
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-emerald-600 font-bold uppercase text-xs tracking-widest">
              <Lightbulb size={16} />
              Dicas de Economia Personalizadas
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advice.dicas.map((dica, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold mb-3 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{dica}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
