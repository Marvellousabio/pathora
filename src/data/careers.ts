import { Career } from '../types';

export const careers: Career[] = [
  {
    id: 'c1',
    name: 'Software Architect',
    description: 'Designs high-level structures of software systems and dictates technical standards.',
    required_skills: ['System Design', 'Cloud Computing', 'Leadership', 'Problem Solving'],
    tags: ['analytical', 'logical', 'structured', 'technical', 'independent', 'strategic'],
    growth_outlook: 'High'
  },
  {
    id: 'c2',
    name: 'UX Designer',
    description: 'Focuses on the interaction between real-world human users and everyday products and services.',
    required_skills: ['User Research', 'Wireframing', 'Empathy', 'Visual Design'],
    tags: ['creative', 'empathetic', 'aesthetic', 'functional', 'collaborative'],
    growth_outlook: 'High'
  },
  {
    id: 'c3',
    name: 'Data Scientist',
    description: 'Uses scientific methods, processes, algorithms and systems to extract knowledge from data.',
    required_skills: ['Statistics', 'Python', 'Machine Learning', 'Data Visualization'],
    tags: ['analytical', 'logical', 'research', 'scientific', 'focused'],
    growth_outlook: 'High'
  },
  {
    id: 'c4',
    name: 'Product Manager',
    description: 'Guides the success of a product and leads the cross-functional team that is responsible for improving it.',
    required_skills: ['Strategy', 'Communication', 'Market Analysis', 'Prioritization'],
    tags: ['strategic', 'commercial', 'leadership', 'communicative', 'collaborative'],
    growth_outlook: 'Medium'
  },
  {
    id: 'c5',
    name: 'Cybersecurity Analyst',
    description: 'Protects computer networks and systems from hackers and other cyber threats.',
    required_skills: ['Network Security', 'Ethical Hacking', 'Attention to Detail', 'Risk Assessment'],
    tags: ['cautious', 'analytical', 'technical', 'process-oriented', 'reliable'],
    growth_outlook: 'High'
  },
  {
    id: 'c6',
    name: 'Digital Marketer',
    description: 'Promotes products or brands through various forms of digital media.',
    required_skills: ['SEO', 'Content Strategy', 'Analytics', 'Social Media'],
    tags: ['creative', 'commercial', 'innovative', 'social', 'adaptable'],
    growth_outlook: 'Medium'
  },
  {
    id: 'c7',
    name: 'Ethical AI Specialist',
    description: 'Ensures that AI systems are developed and deployed in a fair, transparent, and ethical manner.',
    required_skills: ['Ethics', 'AI/ML Knowledge', 'Policy Writing', 'Critical Thinking'],
    tags: ['empathetic', 'analytical', 'humanitarian', 'theoretical', 'visionary'],
    growth_outlook: 'High'
  },
  {
    id: 'c8',
    name: 'Sustainability Consultant',
    description: 'Helps organizations become more socially and environmentally responsible.',
    required_skills: ['Environmental Science', 'Project Management', 'Reporting', 'Stakeholder Engagement'],
    tags: ['helping', 'service', 'strategic', 'collaborative', 'visionary'],
    growth_outlook: 'High'
  },
  {
    id: 'c9',
    name: 'Full Stack Developer',
    description: 'Develops both client and server software.',
    required_skills: ['React', 'Node.js', 'Databases', 'API Design'],
    tags: ['practical', 'builder', 'technical', 'action-oriented', 'experimental'],
    growth_outlook: 'High'
  },
  {
    id: 'c10',
    name: 'Financial Analyst',
    description: 'Assesses the financial performance of businesses and projects.',
    required_skills: ['Financial Modeling', 'Excel', 'Accounting', 'Forecasting'],
    tags: ['analytical', 'logical', 'stable', 'commercial', 'process-oriented'],
    growth_outlook: 'Medium'
  },
  {
    id: 'c11',
    name: 'Clinical Psychologist',
    description: 'Diagnoses and treats mental, emotional, and behavioral disorders.',
    required_skills: ['Empathy', 'Active Listening', 'Research', 'Patience'],
    tags: ['empathy', 'helping', 'service', 'social', 'focused'],
    growth_outlook: 'Medium'
  },
  {
    id: 'c12',
    name: 'Game Developer',
    description: 'Creates video games for various platforms.',
    required_skills: ['C++', 'Unity/Unreal', 'Mathematics', 'Storytelling'],
    tags: ['creative', 'technical', 'innovative', 'aesthetic', 'experimental'],
    growth_outlook: 'Medium'
  },
  {
    id: 'c13',
    name: 'Operations Manager',
    description: 'Oversees the production of goods and/or provision of services.',
    required_skills: ['Efficiency', 'Supply Chain', 'Leadership', 'Budgeting'],
    tags: ['organized', 'practical', 'leadership', 'stable', 'process-oriented'],
    growth_outlook: 'Medium'
  },
  {
    id: 'c14',
    name: 'Content Creator',
    description: 'Produces entertaining or educational material for digital platforms.',
    required_skills: ['Video Editing', 'Storytelling', 'Audience Engagement', 'Creativity'],
    tags: ['creative', 'social', 'bold', 'innovative', 'independent'],
    growth_outlook: 'High'
  },
  {
    id: 'c15',
    name: 'Renewable Energy Engineer',
    description: 'Designs and implements systems for generating energy from renewable sources.',
    required_skills: ['Engineering', 'Thermodynamics', 'AutoCAD', 'Sustainability'],
    tags: ['technical', 'practical', 'visionary', 'scientific', 'builder'],
    growth_outlook: 'High'
  },
  {
    id: 'c16',
    name: 'Cloud Engineer',
    description: 'Manages and maintains cloud-based infrastructure.',
    required_skills: ['AWS/Azure', 'Terraform', 'Linux', 'Networking'],
    tags: ['technical', 'logical', 'stable', 'focused', 'process-oriented'],
    growth_outlook: 'High'
  },
  {
    id: 'c17',
    name: 'Biotechnologist',
    description: 'Uses biological organisms to create or modify products.',
    required_skills: ['Molecular Biology', 'Lab Techniques', 'Data Analysis', 'Genetics'],
    tags: ['scientific', 'research', 'analytical', 'focused', 'theoretical'],
    growth_outlook: 'High'
  },
  {
    id: 'c18',
    name: 'Interior Designer',
    description: 'Plans and furnishes the interiors of private homes and commercial buildings.',
    required_skills: ['Space Planning', 'Color Theory', 'Client Management', 'CAD'],
    tags: ['aesthetic', 'creative', 'functional', 'social', 'empathetic'],
    growth_outlook: 'Medium'
  },
  {
    id: 'c19',
    name: 'Blockchain Developer',
    description: 'Develops and implements decentralized applications using blockchain technology.',
    required_skills: ['Solidity', 'Cryptography', 'Smart Contracts', 'Go/Rust'],
    tags: ['innovative', 'technical', 'bold', 'experimental', 'logical'],
    growth_outlook: 'High'
  },
  {
    id: 'c20',
    name: 'Speech-Language Pathologist',
    description: 'Assesses and treats people with communication and swallowing disorders.',
    required_skills: ['Communication', 'Anatomy', 'Empathy', 'Diagnostic Skills'],
    tags: ['helping', 'service', 'empathy', 'social', 'patient'],
    growth_outlook: 'High'
  }
];
