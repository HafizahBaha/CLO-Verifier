
import { Year, Domain, DomainData, PloData } from './types';

export const PLO_DATA: PloData[] = [
  {
    code: 'PLO1',
    outcome: 'Demonstrate familiarity with, and apply important concepts associated with mathematical sciences in promoting sustainable development.',
    domain: 'Knowledge and Understanding'
  },
  {
    code: 'PLO2',
    outcome: 'Identify relevant real-world problems, critically analyse, formulate and produce solution for the corresponding mathematical problems in encouraging systems thinking.',
    domain: 'Cognitive Skills'
  },
  {
    code: 'PLO3',
    outcome: 'Coordinate resources by applying practical and digital skills on computer software, communicating and analysing mathematical problems, and act effectively as an individual with leadership and managerial capabilities in achieving the assigned task and supporting sustainable technology.',
    domain: 'Functional Works Skills: Practical Skills, Interpersonal Skills, Communication Skills, Digital Skills, Numeracy Skills, Leadership, Autonomy and Responsibility'
  },
  {
    code: 'PLO4',
    outcome: 'Develop self-motivation and entrepreneurial skills for self-sustainability and adapting to social, economic, and environmental needs.',
    domain: 'Personal Skills, Entrepreneurial Skills'
  },
  {
    code: 'PLO5',
    outcome: 'Execute ethical and professional responsibilities while demonstrating respect for moral principles.',
    domain: 'Ethics and Professionalism'
  },
  {
    code: 'PLO6',
    outcome: 'Understand, apply, and harmonise principles related to Islamic values with the mathematical thinking.',
    domain: 'Islamisation'
  }
];

export const SOFT_SKILL_PROGRESSION: Record<Year, Record<string, string[]>> = {
  'Year 1': {
    'CS': ['CS1'],
    'CTPS': ['CTPS1'],
    'TS': ['TS1'],
    'LL': ['LL1'],
    'KK': ['KK1'],
    'EM': ['EM1'],
    'LS': ['LS1'],
  },
  'Year 2': {
    'CS': ['CS2'],
    'CTPS': ['CTPS2'],
    'TS': ['TS2'],
    'LL': ['LL2'],
    'KK': ['KK1'],
    'EM': ['EM2'],
    'LS': ['LS2'],
  },
  'Year 3': {
    'CS': ['CS2', 'CS3'],
    'CTPS': ['CTPS2', 'CTPS3'],
    'TS': ['TS2', 'TS3'],
    'LL': ['LL2'],
    'KK': ['KK1'],
    'EM': ['EM2'],
    'LS': ['LS2'],
  },
  'Year 4': {
    'CS': ['CS3'],
    'CTPS': ['CTPS3'],
    'TS': ['TS3'],
    'LL': ['LL2'],
    'KK': ['KK1'],
    'EM': ['EM2'],
    'LS': ['LS2'],
  },
};

export const YEAR_PROGRESSION: Record<Year, { [key in Domain]?: string[] }> = {
  'Year 1': {
    [Domain.Cognitive]: ['C1', 'C2'],
    [Domain.Affective]: ['A1', 'A2'],
    [Domain.Psychomotor]: ['P1', 'P2'], // Assumed from progression
  },
  'Year 2': {
    [Domain.Cognitive]: ['C2', 'C3'],
    [Domain.Affective]: ['A2', 'A3'],
    [Domain.Psychomotor]: ['P2', 'P3'], // Assumed from progression
  },
  'Year 3': {
    [Domain.Cognitive]: ['C3', 'C4'],
    [Domain.Affective]: ['A2', 'A3'],
    [Domain.Psychomotor]: ['P3', 'P4'], // Assumed from progression
  },
  'Year 4': {
    [Domain.Cognitive]: ['C3', 'C4'],
    [Domain.Affective]: ['A3'],
    [Domain.Psychomotor]: ['P4'], // Ceiling is P4
  },
};

export const CEILINGS = {
    [Domain.Cognitive]: 'C4',
    [Domain.Affective]: 'A3',
    [Domain.Psychomotor]: 'P4',
};

