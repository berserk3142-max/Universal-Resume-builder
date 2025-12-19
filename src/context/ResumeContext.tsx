'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ResumeData, InputMode, defaultResumeData } from '@/types/resume';
import { v4 as uuidv4 } from 'uuid';

interface ResumeContextType {
    resumeData: ResumeData;
    updateField: <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => void;
    updateResume: (data: Partial<ResumeData>) => void;
    resetResume: () => void;
    inputMode: InputMode;
    setInputMode: (mode: InputMode) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    saveResume: () => Promise<string | null>;
    loadResume: (id: string) => Promise<boolean>;
    currentResumeId: string | null;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
    const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
    const [inputMode, setInputMode] = useState<InputMode>('form');
    const [isLoading, setIsLoading] = useState(false);
    const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);

    const updateField = useCallback(<K extends keyof ResumeData>(
        field: K,
        value: ResumeData[K]
    ) => {
        setResumeData(prev => ({ ...prev, [field]: value }));
    }, []);

    const updateResume = useCallback((data: Partial<ResumeData>) => {
        setResumeData(prev => ({ ...prev, ...data }));
    }, []);

    const resetResume = useCallback(() => {
        setResumeData(defaultResumeData);
        setCurrentResumeId(null);
    }, []);

    const saveResume = useCallback(async (): Promise<string | null> => {
        setIsLoading(true);
        try {
            const method = currentResumeId ? 'PUT' : 'POST';
            const url = currentResumeId
                ? `/api/resume/${currentResumeId}`
                : '/api/resume';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resumeData),
            });

            if (!response.ok) throw new Error('Failed to save resume');

            const result = await response.json();
            setCurrentResumeId(result.id);
            return result.id;
        } catch (error) {
            console.error('Error saving resume:', error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [resumeData, currentResumeId]);

    const loadResume = useCallback(async (id: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/resume/${id}`);
            if (!response.ok) throw new Error('Resume not found');

            const resume = await response.json();
            setResumeData({
                id: resume.id,
                fullName: resume.fullName,
                phone: resume.phone || '',
                email: resume.email || '',
                location: resume.location || '',
                photo: resume.photo || '',
                summary: resume.summary || '',
                experience: resume.experience || [],
                education: resume.education || [],
                skills: resume.skills || [],
                languages: resume.languages || [],
                portfolio: resume.portfolio || [],
                template: resume.template || 'professional',
            });
            setCurrentResumeId(id);
            return true;
        } catch (error) {
            console.error('Error loading resume:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <ResumeContext.Provider
            value={{
                resumeData,
                updateField,
                updateResume,
                resetResume,
                inputMode,
                setInputMode,
                isLoading,
                setIsLoading,
                saveResume,
                loadResume,
                currentResumeId,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
}

// Helper to generate unique IDs
export const generateId = () => uuidv4();
