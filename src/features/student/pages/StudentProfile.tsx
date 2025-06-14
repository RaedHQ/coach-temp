import React, { useState, useRef, ChangeEvent } from 'react';
import { User, Mail, BookOpen, GraduationCap, FileText, Save, CheckCircle, Upload } from 'lucide-react';

// Initial profile data
const initialProfile = {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    university: 'State University',
    major: 'Computer Science',
    description: 'Junior year computer science student focusing on software development and AI. Looking for internship opportunities in tech companies.',
    cvFile: null as File | null
};

const StudentProfilePage: React.FC = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [cvFilename, setCvFilename] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle input change for text fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Handle file upload
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setProfile({ ...profile, cvFile: file });
            setCvFilename(file.name);
        }
    };

    // Trigger file input click
    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    // Handle save changes
    const handleSaveChanges = () => {
        setIsSaving(true);

        // Simulate API call delay
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setIsEditing(false);

            // Reset success message after 3 seconds
            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);
        }, 800);
    };

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-gray-400 mt-1">Manage your personal information and preferences.</p>
            </div>

            {/* Profile Card */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <>Saving...</>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Success Message */}
                {saveSuccess && (
                    <div className="bg-green-900/20 border-l-4 border-green-500 p-4 flex items-center gap-3">
                        <CheckCircle size={20} className="text-green-500" />
                        <p className="text-green-400">Your profile has been updated successfully!</p>
                    </div>
                )}

                {/* Form Content */}
                <div className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-400 gap-1.5">
                                <User size={16} />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={profile.fullName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full p-3 rounded-lg border ${isEditing
                                        ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        : 'bg-gray-900 border-gray-800'
                                    } focus:outline-none transition-colors`}
                            />
                        </div>

                        {/* Email (read-only) */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-400 gap-1.5">
                                <Mail size={16} />
                                Email (read-only)
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                disabled
                                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 text-gray-500"
                            />
                        </div>

                        {/* University */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-400 gap-1.5">
                                <GraduationCap size={16} />
                                University
                            </label>
                            <input
                                type="text"
                                name="university"
                                value={profile.university}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full p-3 rounded-lg border ${isEditing
                                        ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        : 'bg-gray-900 border-gray-800'
                                    } focus:outline-none transition-colors`}
                            />
                        </div>

                        {/* Major */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-400 gap-1.5">
                                <BookOpen size={16} />
                                Major
                            </label>
                            <input
                                type="text"
                                name="major"
                                value={profile.major}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full p-3 rounded-lg border ${isEditing
                                        ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                        : 'bg-gray-900 border-gray-800'
                                    } focus:outline-none transition-colors`}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-gray-400 gap-1.5">
                            Description (Bio)
                        </label>
                        <textarea
                            name="description"
                            value={profile.description}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            rows={4}
                            className={`w-full p-3 rounded-lg border ${isEditing
                                    ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                    : 'bg-gray-900 border-gray-800'
                                } focus:outline-none transition-colors`}
                        />
                    </div>

                    {/* CV Upload */}
                    <div className="space-y-4">
                        <label className="flex items-center text-sm font-medium text-gray-400 gap-1.5">
                            <FileText size={16} />
                            Curriculum Vitae (CV)
                        </label>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            disabled={!isEditing}
                        />

                        {cvFilename ? (
                            <div className="flex items-center gap-2 p-3 bg-blue-900/20 border border-blue-900/30 rounded-lg">
                                <FileText size={20} className="text-blue-400" />
                                <span className="text-blue-400">{cvFilename}</span>
                                {isEditing && (
                                    <button
                                        onClick={triggerFileUpload}
                                        className="ml-auto text-sm text-blue-400 hover:text-blue-300"
                                    >
                                        Change
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${isEditing ? 'border-gray-700 hover:border-blue-500 cursor-pointer' : 'border-gray-800'
                                }`}
                                onClick={isEditing ? triggerFileUpload : undefined}
                            >
                                <Upload size={24} className="mx-auto mb-2 text-gray-500" />
                                <p className="text-gray-400 mb-1">
                                    {isEditing
                                        ? 'Click to upload your CV (PDF, DOC, DOCX)'
                                        : 'No CV uploaded yet'
                                    }
                                </p>
                                {isEditing && (
                                    <p className="text-xs text-gray-500">Max file size: 5MB</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfilePage; 