export const BLOOM_TAXONOMY_DATA: DomainData = {
  [Domain.Cognitive]: [
    { code: 'C1', name: 'Knowledge', verbs: ['Define', 'Describe', 'Identify', 'Label', 'List', 'Match', 'Name', 'Outline', 'Recall', 'Recognize', 'Record', 'Relate', 'Repeat', 'Select', 'State', 'Tell', 'Find', 'Memorize', 'Recite'] },
    { code: 'C2', name: 'Comprehension', verbs: ['Change', 'Classify', 'Compare', 'Convert', 'Distinguish', 'Estimate', 'Explain', 'Extend', 'Generalize', 'Give examples', 'Illustrate', 'Infer', 'Interpret', 'Paraphrase', 'Predict', 'Restate', 'Rewrite', 'Summarize', 'Transform', 'Translate', 'Discuss', 'Express', 'Relate'] },
    { code: 'C3', name: 'Application', verbs: ['Apply', 'Build', 'Choose', 'Construct', 'Demonstrate', 'Discover', 'Dramatize', 'Employ', 'Illustrate', 'Interpret', 'Make', 'Modify', 'Operate', 'Paint', 'Practice', 'Prepare', 'Produce', 'Schedule', 'Sketch', 'Solve', 'Use', 'Show'] },
    { code: 'C4', name: 'Analysis', verbs: ['Analyze', 'Appraise', 'Break down', 'Calculate', 'Categorize', 'Classify', 'Compare', 'Contrast', 'Criticize', 'Debate', 'Deduce', 'Diagram', 'Differentiate', 'Discriminate', 'Distinguish', 'Examine', 'Experiment', 'Identify', 'Infer', 'Inspect', 'Investigate', 'Model', 'Outline', 'Point out', 'Question', 'Relate', 'Select', 'Separate', 'Subdivide', 'Survey', 'Test'] },
    { code: 'C5', name: 'Synthesis', verbs: ['Arrange', 'Assemble', 'Categorize', 'Collect', 'Combine', 'Compile', 'Compose', 'Construct', 'Create', 'Design', 'Develop', 'Devise', 'Explain', 'Formulate', 'Generate', 'Hypothesize', 'Integrate', 'Invent', 'Manage', 'Modify', 'Organize', 'Originate', 'Plan', 'Prepare', 'Produce', 'Propose', 'Rearrange', 'Reconstruct', 'Relate', 'Reorganize', 'Revise', 'Rewrite', 'Set up', 'Summarize', 'Synthesize', 'Tell', 'Write', 'Role-play'] },
    { code: 'C6', name: 'Evaluation', verbs: ['Appraise', 'Argue', 'Assess', 'Attach', 'Choose', 'Compare', 'Conclude', 'Contrast', 'Criticize', 'Critique', 'Decide', 'Defend', 'Describe', 'Discriminate', 'Estimate', 'Evaluate', 'Explain', 'Interpret', 'Judge', 'Justify', 'Measure', 'Predict', 'Rate', 'Relate', 'Recommend', 'Revise', 'Score', 'Select', 'Summarize', 'Support', 'Validate', 'Value', 'Weight'] },
  ],
  [Domain.Affective]: [
    { code: 'A1', name: 'Receiving', verbs: ['Ask', 'Choose', 'Describe', 'Follow', 'Give', 'Hold', 'Identify', 'Locate', 'Name', 'Point to', 'Select', 'Sit erect', 'Reply', 'Use'] },
    { code: 'A2', name: 'Responding', verbs: ['Aid', 'Answer', 'Assist', 'Comply', 'Conform', 'Discuss', 'Greet', 'Help', 'Label', 'Perform', 'Practice', 'Present', 'Read', 'Recite', 'Report', 'Select', 'Tell', 'Write'] },
    { code: 'A3', name: 'Valuing', verbs: ['Complete', 'Demonstrate', 'Differentiate', 'Explain', 'Follow', 'Form', 'Initiate', 'Invite', 'Join', 'Justify', 'Propose', 'Read', 'Report', 'Select', 'Share', 'Study', 'Work'] },
    { code: 'A4', name: 'Organization', verbs: ['Adhere', 'Alter', 'Arrange', 'Combine', 'Compare', 'Complete', 'Defend', 'Explain', 'Formulate', 'Generalize', 'Identify', 'Integrate', 'Modify', 'Order', 'Organize', 'Prepare', 'Relate', 'Synthesize'] },
    { code: 'A5', name: 'Internalizing Values', verbs: ['Act', 'Discriminate', 'Display', 'Influence', 'Listen', 'Modify', 'Perform', 'Practice', 'Propose', 'Qualify', 'Question', 'Revise', 'Serve', 'Solve', 'Verify', 'Use'] },
  ],
  [Domain.Psychomotor]: [
    { code: 'P1', name: 'Perception', verbs: ['Choose', 'Describe', 'Detect', 'Differentiate', 'Distinguish', 'Identify', 'Isolate', 'Relate', 'Select'] },
    { code: 'P2', name: 'Set', verbs: ['Begin', 'Display', 'Explain', 'Move', 'Proceed', 'React', 'Show', 'State', 'Volunteer'] },
    { code: 'P3', name: 'Guided Response', verbs: ['Copy', 'Trace', 'Follow', 'React', 'Reproduce', 'Respond'] },
    { code: 'P4', name: 'Mechanism', verbs: ['Assemble', 'Calibrate', 'Construct', 'Dismantle', 'Display', 'Fasten', 'Fix', 'Grind', 'Heat', 'Manipulate', 'Measure', 'Mend', 'Mix', 'Organize', 'Sketch'] },
    { code: 'P5', name: 'Complex Overt Response', verbs: ['Assemble', 'Build', 'Calibrate', 'Construct', 'Dismantle', 'Display', 'Fasten', 'Fix', 'Grind', 'Heat', 'Manipulate', 'Measure', 'Mend', 'Mix', 'Organize', 'Sketch'] },
    { code: 'P6', name: 'Adaptation', verbs: ['Adapt', 'Alter', 'Change', 'Rearrange', 'Reorganize', 'Revise', 'Vary'] },
    { code: 'P7', name: 'Origination', verbs: ['Arrange', 'Build', 'Combine', 'Compose', 'Construct', 'Create', 'Design', 'Initiate', 'Make', 'Originate'] },
  ]
};

