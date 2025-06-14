import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ChevronRight, Bell, BookOpen, CheckCircle } from 'lucide-react';

// Mock student data
const studentData = {
    name: 'Alex Johnson',
    profileCompleted: 80, // percentage
};

// Mock upcoming appointments
const upcomingAppointments = [
    {
        id: '1',
        coachName: 'Dr. Sarah Johnson',
        coachTitle: 'Career Development Coach',
        date: '2023-06-15',
        time: '10:00 AM',
        topic: 'Resume Review'
    },
    {
        id: '2',
        coachName: 'Professor Michael Chen',
        coachTitle: 'Academic Excellence Coach',
        date: '2023-06-18',
        time: '2:30 PM',
        topic: 'Study Strategy Session'
    },
    {
        id: '5',
        coachName: 'Dr. Emily Park',
        coachTitle: 'Graduate School Coach',
        date: '2023-06-22',
        time: '1:00 PM',
        topic: 'Graduate School Applications'
    }
];

// Format date to display in a more readable format
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const StudentDashboardPage: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {studentData.name}!
                </h1>
                <p className="text-gray-400">
                    Here's an overview of your upcoming sessions and resources.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Upcoming Sessions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-blue-600/20 text-blue-400">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Upcoming Sessions</p>
                                    <h3 className="text-2xl font-semibold">{upcomingAppointments.length}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-green-600/20 text-green-400">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Completed Sessions</p>
                                    <h3 className="text-2xl font-semibold">12</h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-amber-600/20 text-amber-400">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Learning Hours</p>
                                    <h3 className="text-2xl font-semibold">24.5</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Appointments Section */}
                    <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                            <Link to="/student/appointments" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                                View All <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className="divide-y divide-gray-800">
                            {upcomingAppointments.map(appointment => (
                                <div key={appointment.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                            <User size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                                <div>
                                                    <h3 className="font-medium">{appointment.coachName}</h3>
                                                    <p className="text-gray-400 text-sm">{appointment.topic}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <Calendar size={14} className="mr-1" />
                                                        {formatDate(appointment.date)}
                                                    </div>
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <Clock size={14} className="mr-1" />
                                                        {appointment.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {upcomingAppointments.length === 0 && (
                                <div className="p-6 text-center">
                                    <p className="text-gray-400">You don't have any upcoming sessions.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Actions and Reminders */}
                <div className="space-y-6">
                    {/* Browse Coaches Card */}
                    <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl border border-blue-800/30 shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-3">Find Your Coach</h3>
                        <p className="text-gray-300 mb-4">
                            Browse our expert coaches and schedule sessions to boost your academic performance.
                        </p>
                        <Link
                            to="/student/browse-coaches"
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
                        >
                            Browse Coaches
                        </Link>
                    </div>

                    {/* Profile Reminder Card */}
                    <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-amber-600/20 text-amber-400 flex-shrink-0">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Complete Your Profile</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    Your profile is {studentData.profileCompleted}% complete. Add more details to help coaches better understand your needs.
                                </p>
                                <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                                    <div
                                        className="bg-amber-500 h-2 rounded-full"
                                        style={{ width: `${studentData.profileCompleted}%` }}
                                    ></div>
                                </div>
                                <Link
                                    to="/student/profile"
                                    className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1"
                                >
                                    Update Profile <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-800">
                            <h3 className="font-semibold">Quick Actions</h3>
                        </div>
                        <div className="divide-y divide-gray-800">
                            <Link
                                to="/student/browse-coaches"
                                className="flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors"
                            >
                                <User size={18} className="text-blue-400" />
                                <span>Find a Coach</span>
                            </Link>
                            <Link
                                to="/student/appointments"
                                className="flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors"
                            >
                                <Calendar size={18} className="text-green-400" />
                                <span>Manage Appointments</span>
                            </Link>
                            <Link
                                to="/student/profile"
                                className="flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors"
                            >
                                <User size={18} className="text-purple-400" />
                                <span>Edit Profile</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardPage; 