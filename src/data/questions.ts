import { Category, Question } from '../types';

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'When faced with a complex problem, what is your first instinct?',
    category: Category.PERSONALITY,
    options: [
      { label: 'Break it down into logical steps', value: 'analytical', traits: ['analytical', 'logical', 'structured'] },
      { label: 'Brainstorm creative, out-of-the-box solutions', value: 'creative', traits: ['creative', 'innovative', 'visionary'] },
      { label: 'Talk it through with others to find a consensus', value: 'collaborative', traits: ['collaborative', 'empathetic', 'communicative'] },
      { label: 'Jump in and start testing things immediately', value: 'practical', traits: ['practical', 'action-oriented', 'experimental'] },
    ]
  },
  {
    id: 'q2',
    text: 'Which environment makes you feel most energized?',
    category: Category.PREFERENCES,
    options: [
      { label: 'A quiet, focused space where I can work alone', value: 'solitary', traits: ['independent', 'focused', 'self-motivated'] },
      { label: 'A bustling office with lots of interaction', value: 'social', traits: ['extroverted', 'team-player', 'social'] },
      { label: 'A dynamic, fast-paced startup environment', value: 'dynamic', traits: ['adaptable', 'resilient', 'fast-paced'] },
      { label: 'A structured, stable corporate setting', value: 'stable', traits: ['organized', 'reliable', 'process-oriented'] },
    ]
  },
  {
    id: 'q3',
    text: 'What kind of impact do you want your work to have?',
    category: Category.INTERESTS,
    options: [
      { label: 'Advancing scientific or technical knowledge', value: 'technical', traits: ['technical', 'research', 'scientific'] },
      { label: 'Helping individuals improve their lives', value: 'humanitarian', traits: ['helping', 'empathy', 'service'] },
      { label: 'Creating beautiful or functional products', value: 'design', traits: ['aesthetic', 'functional', 'craftsmanship'] },
      { label: 'Driving business growth and efficiency', value: 'business', traits: ['strategic', 'commercial', 'leadership'] },
    ]
  },
  // Adding more questions to reach 20-30 range would be long, 
  // I'll add a few more and then use AI to generate the rest or mock them.
  {
    id: 'q4',
    text: 'How do you prefer to learn new skills?',
    category: Category.SKILLS,
    options: [
      { label: 'Reading books and theoretical papers', value: 'theoretical', traits: ['theoretical', 'academic'] },
      { label: 'Hands-on practice and building things', value: 'hands-on', traits: ['practical', 'builder'] },
      { label: 'Watching tutorials and demonstrations', value: 'visual', traits: ['visual-learner'] },
      { label: 'Learning from a mentor or peer', value: 'social-learning', traits: ['mentorship', 'collaborative'] },
    ]
  },
  {
    id: 'q5',
    text: 'What is your attitude towards risk?',
    category: Category.PERSONALITY,
    options: [
      { label: 'I prefer safe, predictable outcomes', value: 'risk-averse', traits: ['cautious', 'stable'] },
      { label: 'I enjoy taking calculated risks for high rewards', value: 'risk-taker', traits: ['bold', 'entrepreneurial'] },
      { label: 'I am comfortable with uncertainty if there is a plan', value: 'balanced', traits: ['strategic', 'adaptable'] },
    ]
  },
  {
    id: 'q6',
    text: 'When working in a team, what role do you naturally gravitate towards?',
    category: Category.PERSONALITY,
    options: [
      { label: 'The leader who sets the vision and direction', value: 'leader', traits: ['leadership', 'visionary', 'strategic'] },
      { label: 'The specialist who handles the technical details', value: 'specialist', traits: ['technical', 'focused', 'analytical'] },
      { label: 'The mediator who ensures everyone is heard', value: 'mediator', traits: ['empathetic', 'collaborative', 'communicative'] },
      { label: 'The executor who gets things done efficiently', value: 'executor', traits: ['practical', 'action-oriented', 'organized'] },
    ]
  },
  {
    id: 'q7',
    text: 'What kind of problems do you find most satisfying to solve?',
    category: Category.INTERESTS,
    options: [
      { label: 'Abstract, theoretical puzzles', value: 'abstract', traits: ['theoretical', 'analytical', 'research'] },
      { label: 'Practical, everyday issues', value: 'practical_prob', traits: ['practical', 'functional', 'action-oriented'] },
      { label: 'Human-centric, emotional challenges', value: 'human', traits: ['empathy', 'helping', 'service'] },
      { label: 'Business or organizational inefficiencies', value: 'business_prob', traits: ['strategic', 'commercial', 'leadership'] },
    ]
  },
  {
    id: 'q8',
    text: 'How do you handle high-pressure situations?',
    category: Category.PERSONALITY,
    options: [
      { label: 'I stay calm and follow a structured plan', value: 'calm', traits: ['stable', 'structured', 'resilient'] },
      { label: 'I get energized and work faster', value: 'energized', traits: ['fast-paced', 'action-oriented', 'bold'] },
      { label: 'I seek support and collaboration from others', value: 'social_pressure', traits: ['collaborative', 'communicative'] },
      { label: 'I take a step back to re-evaluate the situation', value: 'reflective', traits: ['analytical', 'strategic'] },
    ]
  },
  {
    id: 'q9',
    text: 'Which of these activities sounds most appealing for a weekend project?',
    category: Category.INTERESTS,
    options: [
      { label: 'Building a complex piece of furniture or a gadget', value: 'building', traits: ['builder', 'practical', 'craftsmanship'] },
      { label: 'Writing a short story or a blog post', value: 'writing', traits: ['creative', 'communicative', 'innovative'] },
      { label: 'Analyzing a dataset to find hidden trends', value: 'data', traits: ['analytical', 'logical', 'research'] },
      { label: 'Volunteering for a local community cause', value: 'volunteering', traits: ['helping', 'service', 'empathy'] },
    ]
  },
  {
    id: 'q10',
    text: 'What is your preferred way to communicate complex ideas?',
    category: Category.SKILLS,
    options: [
      { label: 'Through detailed written reports', value: 'written', traits: ['structured', 'analytical', 'communicative'] },
      { label: 'Using visual aids and diagrams', value: 'visual_comm', traits: ['visual-learner', 'creative', 'aesthetic'] },
      { label: 'In face-to-face presentations or discussions', value: 'verbal', traits: ['social', 'communicative', 'leadership'] },
      { label: 'By demonstrating a working prototype', value: 'demo', traits: ['practical', 'builder', 'action-oriented'] },
    ]
  },
  {
    id: 'q11',
    text: 'What motivates you most in a professional setting?',
    category: Category.PERSONALITY,
    options: [
      { label: 'Recognition and status', value: 'recognition', traits: ['ambitious', 'commercial', 'leadership'] },
      { label: 'The opportunity to learn and grow', value: 'growth', traits: ['curious', 'academic', 'innovative'] },
      { label: 'Making a positive difference in society', value: 'impact', traits: ['humanitarian', 'empathy', 'service'] },
      { label: 'Financial stability and security', value: 'stability', traits: ['stable', 'reliable', 'cautious'] },
    ]
  },
  {
    id: 'q12',
    text: 'How do you approach decision-making?',
    category: Category.PERSONALITY,
    options: [
      { label: 'I rely on data and facts', value: 'data_driven', traits: ['analytical', 'logical', 'structured'] },
      { label: 'I trust my intuition and gut feeling', value: 'intuitive', traits: ['creative', 'visionary', 'bold'] },
      { label: 'I seek input from others before deciding', value: 'collaborative_dec', traits: ['collaborative', 'empathetic', 'social'] },
      { label: 'I weigh the pros and cons carefully', value: 'balanced_dec', traits: ['strategic', 'cautious', 'organized'] },
    ]
  },
  {
    id: 'q13',
    text: 'Which of these fields interests you the most?',
    category: Category.INTERESTS,
    options: [
      { label: 'Technology and software', value: 'tech', traits: ['technical', 'innovative', 'builder'] },
      { label: 'Healthcare and wellness', value: 'health', traits: ['helping', 'service', 'empathy'] },
      { label: 'Arts and entertainment', value: 'arts', traits: ['creative', 'aesthetic', 'visionary'] },
      { label: 'Finance and economics', value: 'finance', traits: ['commercial', 'analytical', 'strategic'] },
    ]
  },
  {
    id: 'q14',
    text: 'How do you feel about public speaking?',
    category: Category.SKILLS,
    options: [
      { label: 'I enjoy it and find it natural', value: 'enjoy_speaking', traits: ['communicative', 'social', 'leadership'] },
      { label: 'I can do it if necessary, but it makes me nervous', value: 'nervous_speaking', traits: ['focused', 'independent'] },
      { label: 'I prefer to communicate in writing', value: 'prefer_writing', traits: ['structured', 'analytical'] },
      { label: 'I am a strong presenter and storyteller', value: 'storyteller', traits: ['creative', 'visionary', 'communicative'] },
    ]
  },
  {
    id: 'q15',
    text: 'What is your ideal work-life balance?',
    category: Category.PREFERENCES,
    options: [
      { label: 'I am willing to work long hours for a rewarding career', value: 'career_focused', traits: ['ambitious', 'bold', 'resilient'] },
      { label: 'I prioritize a strict 9-to-5 schedule', value: 'strict_schedule', traits: ['stable', 'organized', 'reliable'] },
      { label: 'I prefer a flexible schedule that I can control', value: 'flexible', traits: ['independent', 'adaptable', 'self-motivated'] },
      { label: 'I enjoy a mix of intense work and long breaks', value: 'project_based', traits: ['action-oriented', 'experimental'] },
    ]
  },
  {
    id: 'q16',
    text: 'How do you handle feedback?',
    category: Category.PERSONALITY,
    options: [
      { label: 'I appreciate it and use it to improve', value: 'open_feedback', traits: ['adaptable', 'resilient', 'growth-oriented'] },
      { label: 'I take it personally and find it difficult', value: 'sensitive_feedback', traits: ['empathetic', 'focused'] },
      { label: 'I only value feedback from experts', value: 'expert_feedback', traits: ['analytical', 'academic'] },
      { label: 'I prefer to self-evaluate', value: 'self_eval', traits: ['independent', 'self-motivated'] },
    ]
  },
  {
    id: 'q17',
    text: 'What kind of work tools do you prefer?',
    category: Category.SKILLS,
    options: [
      { label: 'Advanced software and coding environments', value: 'software_tools', traits: ['technical', 'logical', 'builder'] },
      { label: 'Creative design and editing software', value: 'creative_tools', traits: ['creative', 'aesthetic', 'innovative'] },
      { label: 'Spreadsheets and data analysis tools', value: 'data_tools', traits: ['analytical', 'structured', 'commercial'] },
      { label: 'Physical tools and machinery', value: 'physical_tools', traits: ['practical', 'craftsmanship', 'functional'] },
    ]
  },
  {
    id: 'q18',
    text: 'How do you stay organized?',
    category: Category.SKILLS,
    options: [
      { label: 'I use detailed calendars and to-do lists', value: 'planner', traits: ['organized', 'structured', 'reliable'] },
      { label: 'I keep everything in my head', value: 'mental_org', traits: ['adaptable', 'fast-paced'] },
      { label: 'I use project management software', value: 'pm_tools', traits: ['strategic', 'collaborative', 'process-oriented'] },
      { label: 'I prefer a more fluid, spontaneous approach', value: 'spontaneous', traits: ['creative', 'innovative', 'experimental'] },
    ]
  },
  {
    id: 'q19',
    text: 'What is your preferred team size?',
    category: Category.PREFERENCES,
    options: [
      { label: 'Working alone', value: 'solo', traits: ['independent', 'focused', 'self-motivated'] },
      { label: 'A small, tight-knit team', value: 'small_team', traits: ['collaborative', 'empathetic', 'social'] },
      { label: 'A large department or organization', value: 'large_org', traits: ['process-oriented', 'stable', 'reliable'] },
      { label: 'I can work in any team size', value: 'any_team', traits: ['adaptable', 'resilient'] },
    ]
  },
  {
    id: 'q20',
    text: 'What is your ultimate career goal?',
    category: Category.INTERESTS,
    options: [
      { label: 'To become a world-renowned expert in my field', value: 'expert_goal', traits: ['ambitious', 'academic', 'technical'] },
      { label: 'To lead a successful company or organization', value: 'leader_goal', traits: ['leadership', 'strategic', 'commercial'] },
      { label: 'To create something that leaves a lasting legacy', value: 'legacy_goal', traits: ['visionary', 'creative', 'innovative'] },
      { label: 'To have a stable, fulfilling job that supports my life', value: 'stability_goal', traits: ['stable', 'reliable', 'service'] },
    ]
  }
];
