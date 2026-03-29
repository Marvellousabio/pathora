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
    
    // Matching Algorithm
    const userTraits = [
      ...profile.interests,
      ...profile.personality_traits,
      ...profile.skills,
      ...profile.preferences
    ];

    const recommendations: Recommendation[] = careers.map((career) => {
      const matchCount = career.tags.filter(tag => userTraits.includes(tag)).length;
      const score = (matchCount / career.tags.length) * 100;
      
      return {
        career,
        score,
        insight: "" // Insights are now generated on the frontend
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
