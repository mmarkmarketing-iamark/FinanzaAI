
import { GoogleGenAI, Type } from "@google/genai";
import { FinancialData } from "../types";

// Corrected initialization using named parameter and removing fallback
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (data: FinancialData) => {
  // Switched to gemini-3-pro-preview for complex reasoning task and await generateContent directly
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analise as seguintes finanças e forneça 3 dicas práticas de economia e um resumo da saúde financeira. 
    Responda em Português do Brasil de forma amigável e profissional.
    
    Rendas: ${JSON.stringify(data.incomes.map(i => ({ desc: i.description, valor: i.amount, extra: i.isExtra })))}
    Despesas: ${JSON.stringify(data.expenses.map(e => ({ desc: e.description, valor: e.amount, cat: e.category, tipo: e.type })))}
    `,
    config: {
      temperature: 0.7,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          resumoSaude: { type: Type.STRING, description: "Um resumo geral da saúde financeira do usuário." },
          dicas: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista com 3 dicas personalizadas."
          },
          alertaGastos: { type: Type.STRING, description: "Um alerta se houver alguma categoria com gastos excessivos." }
        },
        required: ["resumoSaude", "dicas", "alertaGastos"]
      }
    }
  });

  // response.text is a property, handled gracefully if empty
  const text = response.text;
  if (!text) {
    throw new Error("No response from AI assistant.");
  }
  return JSON.parse(text);
};
