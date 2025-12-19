'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useResume, generateId } from '@/context/ResumeContext';
import { Experience, Education, Skill, Language } from '@/types/resume';

interface FormStep {
    id: string;
    title: string;
    fields: string[];
}

const formSteps: FormStep[] = [
    { id: 'personal', title: 'Personal Information', fields: ['fullName', 'phone', 'email', 'location', 'photo'] },
    { id: 'summary', title: 'Professional Summary', fields: ['summary'] },
    { id: 'experience', title: 'Work Experience', fields: ['experience'] },
    { id: 'education', title: 'Education', fields: ['education'] },
    { id: 'skills', title: 'Skills & Languages', fields: ['skills', 'languages'] },
];

export default function FormInput() {
    const { resumeData, updateField, updateResume } = useResume();
    const [currentStep, setCurrentStep] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Experience handlers
    const addExperience = () => {
        const newExp: Experience = {
            id: generateId(),
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
        };
        updateField('experience', [...resumeData.experience, newExp]);
    };

    const updateExperience = (index: number, field: keyof Experience, value: any) => {
        const updated = [...resumeData.experience];
        updated[index] = { ...updated[index], [field]: value };
        updateField('experience', updated);
    };

    const removeExperience = (index: number) => {
        updateField('experience', resumeData.experience.filter((_, i) => i !== index));
    };

    // Education handlers
    const addEducation = () => {
        const newEdu: Education = {
            id: generateId(),
            degree: '',
            institution: '',
            location: '',
            year: '',
            grade: '',
        };
        updateField('education', [...resumeData.education, newEdu]);
    };

    const updateEducation = (index: number, field: keyof Education, value: string) => {
        const updated = [...resumeData.education];
        updated[index] = { ...updated[index], [field]: value };
        updateField('education', updated);
    };

    const removeEducation = (index: number) => {
        updateField('education', resumeData.education.filter((_, i) => i !== index));
    };

    // Skills handlers
    const addSkill = () => {
        const newSkill: Skill = {
            id: generateId(),
            name: '',
            level: 'intermediate',
            category: '',
        };
        updateField('skills', [...resumeData.skills, newSkill]);
    };

    const updateSkill = (index: number, field: keyof Skill, value: any) => {
        const updated = [...resumeData.skills];
        updated[index] = { ...updated[index], [field]: value };
        updateField('skills', updated);
    };

    const removeSkill = (index: number) => {
        updateField('skills', resumeData.skills.filter((_, i) => i !== index));
    };

    // Language handlers
    const addLanguage = () => {
        const newLang: Language = {
            id: generateId(),
            name: '',
            proficiency: 'conversational',
        };
        updateField('languages', [...resumeData.languages, newLang]);
    };

    const updateLanguage = (index: number, field: keyof Language, value: any) => {
        const updated = [...resumeData.languages];
        updated[index] = { ...updated[index], [field]: value };
        updateField('languages', updated);
    };

    const removeLanguage = (index: number) => {
        updateField('languages', resumeData.languages.filter((_, i) => i !== index));
    };

    // Photo upload handler
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateField('photo', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0: // Personal Information
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                            <input
                                type="text"
                                value={resumeData.fullName}
                                onChange={(e) => updateField('fullName', e.target.value)}
                                className="input"
                                placeholder="e.g., Rajesh Kumar"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={resumeData.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                    className="input"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={resumeData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    className="input"
                                    placeholder="rajesh@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                            <input
                                type="text"
                                value={resumeData.location}
                                onChange={(e) => updateField('location', e.target.value)}
                                className="input"
                                placeholder="Mumbai, Maharashtra"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Profile Photo</label>
                            <div className="flex items-center gap-4">
                                {resumeData.photo && (
                                    <img
                                        src={resumeData.photo}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover border-2 border-primary-500"
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="btn-outline text-sm py-2"
                                >
                                    {resumeData.photo ? 'Change Photo' : 'Upload Photo'}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 1: // Summary
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary</label>
                            <textarea
                                value={resumeData.summary}
                                onChange={(e) => updateField('summary', e.target.value)}
                                className="input min-h-[150px]"
                                placeholder="Write a brief summary about yourself, your experience, and what you're looking for..."
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Tip: Mention your years of experience, key skills, and career goals.
                            </p>
                        </div>
                    </div>
                );

            case 2: // Experience
                return (
                    <div className="space-y-6">
                        {resumeData.experience.map((exp, index) => (
                            <div key={exp.id} className="p-4 bg-slate-700/50 rounded-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-white">Experience {index + 1}</h4>
                                    <button
                                        onClick={() => removeExperience(index)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Job Title</label>
                                        <input
                                            type="text"
                                            value={exp.title}
                                            onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                            className="input"
                                            placeholder="e.g., Electrician"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                            className="input"
                                            placeholder="e.g., ABC Construction"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                                    <input
                                        type="text"
                                        value={exp.location || ''}
                                        onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                        className="input"
                                        placeholder="e.g., Mumbai"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                                        <input
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                            className="input"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                                        <input
                                            type="month"
                                            value={exp.endDate || ''}
                                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                            className="input"
                                            disabled={exp.current}
                                        />
                                        <label className="flex items-center gap-2 mt-2">
                                            <input
                                                type="checkbox"
                                                checked={exp.current}
                                                onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                                                className="w-4 h-4 rounded text-primary-500"
                                            />
                                            <span className="text-sm text-gray-400">Currently working here</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                    <textarea
                                        value={exp.description || ''}
                                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                        className="input min-h-[80px]"
                                        placeholder="Describe your responsibilities and achievements..."
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addExperience}
                            className="w-full py-3 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Experience
                        </button>
                    </div>
                );

            case 3: // Education
                return (
                    <div className="space-y-6">
                        {resumeData.education.map((edu, index) => (
                            <div key={edu.id} className="p-4 bg-slate-700/50 rounded-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-white">Education {index + 1}</h4>
                                    <button
                                        onClick={() => removeEducation(index)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Degree/Certificate</label>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                            className="input"
                                            placeholder="e.g., 10th Pass, ITI, B.Tech"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Institution</label>
                                        <input
                                            type="text"
                                            value={edu.institution}
                                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                            className="input"
                                            placeholder="e.g., Government ITI Delhi"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
                                        <input
                                            type="text"
                                            value={edu.year}
                                            onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                            className="input"
                                            placeholder="e.g., 2020"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Grade/Percentage (Optional)</label>
                                        <input
                                            type="text"
                                            value={edu.grade || ''}
                                            onChange={(e) => updateEducation(index, 'grade', e.target.value)}
                                            className="input"
                                            placeholder="e.g., 75%"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addEducation}
                            className="w-full py-3 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Education
                        </button>
                    </div>
                );

            case 4: // Skills & Languages
                return (
                    <div className="space-y-8">
                        {/* Skills */}
                        <div>
                            <h4 className="text-lg font-medium text-white mb-4">Skills</h4>
                            <div className="space-y-3">
                                {resumeData.skills.map((skill, index) => (
                                    <div key={skill.id} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                                            className="input flex-1"
                                            placeholder="e.g., Welding, Plumbing, MS Office"
                                        />
                                        <select
                                            value={skill.level}
                                            onChange={(e) => updateSkill(index, 'level', e.target.value)}
                                            className="input w-40"
                                        >
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="expert">Expert</option>
                                        </select>
                                        <button
                                            onClick={() => removeSkill(index)}
                                            className="text-red-400 hover:text-red-300 p-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addSkill}
                                className="mt-3 text-primary-500 hover:text-primary-400 text-sm flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Skill
                            </button>
                        </div>

                        {/* Languages */}
                        <div>
                            <h4 className="text-lg font-medium text-white mb-4">Languages</h4>
                            <div className="space-y-3">
                                {resumeData.languages.map((lang, index) => (
                                    <div key={lang.id} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={lang.name}
                                            onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                                            className="input flex-1"
                                            placeholder="e.g., Hindi, English, Tamil"
                                        />
                                        <select
                                            value={lang.proficiency}
                                            onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                                            className="input w-40"
                                        >
                                            <option value="basic">Basic</option>
                                            <option value="conversational">Conversational</option>
                                            <option value="fluent">Fluent</option>
                                            <option value="native">Native</option>
                                        </select>
                                        <button
                                            onClick={() => removeLanguage(index)}
                                            className="text-red-400 hover:text-red-300 p-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addLanguage}
                                className="mt-3 text-primary-500 hover:text-primary-400 text-sm flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Language
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2">
                {formSteps.map((step, index) => (
                    <button
                        key={step.id}
                        onClick={() => setCurrentStep(index)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${index === currentStep
                                ? 'bg-primary-500 text-white'
                                : index < currentStep
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-slate-700 text-gray-400'
                            }`}
                    >
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium border">
                            {index < currentStep ? '✓' : index + 1}
                        </span>
                        <span className="hidden sm:inline text-sm">{step.title}</span>
                    </button>
                ))}
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="card bg-slate-800/50 backdrop-blur-sm border-slate-700">
                    <h3 className="text-xl font-semibold text-white mb-6">
                        {formSteps[currentStep].title}
                    </h3>
                    {renderStep()}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700">
                <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-6 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    ← Previous
                </button>
                <button
                    onClick={() => setCurrentStep(Math.min(formSteps.length - 1, currentStep + 1))}
                    disabled={currentStep === formSteps.length - 1}
                    className="btn-primary"
                >
                    {currentStep === formSteps.length - 1 ? 'Complete' : 'Next →'}
                </button>
            </div>
        </div>
    );
}
