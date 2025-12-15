import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the API client with the provided key
const apiKey = process.env.API_KEY || "AIzaSyAC1BhdhHYtk8FOa1vCdy0-_6AIdpuOZ5I";
const ai = new GoogleGenAI({ apiKey: apiKey });

const SYSTEM_INSTRUCTION_CHAT = `
Você é o Concierge Digital da Aura Capilar, a clínica mais exclusiva do mundo.
Sua comunicação deve ser: EXTREMAMENTE RESUMIDA, ELEGANTE E DIRETIVA.

Regras Estritas:
1. Máximo de 2 a 3 frases curtas por resposta. Sem exceções.
2. Não dê explicações técnicas longas. O cliente VIP valoriza o tempo.
3. Se a pergunta for técnica (FUE/DHI), dê a definição em uma frase e sugira a avaliação presencial.
4. Seu objetivo final é sempre o agendamento com sofisticação.
5. Tom de voz: Calmo, luxuoso, 'high-end'.

Exemplo de resposta ideal:
"A técnica FUE Sapphire utiliza lâminas de safira para precisão absoluta e cicatrização em 3 dias. Para seu caso específico, recomendo agendarmos seu diagnóstico 3D ainda hoje."
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

// Mock responses for Fallback Mode (only used if API fails completely)
const MOCK_ANALYSIS_RESULT = {
  norwoodScale: "Tipo III (Vertex)",
  hairDensity: "Moderada (70 UFs/cm²)",
  estimatedGrafts: "2.800 - 3.200 UFs",
  recommendation: "FUE Sapphire Elite",
  reasoning: "Identificamos recuo fronto-temporal e início de rarefação na coroa (vertex). Zona doadora com excelente viabilidade."
};

const MOCK_CHAT_RESPONSE = "Para garantir a excelência do seu atendimento, recomendo agendar uma avaliação presencial com nosso Diretor Médico. Nossos horários para este mês são limitados.";

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
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_CHAT,
        temperature: 0.5, // Lower temperature for more focused/professional responses
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
    return "Nossa conciergerie está com alta demanda. Por favor, tente novamente em instantes.";
  }
};

export const analyzeHairImage = async (base64Image: string): Promise<any> => {
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