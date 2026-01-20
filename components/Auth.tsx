
import React, { useState } from 'react';
import { User } from '../types';
import { Wallet, ShieldCheck, Sparkles, BarChart3 } from 'lucide-react';

interface Props {
  onAuthSuccess: (user: User) => void;
}

const Auth: React.FC<Props> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de autenticação
    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      name: name || 'Usuário',
      isSubscribed: false
    };
    onAuthSuccess(mockUser);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Lado Esquerdo - Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Wallet size={32} />
            </div>
            <h1 className="text-3xl font-bold italic">Finanza AI</h1>
          </div>
          <h2 className="text-5xl font-extrabold leading-tight mb-8">
            Domine seu dinheiro com <span className="text-indigo-400 underline">Inteligência Artificial.</span>
          </h2>
          <div className="space-y-6 text-lg text-slate-300">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-full"><Sparkles className="text-indigo-400" /></div>
              <span>Análise preditiva de gastos via Gemini</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-full"><BarChart3 className="text-emerald-400" /></div>
              <span>Gráficos interativos e detalhados</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-full"><ShieldCheck className="text-blue-400" /></div>
              <span>Segurança total dos seus dados</span>
            </div>
          </div>
        </div>
        <div className="text-slate-500 text-sm">
          © 2025 Finanza AI. Todos os direitos reservados.
        </div>
      </div>

      {/* Lado Direito - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="max-w-md w-full">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Wallet size={24} />
            </div>
            <h1 className="text-xl font-bold text-black">Finanza AI</h1>
          </div>

          <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h2>
          <p className="text-slate-500 mb-8 font-medium">
            {isLogin ? 'Insira seus dados para acessar o painel.' : 'Comece hoje sua jornada para a liberdade financeira.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-black text-black uppercase mb-1 tracking-widest">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                  placeholder="Seu nome"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-black text-black uppercase mb-1 tracking-widest">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-black uppercase mb-1 tracking-widest">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-black py-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg uppercase tracking-widest mt-6"
            >
              {isLogin ? 'Entrar Agora' : 'Cadastrar Conta'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-black hover:underline"
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre aqui'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