export const SOFT_SKILLS_DATA = {
  'CS': [
    { code: 'CS1', description: 'The ability to present ideas clearly, effectively and confidently, in both oral and written forms.' },
    { code: 'CS2', description: 'The ability to practice active listening skills and provide feedback.' },
    { code: 'CS3', description: 'The ability to present clearly with confidence and appropriate to the level of the listener.' },
    { code: 'CS4', description: 'The ability to use technology in presentations.' },
    { code: 'CS5', description: 'The ability to negotiate and reach an agreement.' },
    { code: 'CS6', description: 'The ability to communicate with others from different cultures.' },
    { code: 'CS7', description: 'The ability to develop interpersonal communication skills.' },
    { code: 'CS8', description: 'The ability to use non-verbal skills.' }
  ],
  'CTPS': [
    { code: 'CTPS1', description: 'The ability to identify and analyse problems in complex and vague situations, as well as to make justified evaluations.' },
    { code: 'CTPS2', description: 'The ability to develop and improve thinking skills such as to explain, analyse and evaluate discussions.' },
    { code: 'CTPS3', description: 'The ability to think out of the box to find ideas and alternative solutions.' },
    { code: 'CTPS4', description: 'The ability to make decisions based on concrete evidence.' },
    { code: 'CTPS5', description: 'The ability to persevere as well as to fully concentrate on a given task.' },
    { code: 'CTPS6', description: 'The ability to understand and to fit the culture of community and new environment.' },
    { code: 'CTPS7', description: 'Be responsible for the group\'s decision.' }
  ],
  'TS': [
    { code: 'TS1', description: 'The ability to build good relations, interact with others and work effectively with them to achieve the same objectives.' },
    { code: 'TS2', description: 'The ability to understand and interchange roles between that of a leader and a team member.' },
    { code: 'TS3', description: 'The ability to recognize and respect the attitude, behaviour and beliefs of others.' },
    { code: 'TS4', description: 'The ability to contribute towards the planning and coordination of the team\'s efforts.' },
    { code: 'TS5', description: 'Be responsible for the group\'s decision.' }
  ],
  'LL': [
    { code: 'LL1', description: 'The ability to search and manage relevant information from different sources.' },
    { code: 'LL2', description: 'The ability to accept new ideas and the capability for autonomous learning.' },
    { code: 'LL3', description: 'The ability to develop a curious mind and the thirst for knowledge.' }
  ],
  'KK': [
    { code: 'KK1', description: 'The ability to identify business opportunities.' },
    { code: 'KK2', description: 'The ability to outline business frameworks.' },
    { code: 'KK3', description: 'The ability to build, explore and seize business and work opportunities.' }
  ],
  'EM': [
    { code: 'EM1', description: 'The ability to analyze and make decisions in solving problems related to ethics.' },
    { code: 'EM2', description: 'The ability to recognize the effects on the economy, environment and socio culture in professional practice.' },
    { code: 'EM3', description: 'The ability to practice ethically, apart from being responsible towards the society.' }
  ],
  'LS': [
    { code: 'LS1', description: 'The ability to lead a project.' }, // Assuming generic descriptions as they are not on the chart
    { code: 'LS2', description: 'The ability to understand and take on the responsibilities of a team member.' }
  ]
};