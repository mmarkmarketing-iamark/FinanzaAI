
import React, { useState } from 'react';
import { Check, CreditCard, QrCode, FileText, Sparkles, ShieldCheck, MegaphoneOff } from 'lucide-react';

interface Props {
  onPaymentComplete: () => void;
}

const Subscription: React.FC<Props> = ({ onPaymentComplete }) => {
  const [step, setStep] = useState<'plan' | 'payment'>('plan');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');

  const handleSubscribe = () => setStep('payment');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {step === 'plan' ? (
        <div className="max-w-4xl w-full animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black uppercase mb-4 tracking-tighter">Acesse o Poder Total</h2>
            <p className="text-slate-500 text-lg">Organização financeira profissional, sem distrações.</p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Plano Único PRO */}
            <div className="bg-white border-[3px] border-black p-8 md:p-10 rounded-3xl flex flex-col shadow-2xl relative overflow-hidden">
              <div className="absolute -top-0 -right-0 bg-indigo-600 text-white px-8 py-2 rotate-45 translate-x-6 translate-y-2 text-[10px] font-black uppercase tracking-widest shadow-lg">
                Premium
              </div>
              
              <span className="text-indigo-600 font-black uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                <Sparkles size={14} /> Assinatura Mensal
              </span>
              
              <div className="flex items-baseline gap-1 mb-8">
                <h3 className="text-5xl font-black text-black">R$ 9,90</h3>
                <span className="text-slate-400 font-bold">/mês</span>
              </div>

              <div className="space-y-5 mb-10 flex-grow">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-1 rounded-full mt-0.5">
                    <Check size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-black uppercase tracking-tight">Sem Propagandas</p>
                    <p className="text-xs text-slate-500 font-medium">Experiência limpa e focada nos seus números.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-1 rounded-full mt-0.5">
                    <Check size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-black uppercase tracking-tight">Lançamentos Ilimitados</p>
                    <p className="text-xs text-slate-500 font-medium">Controle todas as suas contas sem restrições.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-1 rounded-full mt-0.5">
                    <Check size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-black uppercase tracking-tight">Assistente IA (Gemini)</p>
                    <p className="text-xs text-slate-500 font-medium">Dicas personalizadas baseadas nos seus gastos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-1 rounded-full mt-0.5">
                    <Check size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-black uppercase tracking-tight">Gráficos de Performance</p>
                    <p className="text-xs text-slate-500 font-medium">Visualize sua evolução financeira em tempo real.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSubscribe}
                className="w-full bg-black text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm"
              >
                Começar Agora
              </button>
              
              <p className="text-center mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Cancele a qualquer momento
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white border-[3px] border-black p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight text-center">Checkout Seguro</h2>
            
            <div className="flex gap-2 mb-8">
              <button 
                onClick={() => setPaymentMethod('pix')}
                className={`flex-1 py-3 border-2 rounded-xl flex flex-col items-center gap-1 transition-all ${paymentMethod === 'pix' ? 'border-black bg-slate-50' : 'border-slate-100 grayscale opacity-50'}`}
              >
                <QrCode size={20} />
                <span className="text-[10px] font-black uppercase">PIX</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-3 border-2 rounded-xl flex flex-col items-center gap-1 transition-all ${paymentMethod === 'card' ? 'border-black bg-slate-50' : 'border-slate-100 grayscale opacity-50'}`}
              >
                <CreditCard size={20} />
                <span className="text-[10px] font-black uppercase">Cartão</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('boleto')}
                className={`flex-1 py-3 border-2 rounded-xl flex flex-col items-center gap-1 transition-all ${paymentMethod === 'boleto' ? 'border-black bg-slate-50' : 'border-slate-100 grayscale opacity-50'}`}
              >
                <FileText size={20} />
                <span className="text-[10px] font-black uppercase">Boleto</span>
              </button>
            </div>

            {paymentMethod === 'pix' && (
              <div className="text-center space-y-4 animate-in fade-in duration-300">
                <div className="bg-slate-100 aspect-square rounded-2xl flex items-center justify-center mx-auto w-48 border-2 border-black border-dashed">
                  <QrCode size={120} className="text-black" />
                </div>
                <p className="text-xs text-slate-500 font-medium px-4">Aponte a câmera do seu celular para pagar instantaneamente via PIX.</p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono break-all">
                  00020126360014BR.GOV.BCB.PIX01141234567890123452040000530398654049.905802BR5915FINANZA_AI6009SAO_PAULO62070503***6304D17A
                </div>
                <button 
                  onClick={onPaymentComplete}
                  className="w-full bg-emerald-500 text-white font-black py-4 rounded-xl hover:bg-emerald-600 transition-all shadow-lg mt-4"
                >
                  Confirmar Pagamento
                </button>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Número do Cartão</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border-2 border-black rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400">Expiração</label>
                    <input type="text" placeholder="MM/AA" className="w-full p-3 border-2 border-black rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400">CVC</label>
                    <input type="text" placeholder="123" className="w-full p-3 border-2 border-black rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Nome no Cartão</label>
                  <input type="text" placeholder="NOME IGUAL AO CARTÃO" className="w-full p-3 border-2 border-black rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button 
                  onClick={onPaymentComplete}
                  className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg mt-4"
                >
                  Finalizar Assinatura
                </button>
              </div>
            )}

            {paymentMethod === 'boleto' && (
              <div className="text-center space-y-4 animate-in fade-in duration-300">
                <div className="bg-slate-100 py-8 rounded-2xl flex flex-col items-center justify-center border-2 border-black border-dashed">
                  <FileText size={48} className="text-slate-400 mb-2" />
                  <span className="text-xs font-black uppercase">Gerar Boleto Bancário</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Vencimento em 3 dias úteis. A liberação ocorre após a compensação.</p>
                <button 
                  onClick={onPaymentComplete}
                  className="w-full bg-black text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg mt-4"
                >
                  Gerar e Baixar Boleto
                </button>
              </div>
            )}

            <button 
              onClick={() => setStep('plan')}
              className="w-full text-center mt-6 text-xs font-bold text-slate-400 hover:text-black transition-colors"
            >
              Voltar ao plano
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
