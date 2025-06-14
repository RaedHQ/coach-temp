import React, { useState, useRef } from 'react';
import { User, Mail, FileText, Linkedin, Upload, Save, CheckCircle } from 'lucide-react';

// Define profile data interface with proper types
interface ProfileData {
    fullName: string;
    email: string;
    bio: string;
    linkedin: string;
    profilePicture: File | null;
}

// Mock initial profile data
const initialProfileData: ProfileData = {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    bio: 'Experienced educational coach with over 10 years of experience helping students achieve their academic and career goals. Specialized in computer science education and career guidance.',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    profilePicture: null
};

const CoachProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData>(initialProfileData);
    const [isEditing, setIsEditing] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle profile image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    setPreviewImage(event.target.result as string);
                    setProfile({
                        ...profile,
                        profilePicture: file
                    });
                }
            };

            reader.readAsDataURL(file);
        }
    };

    // Trigger file input click
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // In a real app, you would send this data to your backend

        // Show success message
        setSaveSuccess(true);

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSaveSuccess(false);
        }, 3000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <div className="flex items-center gap-2">
                    {saveSuccess && (
                        <div className="text-sm text-blue-400 flex items-center gap-1">
                            <CheckCircle size={16} />
                            Profile updated successfully
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        {/* Profile Image Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative">
                                <div
                                    className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700"
                                    onClick={handleUploadClick}
                                >
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User size={64} className="text-gray-600" />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
                                    onClick={handleUploadClick}
                                >
                                    <Upload size={16} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                <h3 className="text-xl font-semibold">{profile.fullName}</h3>
                                <p className="text-gray-400 text-sm">Coach</p>
                                <p className="text-gray-400 text-sm">{profile.email}</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4 pt-4 border-t border-gray-800">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <User size={16} className="text-gray-400" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={profile.fullName}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>

                            {/* Email (Read-only) */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <Mail size={16} className="text-gray-400" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={profile.email}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg opacity-75 cursor-not-allowed"
                                    readOnly
                                />
                                <p className="text-xs text-gray-500">Email address cannot be changed</p>
                            </div>

                            {/* Bio */}
                            <div className="space-y-2">
                                <label htmlFor="bio" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <FileText size={16} className="text-gray-400" />
                                    Professional Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            {/* LinkedIn */}
                            <div className="space-y-2">
                                <label htmlFor="linkedin" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <Linkedin size={16} className="text-gray-400" />
                                    LinkedIn Profile
                                </label>
                                <input
                                    type="url"
                                    id="linkedin"
                                    name="linkedin"
                                    value={profile.linkedin}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="https://linkedin.com/in/yourprofile"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 border-t border-gray-800">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CoachProfilePage; 