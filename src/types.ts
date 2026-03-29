export enum Category {
  INTERESTS = 'interests',
  PERSONALITY = 'personality',
  SKILLS = 'skills',
  PREFERENCES = 'preferences'
}

export interface Question {
  id: string;
  text: string;
  category: Category;
  options: {
    label: string;
    value: string;
    traits: string[]; // Tags that this answer contributes to
  }[];
}

export interface UserProfile {
  current_career?: string;
  learned_skills?: string;
  passions?: string;
  interests: string[];
  personality_traits: string[];
  skills: string[];
  preferences: string[];
}

export interface Career {
  id: string;
  name: string;
  description: string;
  required_skills: string[];
  tags: string[]; // Used for matching with user traits
  negative_tags?: string[]; // Traits that conflict with this career
  growth_outlook: 'Low' | 'Medium' | 'High';
}

export interface Recommendation {
  career: Career;
  score: number;
  insight: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  skills_to_learn: string[];
  suggested_projects: string[];
}

export interface CareerRoadmap {
  careerId: string;
  steps: RoadmapStep[];
  timeline: {
    three_months: string;
    six_months: string;
    one_year: string;
  };
  entry_level_opportunities: string[];
}

export interface SkillGap {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
