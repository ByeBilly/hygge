import { GoogleGenAI, Type } from "@google/genai";
import { User } from '../types';

let ai: GoogleGenAI | null = null;

// Initialize with a dummy check, in a real app this would handle the key more securely
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} else {
    console.warn("Gemini API Key not found. AI features will be simulated.");
}

export const generateCozyIcebreaker = async (user1: User, user2: User): Promise<string> => {
    if (!ai) {
        return `I noticed we both like ${user1.interests.filter(i => user2.interests.includes(i))[0] || 'cozy vibes'}. What's your favorite way to unwind?`;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a single, short, warm, and cozy conversation starter (icebreaker) for two people who matched on a dating app called HYGGE.
            
            User 1 (Sender):
            Name: ${user1.name}
            Interests: ${user1.interests.join(', ')}
            Cozy Thing: ${user1.cozyThings.join(', ')}
            
            User 2 (Receiver):
            Name: ${user2.name}
            Interests: ${user2.interests.join(', ')}
            Cozy Thing: ${user2.cozyThings.join(', ')}
            
            The tone should be gentle, safe, and inviting. Keep it under 2 sentences.`,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Hi! Your profile feels so warm and welcoming. How is your day going?";
    }
};

export const generateDateIdea = async (user1: User, user2: User): Promise<{title: string, description: string}> => {
    if (!ai) {
        return {
            title: "Coffee & Books",
            description: "Visit a local independent bookstore and grab a warm latte afterwards."
        };
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Suggest a "Hygge" (cozy, safe, warm) date idea for these two people.

            User 1: ${JSON.stringify(user1)}
            User 2: ${JSON.stringify(user2)}
            
            Return JSON with "title" and "description".`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING }
                    }
                }
            }
        });
        
        return JSON.parse(response.text.trim());
    } catch (e) {
        console.error("Date idea generation failed", e);
        return {
            title: "A Walk in the Park",
            description: "Take a gentle stroll through the nearest park and watch the sunset."
        };
    }
}