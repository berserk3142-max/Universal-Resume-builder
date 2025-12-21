// Resume Builder Types

export interface Experience {
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    location?: string;
    year: string;
    grade?: string;
}

export interface Skill {
    id: string;
    name: string;
    level?: 'beginner' | 'intermediate' | 'expert';
    category?: string;
}

export interface Language {
    id: string;
    name: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface PortfolioItem {
    id: string;
    type: 'image' | 'video' | 'link';
    url: string;
    title?: string;
    description?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    startDate?: string;
    endDate?: string;
    techStack?: string;
}

export interface Achievement {
    id: string;
    title: string;
    description?: string;
}

export interface ResumeData {
    id?: string;
    fullName: string;
    phone?: string;
    email?: string;
    location?: string;
    linkedin?: string;
    photo?: string;
    summary?: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    languages: Language[];
    portfolio: PortfolioItem[];
    projects: Project[];
    achievements: Achievement[];
    template: string;
}

export interface Version {
    id: string;
    resumeId: string;
    data: ResumeData;
    createdAt: Date;
    note?: string;
}

export interface Comment {
    id: string;
    resumeId: string;
    content: string;
    author?: string;
    createdAt: Date;
}

export type InputMode = 'form' | 'chat' | 'voice' | 'image';

export interface ChatMessage {
    id: string;
    type: 'bot' | 'user';
    content: string;
    timestamp: Date;
    field?: keyof ResumeData;
}

// Default empty resume
export const defaultResumeData: ResumeData = {
    fullName: '',
    phone: '',
    email: '',
    location: '',
    linkedin: '',
    photo: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    portfolio: [],
    projects: [],
    achievements: [],
    template: 'professional',
};
