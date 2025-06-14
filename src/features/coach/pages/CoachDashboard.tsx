import React, { useState } from 'react';
import { Calendar, Clock, User, Users, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

// Mock data for the dashboard
const mockAppointments = [
    {
        id: '1',
        studentName: 'Alex Johnson',
        date: '2023-11-15',
        time: '10:00 AM',
        topic: 'Resume Review'
    },
    {
        id: '2',
        studentName: 'Jamie Smith',
        date: '2023-11-16',
        time: '2:30 PM',
        topic: 'Career Guidance'
    },
    {
        id: '3',
        studentName: 'Taylor Wilson',
        date: '2023-11-17',
        time: '11:00 AM',
        topic: 'Interview Prep'
    }
];

// Mock stats data
const mockStats = {
    sessionsThisWeek: 8,
    totalStudents: 15,
    nextSession: {
        time: '10:00 AM',
        date: 'Today'
    },
    completionRate: 92
};

const CoachDashboardPage: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    return (
        <div className="space-y-6">
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-400 mt-1">Welcome back! Here's your coaching overview.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Sessions This Week */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Sessions This Week</p>
                            <h3 className="text-3xl font-bold mt-1">{mockStats.sessionsThisWeek}</h3>
                        </div>
                        <div className="p-3 bg-blue-600/20 text-blue-400 rounded-lg">
                            <Calendar size={20} />
                        </div>
                    </div>
                </div>

                {/* Students Coached */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Students Coached</p>
                            <h3 className="text-3xl font-bold mt-1">{mockStats.totalStudents}</h3>
                        </div>
                        <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-lg">
                            <Users size={20} />
                        </div>
                    </div>
                </div>

                {/* Next Session */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Next Session</p>
                            <h3 className="text-2xl font-bold mt-1">{mockStats.nextSession.time}</h3>
                            <p className="text-gray-400 text-xs mt-1">{mockStats.nextSession.date}</p>
                        </div>
                        <div className="p-3 bg-green-600/20 text-green-400 rounded-lg">
                            <Clock size={20} />
                        </div>
                    </div>
                </div>

                {/* Completion Rate */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Completion Rate</p>
                            <h3 className="text-3xl font-bold mt-1">{mockStats.completionRate}%</h3>
                        </div>
                        <div className="p-3 bg-purple-600/20 text-purple-400 rounded-lg">
                            <CheckCircle size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-6">
                {/* Upcoming Appointments */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-800">
                        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
                    </div>
                    <div className="divide-y divide-gray-800">
                        {mockAppointments.slice(0, 3).map((appointment) => (
                            <div key={appointment.id} className="p-6 hover:bg-gray-800/50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{appointment.studentName}</h3>
                                            <p className="text-gray-400 text-sm">{appointment.topic}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-gray-300">
                                            <Calendar size={14} className="text-gray-400" />
                                            <span className="text-sm">{appointment.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-300 mt-1">
                                            <Clock size={14} className="text-gray-400" />
                                            <span className="text-sm">{appointment.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-800/50 text-center">
                        <a href="/coach/appointments" className="text-blue-400 text-sm hover:text-blue-300">View All Appointments</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachDashboardPage; 