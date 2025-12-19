'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useResume, generateId } from '@/context/ResumeContext';
import { ChatMessage, ResumeData } from '@/types/resume';

interface ChatStep {
    field: keyof ResumeData | 'experience_title' | 'experience_company' | 'skill_add' | 'complete';
    question: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'confirm' | 'options';
    options?: string[];
}

const chatFlow: ChatStep[] = [
    { field: 'fullName', question: "👋 Namaste! Let's build your resume. What's your full name?", placeholder: 'e.g., Rajesh Kumar', type: 'text' },
    { field: 'phone', question: "📱 Great! What's your phone number?", placeholder: '+91 98765 43210', type: 'text' },
    { field: 'email', question: '📧 Do you have an email address? (You can skip by pressing Enter)', placeholder: 'example@email.com', type: 'text' },
    { field: 'location', question: '📍 Where are you located?', placeholder: 'e.g., Mumbai, Maharashtra', type: 'text' },
    { field: 'summary', question: '✨ Tell me a bit about yourself. What kind of work do you do?', placeholder: 'e.g., I am an experienced electrician with 5 years of work...', type: 'textarea' },
    { field: 'experience_title', question: '💼 What was your most recent job title?', placeholder: 'e.g., Electrician, Driver, Cook', type: 'text' },
    { field: 'experience_company', question: '🏢 Which company or place did you work at?', placeholder: 'e.g., ABC Construction', type: 'text' },
    { field: 'skill_add', question: '🛠️ What skills do you have? (Enter one skill at a time, type "done" when finished)', placeholder: 'e.g., Welding, Driving, Cooking', type: 'text' },
    { field: 'complete', question: '🎉 Your resume is taking shape! Would you like to add more details using the form, or download your resume now?', placeholder: '', type: 'options', options: ['Switch to Form', 'Preview Resume'] },
];

export default function ChatInput() {
    const { resumeData, updateField, updateResume, setInputMode } = useResume();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // Temporary storage for multi-step data
    const [tempExperience, setTempExperience] = useState({ title: '', company: '' });
    const [collectingSkills, setCollectingSkills] = useState(false);

    useEffect(() => {
        // Start with the first question
        if (messages.length === 0) {
            addBotMessage(chatFlow[0].question);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentStep]);

    const addBotMessage = (content: string) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    id: generateId(),
                    type: 'bot',
                    content,
                    timestamp: new Date(),
                },
            ]);
            setIsTyping(false);
        }, 500);
    };

    const addUserMessage = (content: string) => {
        setMessages(prev => [
            ...prev,
            {
                id: generateId(),
                type: 'user',
                content,
                timestamp: new Date(),
            },
        ]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() && chatFlow[currentStep].type !== 'text') return;

        const step = chatFlow[currentStep];
        const value = inputValue.trim();

        // Add user message
        if (value) {
            addUserMessage(value);
        }

        // Process the input based on the current step
        switch (step.field) {
            case 'fullName':
                updateField('fullName', value);
                break;
            case 'phone':
                updateField('phone', value);
                break;
            case 'email':
                updateField('email', value);
                break;
            case 'location':
                updateField('location', value);
                break;
            case 'summary':
                updateField('summary', value);
                break;
            case 'experience_title':
                setTempExperience(prev => ({ ...prev, title: value }));
                break;
            case 'experience_company':
                // Add the experience
                const newExp = {
                    id: generateId(),
                    title: tempExperience.title,
                    company: value,
                    location: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: '',
                };
                updateField('experience', [...resumeData.experience, newExp]);
                break;
            case 'skill_add':
                if (value.toLowerCase() === 'done') {
                    setCollectingSkills(false);
                    // Move to next step
                    setInputValue('');
                    const nextStep = currentStep + 1;
                    if (nextStep < chatFlow.length) {
                        setCurrentStep(nextStep);
                        setTimeout(() => addBotMessage(chatFlow[nextStep].question), 300);
                    }
                    return;
                } else {
                    // Add the skill
                    const newSkill = {
                        id: generateId(),
                        name: value,
                        level: 'intermediate' as const,
                    };
                    updateField('skills', [...resumeData.skills, newSkill]);
                    // Ask for more skills
                    setInputValue('');
                    addBotMessage('Got it! Add another skill or type "done" to continue.');
                    return;
                }
        }

        // Move to next step
        setInputValue('');
        const nextStep = currentStep + 1;
        if (nextStep < chatFlow.length) {
            setCurrentStep(nextStep);
            setTimeout(() => addBotMessage(chatFlow[nextStep].question), 300);
        }
    };

    const handleOptionClick = (option: string) => {
        addUserMessage(option);
        if (option === 'Switch to Form') {
            setInputMode('form');
        }
        // Preview resume option will be handled by the parent component
    };

    const currentStepData = chatFlow[currentStep];

    return (
        <div className="h-full flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} chat-message-enter`}
                    >
                        <div
                            className={`max-w-[80%] p-4 rounded-2xl ${msg.type === 'user'
                                    ? 'bg-primary-500 text-white rounded-br-md'
                                    : 'bg-slate-700 text-white rounded-bl-md'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-slate-700 text-white p-4 rounded-2xl rounded-bl-md">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-700 p-4">
                {currentStepData.type === 'options' ? (
                    <div className="flex flex-wrap gap-3 justify-center">
                        {currentStepData.options?.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="btn-primary"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        {currentStepData.type === 'textarea' ? (
                            <textarea
                                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={currentStepData.placeholder}
                                className="input flex-1 min-h-[60px] resize-none"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                        ) : (
                            <input
                                ref={inputRef as React.RefObject<HTMLInputElement>}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={currentStepData.placeholder}
                                className="input flex-1"
                            />
                        )}
                        <button type="submit" className="btn-primary px-6">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                )}

                {/* Quick Tips */}
                <p className="text-xs text-gray-500 text-center mt-2">
                    Press Enter to send • Shift+Enter for new line
                </p>
            </div>
        </div>
    );
}
