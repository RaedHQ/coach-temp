import React from 'react';
import { useParams } from 'react-router-dom';

const BookCoachPage: React.FC = () => {
    const { coachId } = useParams<{ coachId: string }>();

    return (
        <div className="max-w-3xl mx-auto p-8 mt-8 bg-gray-900 rounded-xl border border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Book a Session</h2>
            <p className="text-gray-400 mb-6">You're booking a session with coach #{coachId}</p>
            <p className="text-gray-400">This page is currently under development.</p>
        </div>
    );
};

export default BookCoachPage; 