import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Career, CareerRoadmap, SkillGap, ChatMessage, Recommendation } from "../types";

// Lazy initialization to ensure it uses the latest API key
const getAI = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateCareerInsight = async (profile: UserProfile, career: Career): Promise<string> => {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const prompt = `
    User Profile: ${JSON.stringify(profile)}
    Target Career: ${JSON.stringify(career)}

    Explain why this career is a good fit for the user based on their traits, interests, and skills.
    Crucially, incorporate their current career background (${profile.current_career}), what they have already learned (${profile.learned_skills}), and their core passions (${profile.passions}) into your reasoning.
    Highlight potential strengths they bring and any areas they might need to develop.
    Keep the tone motivational, professional, and human-like.
    Avoid generic advice. Be specific to the user's profile and the career's requirements.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: "You are an expert career coach at Pathora. Your goal is to provide deep, personalized insights into why a specific career path matches a user's unique psychological and skill profile.",
    }
  });

  return response.text || "Unable to generate insight at this time.";
};

export const generateRoadmap = async (profile: UserProfile, career: Career): Promise<CareerRoadmap> => {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const prompt = `
    User Profile: ${JSON.stringify(profile)}
    Target Career: ${JSON.stringify(career)}

    Generate a personalized career roadmap for this user to transition into this career.
    Take into account their current career (${profile.current_career}), their existing training (${profile.learned_skills}), and what they love doing (${profile.passions}).
    Include:
    1. A 3-step roadmap (Beginner, Intermediate, Advanced).
    2. A timeline for 3 months, 6 months, and 1 year milestones.
    3. Specific skills they need to learn (prioritize based on their current skills).
    4. Suggested projects to build a portfolio.
    5. Entry-level opportunities to look for.

    Return the response in valid JSON format matching the CareerRoadmap interface.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          careerId: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                skills_to_learn: { type: Type.ARRAY, items: { type: Type.STRING } },
                suggested_projects: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          timeline: {
            type: Type.OBJECT,
            properties: {
              three_months: { type: Type.STRING },
              six_months: { type: Type.STRING },
              one_year: { type: Type.STRING }
            }
          },
          entry_level_opportunities: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse roadmap JSON", e);
    throw new Error("Failed to generate roadmap");
  }
};

export const analyzeSkillGap = async (profile: UserProfile, career: Career): Promise<SkillGap[]> => {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const prompt = `
    User Skills: ${JSON.stringify(profile.skills)}
    Learned/Trained Skills: ${profile.learned_skills}
    Career Required Skills: ${JSON.stringify(career.required_skills)}

    Compare the user's current skills (both from assessment and their stated training) with the required skills for the career.
    Identify the missing skills and rank them by priority (High, Medium, Low).
    Provide a brief reason for each priority.

    Return the response in valid JSON format as an array of SkillGap objects.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            skill: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
            reason: { type: Type.STRING }
          }
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse skill gap JSON", e);
    return [];
  }
};

export const getCoachResponse = async (history: ChatMessage[], profile: UserProfile, recommendations: Recommendation[]): Promise<string> => {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const prompt = `
    User Profile: ${JSON.stringify(profile)}
    Current Recommendations: ${JSON.stringify(recommendations)}
    Chat History: ${JSON.stringify(history)}

    As the Pathora AI Career Coach, answer the user's latest message.
    Guide them through their career decisions, explain recommendations, or help them refine their goals.
    Be encouraging, insightful, and practical.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: "You are the Pathora AI Career Coach. You are friendly, knowledgeable, and deeply committed to helping users find their true calling. You use the user's assessment results and career recommendations to provide tailored advice.",
    }
  });

  return response.text || "I'm sorry, I'm having trouble connecting right now.";
};
