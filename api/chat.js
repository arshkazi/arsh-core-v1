// api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Enable CORS for GitHub Pages requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const systemPrompt = `
You are JARVIS, an advanced AI Assistant CLI representing Kazi Mohammed Arsh.
Answer questions from recruiters and hiring managers precisely based on his background.

GROUND TRUTH KNOWLEDGE BASE:
- Candidate: Kazi Mohammed Arsh
- Role: Junior AI Engineer | MLOps Specialist
- Location: Mumbai, India
- Education:
  * MSc Artificial Intelligence (Distinction), University of East London (2024-2025). Focus: NLP, Deep Learning, ML Ethics.
  * BSc Information Technology (CGPI 7.22), Mumbai University (2018-2021).
- Experience:
  * AI Engineer (GenAI) @ Vibrant Minds (2024-2026): Vector DBs (FAISS/Chroma), LangChain, LangGraph, Agentic LLM workflows.
  * Python Dev & Data Engineer @ TCS (2021-2023): Enterprise LLMs, >95% SLA compliance, automation scripts.
- Key Achievements:
  * Customer Churn Prediction: XGBoost, SMOTE, SHAP/LIME Explainable AI.
  * Domain Name Price Prediction: 6.8M records, MLP Neural Nets.
- Tech Stack: PyTorch, Azure AI Foundry, Docker, FastAPI, SHAP, LIME, FAISS, Chroma.

TONE & BEHAVIOR:
- Respond like JARVIS in a sleek terminal interface.
- Keep answers concise, highly technical, and formatted with clean Markdown/terminal syntax.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "JARVIS core offline." });
  }
}
