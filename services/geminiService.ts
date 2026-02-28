
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGameTip = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Ge ett kort, roligt och engagerande speltips för plattformsspelet 'Shadow Paw: Neon Mission'. Fokusera på att katten försöker fånga bytet. Max 15 ord. Svara på svenska.",
      config: {
        systemInstruction: "Du är en spelguide för barn i en neon-värld där en katt är hjälten.",
      },
    });
    return response.text.trim() || "Använd neon-hoppet för att nå högre!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Håll utkik efter vakthundarna!";
  }
};

export const getJerryTaunt = async (score: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Katten förlorade i 'Shadow Paw' med poängen ${score}. Skriv ett kort hån från bytet till katten. Var lekfull men snäll. Max 15 ord. Svara på svenska.`,
    });
    return response.text.trim() || "Bättre lycka nästa gång, katten!";
  } catch (error) {
    return "Du hann inte ifatt mig!";
  }
};