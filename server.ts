import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { careers } from "./src/data/careers";
import { questions } from "./src/data/questions";
import { UserProfile, Recommendation } from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/assessment/start", (req, res) => {
    res.json({ questions });
  });

  app.post("/api/assessment/submit", (req, res) => {
    const { answers, preAssessmentData } = req.body;
    
    // Simple profiling logic
    const profile: UserProfile = {
      ...preAssessmentData,
      interests: [],
      personality_traits: [],
      skills: [],
      preferences: []
    };

    answers.forEach((answer: any) => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        const option = question.options.find(o => o.value === answer.value);
        if (option) {
          if (question.category === 'interests') profile.interests.push(...option.traits);
          if (question.category === 'personality') profile.personality_traits.push(...option.traits);
          if (question.category === 'skills') profile.skills.push(...option.traits);
          if (question.category === 'preferences') profile.preferences.push(...option.traits);
        }
      }
    });

    res.json({ profile });
  });

  app.post("/api/recommendations", (req, res) => {
    const { profile } = req.body;
    
    const recommendations: Recommendation[] = careers.map((career) => {
      let score = 0;
      let maxPossibleScore = 0;

      // Define weights for different categories
      const weights = {
        personality: 1.5,
        skills: 1.2,
        interests: 1.0,
        preferences: 0.8
      };

      // Calculate positive matches with weights
      profile.personality_traits.forEach((trait: string) => {
        maxPossibleScore += weights.personality;
        if (career.tags.includes(trait)) score += weights.personality;
      });

      profile.skills.forEach((trait: string) => {
        maxPossibleScore += weights.skills;
        if (career.tags.includes(trait)) score += weights.skills;
      });

      profile.interests.forEach((trait: string) => {
        maxPossibleScore += weights.interests;
        if (career.tags.includes(trait)) score += weights.interests;
      });

      profile.preferences.forEach((trait: string) => {
        maxPossibleScore += weights.preferences;
        if (career.tags.includes(trait)) score += weights.preferences;
      });

      // Handle negative matches (conflicts)
      if (career.negative_tags) {
        const userTraits = [
          ...profile.personality_traits,
          ...profile.skills,
          ...profile.interests,
          ...profile.preferences
        ];

        career.negative_tags.forEach((negTag) => {
          if (userTraits.includes(negTag)) {
            // Subtract a significant penalty for conflicting traits
            score -= 2.0; 
          }
        });
      }

      // Normalize score to 0-100 range
      const finalScore = Math.max(0, Math.min(100, (score / (maxPossibleScore || 1)) * 100));
      
      return {
        career,
        score: finalScore,
        insight: "" 
      };
    });

    // Sort and take top 5
    const topMatches = recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    res.json({ recommendations: topMatches });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
