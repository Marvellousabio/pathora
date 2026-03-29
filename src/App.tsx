import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Target, 
  Map, 
  MessageSquare, 
  BrainCircuit, 
  ArrowRight,
  Loader2,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Send
} from 'lucide-react';
import { Question, UserProfile, Recommendation, CareerRoadmap, SkillGap, ChatMessage } from './types';

import { generateCareerInsight, generateRoadmap, analyzeSkillGap, getCoachResponse } from './services/ai';

export default function App() {
  const [step, setStep] = useState<'landing' | 'pre-assessment' | 'assessment' | 'results' | 'roadmap' | 'chat'>('landing');
  const [preAssessmentData, setPreAssessmentData] = useState({
    current_career: '',
    learned_skills: '',
    passions: ''
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; value: string }[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGap[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 'assessment' && questions.length === 0) {
      fetch('/api/assessment/start')
        .then(res => {
          if (!res.ok) throw new Error('Failed to load assessment');
          return res.json();
        })
        .then(data => setQuestions(data.questions))
        .catch(err => console.error(err));
    }
  }, [step]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === questions[currentQuestionIndex].id);
    if (existingIndex > -1) {
      newAnswers[existingIndex].value = value;
    } else {
      newAnswers.push({ questionId: questions[currentQuestionIndex].id, value });
    }
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (finalAnswers: { questionId: string; value: string }[]) => {
    setLoading(true);
    try {
      const profileRes = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers, preAssessmentData })
      });
      if (!profileRes.ok) throw new Error('Failed to submit assessment');
      const profileData = await profileRes.json();
      setProfile(profileData.profile);

      const recRes = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profileData.profile })
      });
      if (!recRes.ok) throw new Error('Failed to get recommendations');
      const recData = await recRes.json();
      
      // Generate AI insights on the frontend
      const recsWithInsights = await Promise.all(recData.recommendations.map(async (rec: Recommendation, index: number) => {
        if (index < 3) {
          try {
            const insight = await generateCareerInsight(profileData.profile, rec.career);
            return { ...rec, insight };
          } catch (e) {
            console.error("Insight generation failed", e);
            return rec;
          }
        }
        return rec;
      }));

      setRecommendations(recsWithInsights);
      setStep('results');
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const viewRoadmap = async (rec: Recommendation) => {
    setSelectedRecommendation(rec);
    setLoading(true);
    try {
      if (!profile) return;
      
      // Perform AI operations on the frontend
      const [roadmapData, skillGapData] = await Promise.all([
        generateRoadmap(profile, rec.career),
        analyzeSkillGap(profile, rec.career)
      ]);
      
      setRoadmap(roadmapData);
      setSkillGap(skillGapData);
      setStep('roadmap');
    } catch (error) {
      console.error(error);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || !profile) return;
    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setLoading(true);

    try {
      const response = await getCoachResponse([...chatHistory, userMsg], profile, recommendations);
      setChatHistory(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'model', text: "I'm sorry, I'm having trouble thinking right now. Could you repeat that?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#F27D26] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep('landing')}>
          <div className="bg-[#F27D26] p-1.5 rounded-lg">
            <Compass className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Pathora</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-500">
          <button onClick={() => setStep('landing')} className="hover:text-[#F27D26] transition-colors">Home</button>
          {profile && <button onClick={() => setStep('results')} className="hover:text-[#F27D26] transition-colors">Recommendations</button>}
          {profile && <button onClick={() => setStep('chat')} className="hover:text-[#F27D26] transition-colors">Career Coach</button>}
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center py-20"
            >
              <span className="px-4 py-1.5 bg-[#F27D26]/10 text-[#F27D26] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                AI-Powered Career Intelligence
              </span>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 max-w-4xl">
                NAVIGATE YOUR <br />
                <span className="text-[#F27D26]">IDEAL FUTURE.</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed">
                Pathora uses advanced psychological assessment and AI reasoning to map your unique traits to high-growth career paths. Stop guessing, start growing.
              </p>
              <button 
                onClick={() => setStep('pre-assessment')}
                className="group relative bg-[#1A1A1A] text-white px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-[#F27D26] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Begin Assessment <ArrowRight className="w-5 h-5" />
                </span>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full">
                {[
                  { icon: BrainCircuit, title: "Psychological Depth", desc: "Our engine analyzes behavioral patterns, not just interests." },
                  { icon: Target, title: "Precision Matching", desc: "Proprietary algorithm scores 200+ career vectors against your profile." },
                  { icon: Map, title: "Actionable Roadmaps", desc: "Step-by-step guides from where you are to where you want to be." }
                ].map((feature, i) => (
                  <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl text-left hover:shadow-xl hover:shadow-gray-100 transition-all">
                    <feature.icon className="w-10 h-10 text-[#F27D26] mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'pre-assessment' && (
            <motion.div 
              key="pre-assessment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto py-12"
            >
              <div className="mb-12">
                <span className="text-[#F27D26] font-bold text-sm uppercase tracking-widest">Step 1: Context</span>
                <h2 className="text-4xl font-black tracking-tight mt-2">Tell us about yourself</h2>
                <p className="text-gray-500 mt-2">This helps us personalize your career journey from the very start.</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">What is your current career or field of study?</label>
                  <input 
                    type="text"
                    value={preAssessmentData.current_career}
                    onChange={(e) => setPreAssessmentData(prev => ({ ...prev, current_career: e.target.value }))}
                    placeholder="e.g. Marketing Student, Junior Developer, Accountant..."
                    className="w-full bg-white border-2 border-gray-100 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#F27D26] transition-all text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">What have you learned or been trained in?</label>
                  <textarea 
                    value={preAssessmentData.learned_skills}
                    onChange={(e) => setPreAssessmentData(prev => ({ ...prev, learned_skills: e.target.value }))}
                    placeholder="e.g. Python, Graphic Design, Project Management, Financial Analysis..."
                    className="w-full bg-white border-2 border-gray-100 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#F27D26] transition-all text-lg min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">What do you love doing? (Your passions)</label>
                  <textarea 
                    value={preAssessmentData.passions}
                    onChange={(e) => setPreAssessmentData(prev => ({ ...prev, passions: e.target.value }))}
                    placeholder="e.g. Solving complex problems, helping people, creating art, organizing events..."
                    className="w-full bg-white border-2 border-gray-100 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#F27D26] transition-all text-lg min-h-[120px]"
                  />
                </div>

                <button 
                  onClick={() => setStep('assessment')}
                  disabled={!preAssessmentData.current_career || !preAssessmentData.learned_skills || !preAssessmentData.passions}
                  className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#F27D26] transition-colors disabled:opacity-50 disabled:hover:bg-[#1A1A1A] flex items-center justify-center gap-2"
                >
                  Continue to Assessment <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'assessment' && (
            <motion.div 
              key="assessment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto py-12"
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-[#F27D26] animate-spin mb-4" />
                  <h2 className="text-2xl font-bold">Analyzing your profile...</h2>
                  <p className="text-gray-500">Our AI is matching your traits to thousands of career data points.</p>
                </div>
              ) : questions.length > 0 ? (
                <div>
                  <div className="flex justify-between items-end mb-12">
                    <div>
                      <span className="text-[#F27D26] font-bold text-sm uppercase tracking-widest">Question {currentQuestionIndex + 1} of {questions.length}</span>
                      <h2 className="text-3xl font-bold mt-2">{questions[currentQuestionIndex].text}</h2>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {questions[currentQuestionIndex].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(option.value)}
                        className="group flex items-center justify-between p-6 bg-white border-2 border-gray-100 rounded-2xl text-left hover:border-[#F27D26] hover:bg-[#F27D26]/5 transition-all"
                      >
                        <span className="text-lg font-medium group-hover:text-[#F27D26] transition-colors">{option.label}</span>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#F27D26] transition-all group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>

                  <div className="mt-12 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-[#F27D26] h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                  <h2 className="text-4xl font-black tracking-tight">YOUR CAREER MATCHES</h2>
                  <p className="text-gray-500">Based on your unique psychological and skill profile.</p>
                </div>
                <button 
                  onClick={() => setStep('chat')}
                  className="flex items-center gap-2 bg-[#F27D26] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[#F27D26]/20 transition-all"
                >
                  <MessageSquare className="w-5 h-5" /> Talk to AI Coach
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {recommendations.map((rec, i) => (
                    <motion.div 
                      key={rec.career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold">{rec.career.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              rec.career.growth_outlook === 'High' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {rec.career.growth_outlook} Growth
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed">{rec.career.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-[#F27D26]">{Math.round(rec.score)}%</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Match Score</div>
                        </div>
                      </div>

                      {rec.insight && (
                        <div className="bg-[#FDFCFB] border border-gray-50 rounded-2xl p-6 mb-8 italic text-gray-600 text-sm leading-relaxed relative">
                          <Sparkles className="absolute -top-3 -left-3 w-6 h-6 text-[#F27D26] bg-white p-1 rounded-full border border-gray-100" />
                          "{rec.insight}"
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-8">
                        {rec.career.required_skills.map((skill, j) => (
                          <span key={j} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-medium border border-gray-100">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => viewRoadmap(rec)}
                        className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold hover:bg-[#F27D26] transition-colors"
                      >
                        Generate Career Roadmap <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-8">
                  <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 sticky top-28">
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <BrainCircuit className="w-6 h-6 text-[#F27D26]" /> Profile Analysis
                    </h4>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Top Traits</span>
                        <div className="flex flex-wrap gap-2">
                          {profile?.personality_traits.slice(0, 5).map((trait, i) => (
                            <span key={i} className="px-2 py-1 bg-white/10 rounded-md text-xs">{trait}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Core Interests</span>
                        <div className="flex flex-wrap gap-2">
                          {profile?.interests.slice(0, 5).map((interest, i) => (
                            <span key={i} className="px-2 py-1 bg-white/10 rounded-md text-xs">{interest}</span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-6 border-t border-white/10">
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Our AI has identified that you thrive in environments that value <strong>{profile?.personality_traits[0]}</strong> and <strong>{profile?.personality_traits[1]}</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'roadmap' && roadmap && (
            <motion.div 
              key="roadmap"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <button 
                onClick={() => setStep('results')}
                className="flex items-center gap-2 text-gray-400 hover:text-[#F27D26] transition-colors mb-8 font-bold text-sm uppercase tracking-widest"
              >
                <ChevronLeft className="w-5 h-5" /> Back to matches
              </button>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                  <span className="text-[#F27D26] font-bold text-sm uppercase tracking-widest">Personalized Roadmap</span>
                  <h2 className="text-5xl font-black tracking-tighter mt-2">{selectedRecommendation?.career.name}</h2>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center min-w-[100px]">
                    <div className="text-2xl font-black text-[#F27D26]">12</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Months Plan</div>
                  </div>
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center min-w-[100px]">
                    <div className="text-2xl font-black text-[#F27D26]">{roadmap.steps.length}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Key Phases</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  {roadmap.steps.map((step, i) => (
                    <div key={i} className="relative pl-12 border-l-2 border-gray-100">
                      <div className="absolute -left-[11px] top-0 w-5 h-5 bg-[#F27D26] rounded-full border-4 border-white shadow-sm" />
                      <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-bold uppercase tracking-widest">{step.duration}</span>
                        </div>
                        <p className="text-gray-500 mb-6 leading-relaxed">{step.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-[#F27D26] mb-3 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" /> Skills to Master
                            </h4>
                            <ul className="space-y-2">
                              {step.skills_to_learn.map((skill, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" /> {skill}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-[#F27D26] mb-3 flex items-center gap-2">
                              <Award className="w-4 h-4" /> Recommended Projects
                            </h4>
                            <ul className="space-y-2">
                              {step.suggested_projects.map((project, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-[#F27D26] rounded-full" /> {project}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-8">
                  <div className="bg-white border border-gray-100 rounded-3xl p-8">
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-[#F27D26]" /> Skill Gap Analysis
                    </h4>
                    <div className="space-y-4">
                      {skillGap.map((gap, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-sm">{gap.skill}</span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              gap.priority === 'High' ? 'bg-red-100 text-red-600' : 
                              gap.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {gap.priority} Priority
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">{gap.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] text-white rounded-3xl p-8">
                    <h4 className="text-xl font-bold mb-6">Timeline Milestones</h4>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">3 Months</span>
                        <p className="text-sm">{roadmap.timeline.three_months}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">6 Months</span>
                        <p className="text-sm">{roadmap.timeline.six_months}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">1 Year</span>
                        <p className="text-sm">{roadmap.timeline.one_year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-white border border-gray-100 rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="bg-[#1A1A1A] p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#F27D26] p-2 rounded-xl">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Pathora Career Coach</h3>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Online & Ready to help
                    </span>
                  </div>
                </div>
                <button onClick={() => setStep('results')} className="text-sm text-gray-400 hover:text-white transition-colors">Close Chat</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {chatHistory.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-[#FDFCFB] border border-gray-100 p-8 rounded-3xl max-w-sm mx-auto">
                      <Sparkles className="w-10 h-10 text-[#F27D26] mx-auto mb-4" />
                      <h4 className="font-bold mb-2">Ask me anything!</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        I can help you understand your matches, refine your roadmap, or answer specific industry questions.
                      </p>
                    </div>
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#F27D26] text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-5 rounded-3xl rounded-tl-none flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="relative">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Ask your career coach..."
                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-[#F27D26] transition-all"
                  />
                  <button 
                    onClick={sendChatMessage}
                    disabled={loading || !chatInput.trim()}
                    className="absolute right-2 top-2 bottom-2 bg-[#1A1A1A] text-white px-4 rounded-xl hover:bg-[#F27D26] transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {loading && step !== 'assessment' && step !== 'chat' && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-[#F27D26] animate-spin mb-4" />
          <h2 className="text-2xl font-bold">Processing...</h2>
        </div>
      )}
    </div>
  );
}

