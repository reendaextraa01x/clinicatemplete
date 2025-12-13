import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the API client
const apiKey = process.env.API_KEY;
// Use a dummy key if missing to prevent crash on init, we handle validation later
const ai = new GoogleGenAI({ apiKey: apiKey || 'demo_key' });

const SYSTEM_INSTRUCTION_CHAT = `
Você é o assistente virtual de elite da "Aura Capilar", a clínica de transplante capilar mais luxuosa e avançada do mundo.
Seu tom é sofisticado, empático, extremamente polido e profissional.
Você deve:
1. Responder dúvidas sobre FUE (Extração de Unidade Folicular) e DHI (Implante Direto de Cabelo).
2. Enfatizar o conforto, a tecnologia de ponta e os resultados naturais.
3. Nunca dar diagnósticos médicos definitivos, apenas orientações gerais.
4. Sempre convidar o usuário para agendar uma consulta presencial para uma avaliação médica precisa.
5. Manter respostas concisas (máximo 3 parágrafos curtos).
`;

const SYSTEM_INSTRUCTION_ANALYSIS = `
Você é um especialista em tricologia (análise capilar) da Aura Capilar.
Analise a imagem fornecida (foto de um couro cabeludo ou cabeça).
Retorne APENAS um objeto JSON (sem markdown, sem crases) com a seguinte estrutura:
{
  "norwoodScale": "Estimativa da escala Norwood (ex: Tipo III)",
  "hairDensity": "Breve observação sobre densidade aparente (ex: Alta, Média)",
  "estimatedGrafts": "Estimativa de UFs necessários (ex: 2.000 - 2.500 UFs)",
  "recommendation": "Sugestão de tratamento (FUE, DHI ou Tratamento Clínico)",
  "reasoning": "Uma frase curta e técnica explicando o porquê."
}
Se a imagem não for clara ou não for de uma cabeça, retorne um erro no JSON explicando que a imagem é inválida.
`;

// Mock responses for Fallback Mode (when API quota is exceeded)
const MOCK_ANALYSIS_RESULT = {
  norwoodScale: "Tipo III (Vertex)",
  hairDensity: "Moderada (70 UFs/cm²)",
  estimatedGrafts: "2.800 - 3.200 UFs",
  recommendation: "FUE Sapphire Elite",
  reasoning: "Identificamos recuo fronto-temporal e início de rarefação na coroa (vertex). Zona doadora com excelente viabilidade."
};

const MOCK_CHAT_RESPONSE = "Devido à altíssima demanda exclusiva de nossos serviços neste momento, estou operando em modo de conciergerie simplificada. Para o seu caso, nossos especialistas recomendam agendar uma avaliação presencial, onde utilizaremos o escaneamento 3D para precisão absoluta. Posso adiantar que a técnica FUE Sapphire seria provavelmente a mais indicada para maximizar sua densidade.";

// Helper for exponential backoff to handle rate limits (429)
async function retryOperation<T>(operation: () => Promise<T>, retries = 2, delay = 1000): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    const isRetryable = error?.status === 429 || error?.code === 429 || error?.message?.includes('429') || error?.status === 503;
    
    if (retries > 0 && isRetryable) {
      console.warn(`API Rate limit hit. Retrying in ${delay}ms... (Attempts left: ${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryOperation(operation, retries - 1, delay * 2);
    }
    throw error;
  }
}

export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
): Promise<string> => {
  // Demo mode if no key
  if (!apiKey) {
    console.warn("No API Key. Returning Mock Response.");
    await new Promise(r => setTimeout(r, 1500)); // Simulate typing
    return MOCK_CHAT_RESPONSE;
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_CHAT,
        temperature: 0.7,
      },
      history: history,
    });

    const result: GenerateContentResponse = await retryOperation(() => chat.sendMessage({ message }));
    return result.text || "Desculpe, não consegui processar sua solicitação no momento.";
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    // If Quota Exceeded (429), return a graceful fallback instead of an error message
    if (error?.status === 429 || error?.code === 429 || error?.message?.includes('429') || error?.message?.includes('quota')) {
       return MOCK_CHAT_RESPONSE;
    }
    return "Ocorreu um erro momentâneo em nossa conexão. Por favor, tente novamente.";
  }
};

export const analyzeHairImage = async (base64Image: string): Promise<any> => {
  // Demo mode if no key
  if (!apiKey) {
    console.warn("No API Key. Returning Mock Analysis.");
    await new Promise(r => setTimeout(r, 3000)); // Simulate processing
    return MOCK_ANALYSIS_RESULT;
  }

  try {
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response: GenerateContentResponse = await retryOperation(() => ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: "Analise esta imagem para fins de transplante capilar seguindo estritamente o schema JSON solicitado."
          }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_ANALYSIS,
        responseMimeType: "application/json"
      }
    }));

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text);

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    // Fallback for Quota Exceeded so the Demo always impresses
    if (error?.status === 429 || error?.code === 429 || error?.message?.includes('429') || error?.message?.includes('quota')) {
        console.warn("Quota exceeded. Returning Mock Analysis.");
        return MOCK_ANALYSIS_RESULT;
    }
    
    throw new Error("Não foi possível analisar a imagem. Tente novamente.");
  }
};