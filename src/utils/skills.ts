export const skillCategories = {
  'Frontend Development': [
    'React', 'Vue.js', 'Angular', 'HTML/CSS', 'JavaScript', 'TypeScript',
    'Next.js', 'Nuxt.js', 'Svelte', 'jQuery', 'Bootstrap', 'Tailwind CSS'
  ],
  'Backend Development': [
    'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
    'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'FastAPI'
  ],
  'Mobile Development': [
    'React Native', 'Flutter', 'Android (Java/Kotlin)', 'iOS (Swift)',
    'Xamarin', 'Ionic', 'PhoneGap', 'Native Script'
  ],
  'AI/ML': [
    'Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP',
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV',
    'Data Science', 'Data Analytics', 'Big Data'
  ],
  'Database': [
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle',
    'Microsoft SQL Server', 'Firebase', 'DynamoDB', 'Elasticsearch'
  ],
  'Cloud & DevOps': [
    'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Jenkins',
    'GitHub Actions', 'Terraform', 'Ansible', 'Linux', 'CI/CD'
  ],
  'Design': [
    'UI/UX Design', 'Figma', 'Adobe XD', 'Sketch', 'Photoshop',
    'Illustrator', 'Prototyping', 'User Research', 'Wireframing'
  ],
  'Other Technical': [
    'Blockchain', 'Cybersecurity', 'IoT', 'AR/VR', 'Game Development',
    'API Development', 'Microservices', 'GraphQL', 'WebRTC', 'WebAssembly'
  ],
  'Soft Skills': [
    'Team Leadership', 'Project Management', 'Communication',
    'Problem Solving', 'Critical Thinking', 'Presentation',
    'Business Analysis', 'Product Management', 'Agile/Scrum'
  ]
};

export const getSkillColor = (skill: string): string => {
  const frontendSkills = skillCategories['Frontend Development'];
  const backendSkills = skillCategories['Backend Development'];
  const mobileSkills = skillCategories['Mobile Development'];
  const aiSkills = skillCategories['AI/ML'];
  const designSkills = skillCategories['Design'];

  if (frontendSkills.includes(skill)) return 'skill-frontend';
  if (backendSkills.includes(skill)) return 'skill-backend';
  if (mobileSkills.includes(skill)) return 'skill-mobile';
  if (aiSkills.includes(skill)) return 'skill-ai';
  if (designSkills.includes(skill)) return 'skill-design';
  return 'skill-other';
};

export const branchOptions = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'MCA',
  'BCA',
  'Other'
];

export const yearOptions = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Final Year',
  'Other'
];