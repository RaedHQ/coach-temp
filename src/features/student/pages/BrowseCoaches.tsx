import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Search, Calendar, Star, Filter, BookOpen } from 'lucide-react';

// Mock coaches data
const mockCoaches = [
    {
        id: '1',
        name: 'Dr. Sarah Johnson',
        title: 'Career Development Coach',
        bio: 'Experienced career coach with over 10 years of helping students navigate their professional journeys. Specializes in resume building and interview preparation.',
        rating: 4.9,
        reviewCount: 124,
        availableSessions: 8,
        expertise: ['Career Planning', 'Resume Building', 'Interview Skills'],
        imageUrl: null
    },
    {
        id: '2',
        name: 'Professor Michael Chen',
        title: 'Academic Excellence Coach',
        bio: 'Mathematics professor with a passion for helping students achieve academic success. Focuses on developing study strategies and building confidence in technical subjects.',
        rating: 4.7,
        reviewCount: 98,
        availableSessions: 5,
        expertise: ['Study Skills', 'Math & Science', 'Test Preparation'],
        imageUrl: null
    },
    {
        id: '3',
        name: 'Maria Rodriguez, PhD',
        title: 'Research & Thesis Coach',
        bio: 'Doctoral advisor with expertise in guiding students through research projects and thesis writing. Specializes in methodology and academic writing.',
        rating: 4.8,
        reviewCount: 87,
        availableSessions: 3,
        expertise: ['Research Methods', 'Academic Writing', 'Thesis Development'],
        imageUrl: null
    },
    {
        id: '4',
        name: 'James Wilson',
        title: 'Tech Industry Coach',
        bio: 'Former tech executive helping students break into the tech industry. Provides guidance on portfolio development, networking, and tech interviews.',
        rating: 4.6,
        reviewCount: 76,
        availableSessions: 10,
        expertise: ['Tech Careers', 'Portfolio Development', 'Technical Interviews'],
        imageUrl: null
    },
    {
        id: '5',
        name: 'Dr. Emily Park',
        title: 'Graduate School Coach',
        bio: 'Admissions expert specializing in graduate school applications. Helps students navigate the application process and prepare for interviews.',
        rating: 4.9,
        reviewCount: 112,
        availableSessions: 6,
        expertise: ['Grad School Applications', 'Personal Statements', 'Admissions Interviews'],
        imageUrl: null
    },
    {
        id: '6',
        name: 'Robert Taylor',
        title: 'Leadership Development Coach',
        bio: 'Leadership trainer with background in organizational psychology. Focuses on developing leadership skills and emotional intelligence in future professionals.',
        rating: 4.7,
        reviewCount: 91,
        availableSessions: 4,
        expertise: ['Leadership Skills', 'Team Building', 'Emotional Intelligence'],
        imageUrl: null
    }
];

const BrowseCoachesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterExpertise, setFilterExpertise] = useState<string | null>(null);

    // Filter coaches based on search and expertise filter
    const filteredCoaches = mockCoaches.filter(coach => {
        const matchesSearch = searchTerm === '' ||
            coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coach.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coach.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesExpertise = filterExpertise === null ||
            coach.expertise.some(exp => exp === filterExpertise);

        return matchesSearch && matchesExpertise;
    });

    // Get unique expertise areas for filter dropdown
    const expertiseAreas = Array.from(new Set(
        mockCoaches.flatMap(coach => coach.expertise)
    )).sort();

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Find a Coach</h1>
                    <p className="text-gray-400">Browse our expert coaches and book a session</p>
                </div>

                {/* Search and filters */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search coaches..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter size={18} className="text-gray-400" />
                        </div>
                        <select
                            className="w-full sm:w-auto pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
                            value={filterExpertise || ''}
                            onChange={(e) => setFilterExpertise(e.target.value === '' ? null : e.target.value)}
                        >
                            <option value="">All Expertise</option>
                            {expertiseAreas.map(area => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coaches grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoaches.map(coach => (
                    <div key={coach.id} className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden transition-all hover:border-blue-600/50 hover:shadow-blue-900/10">
                        <div className="p-6 space-y-4">
                            {/* Coach header */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                    <User size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">{coach.name}</h3>
                                    <p className="text-blue-400 text-sm">{coach.title}</p>
                                </div>
                            </div>

                            {/* Coach bio */}
                            <p className="text-gray-300 text-sm line-clamp-3">{coach.bio}</p>

                            {/* Coach expertise */}
                            <div className="flex flex-wrap gap-2">
                                {coach.expertise.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Coach stats */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                <div className="flex items-center gap-1 text-gray-300">
                                    <Star size={16} className="text-yellow-500" />
                                    <span>{coach.rating}</span>
                                    <span className="text-gray-500 text-sm">({coach.reviewCount})</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-300">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>{coach.availableSessions} available sessions</span>
                                </div>
                            </div>

                            {/* Call to action */}
                            <Link
                                to={`/student/book/${coach.id}`}
                                className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4"
                            >
                                Book a Session
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredCoaches.length === 0 && (
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center">
                    <BookOpen size={48} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No coaches found</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        We couldn't find any coaches matching your search criteria. Try adjusting your filters or search terms.
                    </p>
                </div>
            )}
        </div>
    );
};

export default BrowseCoachesPage; 