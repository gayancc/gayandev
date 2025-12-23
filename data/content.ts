export interface SocialLink {
  label: string;
  url: string;
  icon: 'facebook' | 'linkedin' | 'twitter' | 'github' | 'stackoverflow';
}

export interface FunFact {
  label: string;
  icon: string;
}

export interface InfoItem {
  label: string;
  value: string;
}

export interface ResumeItem {
  date: string;
  role: string;
  company: string;
  description: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillGroup {
  title: string;
  icon: string;
  variant: 'bars' | 'dots' | 'circles' | 'list';
  items: SkillItem[] | { name: string }[];
}

export interface ContactInfo {
  label: string;
  value: string;
}

export const profile = {
  name: 'Gayan Ranasinghe',
  title: 'Technical Lead',
  tagline: 'A proficient C# Developer with more experience delivering code to a consistently high standard, I am committed to further improving my web development skills. My extensive knowledge helps to inform practical solutions which are deployed with the utmost efficiency. Supported by a proven track record of developing .NET applications, I am seeking a role which capitalises on my existing capabilities and helps to expand my skills..',
  avatar: '/images/me.jpg',
  background: '/images/dark.jpg',
  resumeUrl: '#',
  socials: [
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/roxcon85',
      icon: 'facebook',
    },
    {
      label: 'LinkedIn',
      url: 'https://twitter.com/gayancc',
      icon: 'linkedin',
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/gayancc',
      icon: 'twitter',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/gayan85',
      icon: 'github',
    },
    {
      label: 'Stack Overflow',
      url: 'https://stackoverflow.com/users/301502/gayan?tab=profile',
      icon: 'stackoverflow',
    },
  ] satisfies SocialLink[],
};

export const aboutInfo: InfoItem[] = [
  { label: 'Age . . . . .', value: '34' },
  { label: 'Residence . . . . .', value: 'Sri Lanka' },
  { label: 'Freelance . . . . .', value: 'Available' },
  { label: 'Address . . . . .', value: 'Richmond hills, Canada' },
];

export const funFacts: FunFact[] = [
  { label: '1000 Albumes Listened', icon: 'disc' },
  { label: '1M line of code compiled', icon: 'trophy' },
  { label: '2M  beers', icon: 'beer' },
  { label: 'Servived from Covid-19', icon: 'heart' },
];

export const experience: ResumeItem[] = [
  {
    date: '2020 - Present',
    role: 'Lead Software Engineer',
    company: 'Paymate Software Corporation, Canada',
    description: 'Collaborate with development teams on the execution of development tasks.',
  },
  {
    date: '2015 - 2019',
    role: 'Tech Lead',
    company: 'Google Inc.',
    description:
      'SaaS based web and mobile application designed to help construction teams schedule, organize, and manage their work.',
  },
  {
    date: '2014 - 2015',
    role: 'Software Engineer',
    company: 'Creo 360.',
    description:
      'Developed CMS solution for canadian client. Exacttartget salesforce api intergration and development',
  },
  {
    date: '2010 - 2014',
    role: 'SEO Strategist',
    company: 'Abc Inc.',
    description:
      "Optimizing the websites to increase the traffic. Analysis of client's Website, Competitor Analysis and Top Keywords Analysis.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Proficiency',
    icon: 'easel',
    variant: 'bars',
    items: [
      { name: 'Database', level: 90 },
      { name: 'Backend Development', level: 95 },
      { name: 'Photoshop', level: 75 },
      { name: 'Music', level: 50 },
    ],
  },
  {
    title: 'Languages',
    icon: 'flag',
    variant: 'bars',
    items: [
      { name: 'C#', level: 90 },
      { name: 'Sql', level: 70 },
      { name: 'Javascript', level: 85 },
      { name: 'Python', level: 60 },
    ],
  },
  {
    title: 'Coding',
    icon: 'code',
    variant: 'circles',
    items: [
      { name: 'ASP.NET CORE', level: 90 },
      { name: 'PHP / MYSQL', level: 55 },
      { name: 'Angular / JavaScript', level: 85 },
      { name: 'Desktop Application Development', level: 85 },
    ],
  },
  {
    title: 'Knowledge',
    icon: 'list',
    variant: 'list',
    items: [
      { name: 'Website hosting' },
      { name: 'CI/ CD Azue, Jenkins, Aws' },
      { name: 'Architectural Design Pattern' },
      { name: 'Project Management' },
      { name: 'Modern and mobile-ready' },
      { name: 'Graphics and animations' },
      { name: 'Search engine marketing' },
    ],
  },
];

export const contactInfo: ContactInfo[] = [
  { label: 'Address . . . . .', value: 'Richmond hills, Canada' },
  { label: 'Email . . . . .', value: 'gayancc@gmail.com' },
  { label: 'Freelance . . . . .', value: 'Available' },
];

export const stackExchangeFlair = {
  url: 'https://stackexchange.com/users/114702',
  image:
    'https://stackexchange.com/users/flair/114702.png?theme=dark',
  alt: 'profile for Gayan on Stack Exchange, a network of free, community-driven Q&A sites',
};

export const placeholderProject = {
  title: 'Project Showcase',
  description: 'Add your featured project details here to replace this placeholder card.',
  tags: ['Next.js 14', 'React', 'Three.js'],
};
