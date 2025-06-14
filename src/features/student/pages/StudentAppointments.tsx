import React, { useState } from 'react';
import { Calendar, Clock, User, X, CheckCircle, AlertTriangle } from 'lucide-react';

// Define the Appointment type
type Appointment = {
    id: string;
    coachName: string;
    coachTitle: string;
    date: string;
    time: string;
    duration: string;
    topic: string;
    status: 'upcoming' | 'completed' | 'cancelled';
};

// Mock appointment data
const initialAppointments: Appointment[] = [
    {
        id: '1',
        coachName: 'Dr. Sarah Johnson',
        coachTitle: 'Career Development Coach',
        date: '2023-06-15',
        time: '10:00 AM',
        duration: '1 hour',
        topic: 'Resume Review',
        status: 'upcoming'
    },
    {
        id: '2',
        coachName: 'Professor Michael Chen',
        coachTitle: 'Academic Excellence Coach',
        date: '2023-06-18',
        time: '2:30 PM',
        duration: '45 minutes',
        topic: 'Study Strategy Session',
        status: 'upcoming'
    },
    {
        id: '3',
        coachName: 'Maria Rodriguez, PhD',
        coachTitle: 'Research & Thesis Coach',
        date: '2023-05-30',
        time: '11:00 AM',
        duration: '1 hour',
        topic: 'Research Methodology',
        status: 'completed'
    },
    {
        id: '4',
        coachName: 'James Wilson',
        coachTitle: 'Tech Industry Coach',
        date: '2023-05-25',
        time: '3:00 PM',
        duration: '30 minutes',
        topic: 'Technical Interview Prep',
        status: 'completed'
    },
    {
        id: '5',
        coachName: 'Dr. Emily Park',
        coachTitle: 'Graduate School Coach',
        date: '2023-06-22',
        time: '1:00 PM',
        duration: '1 hour',
        topic: 'Graduate School Applications',
        status: 'upcoming'
    }
];

const StudentAppointmentsPage: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');

    // Format date to display in a more readable format
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Handle cancel button click
    const handleCancelClick = (appointmentId: string) => {
        setAppointmentToCancel(appointmentId);
        setShowCancelModal(true);
    };

    // Confirm cancellation
    const confirmCancellation = () => {
        if (appointmentToCancel) {
            setAppointments(appointments.map(appointment =>
                appointment.id === appointmentToCancel
                    ? { ...appointment, status: 'cancelled' as const }
                    : appointment
            ));
            setShowCancelModal(false);
            setAppointmentToCancel(null);
        }
    };

    // Filter appointments based on active tab
    const filteredAppointments = appointments.filter(appointment => {
        if (activeTab === 'all') return true;
        return appointment.status === activeTab;
    });

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">My Appointments</h1>
                <p className="text-gray-400 mt-1">View and manage your upcoming coaching sessions.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800 mb-6">
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'all'
                        ? 'text-blue-500 border-b-2 border-blue-500'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    onClick={() => setActiveTab('all')}
                >
                    All Sessions
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'upcoming'
                        ? 'text-blue-500 border-b-2 border-blue-500'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'completed'
                        ? 'text-blue-500 border-b-2 border-blue-500'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    onClick={() => setActiveTab('completed')}
                >
                    Completed
                </button>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map(appointment => (
                        <div
                            key={appointment.id}
                            className="bg-gray-900 rounded-xl border border-gray-800 p-6 transition-all hover:border-blue-600/30"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                {/* Coach Info */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{appointment.coachName}</h3>
                                        <p className="text-gray-400 text-sm">{appointment.coachTitle}</p>
                                        <div className="mt-2">
                                            <span className="text-sm font-medium">{appointment.topic}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Date and Time */}
                                <div className="flex flex-col items-start md:items-center gap-1 md:min-w-[180px]">
                                    <div className="flex items-center text-gray-300">
                                        <Calendar size={16} className="mr-2 text-gray-400" />
                                        <span>{formatDate(appointment.date)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Clock size={16} className="mr-2 text-gray-400" />
                                        <span>{appointment.time} • {appointment.duration}</span>
                                    </div>
                                </div>

                                {/* Status and Actions */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        {appointment.status === 'upcoming' && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400">
                                                <Clock size={14} className="mr-1" />
                                                Upcoming
                                            </span>
                                        )}
                                        {appointment.status === 'completed' && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-400">
                                                <CheckCircle size={14} className="mr-1" />
                                                Completed
                                            </span>
                                        )}
                                        {appointment.status === 'cancelled' && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900/50 text-red-400">
                                                <X size={14} className="mr-1" />
                                                Cancelled
                                            </span>
                                        )}
                                    </div>
                                    {appointment.status === 'upcoming' && (
                                        <button
                                            onClick={() => handleCancelClick(appointment.id)}
                                            className="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center">
                        <AlertTriangle size={40} className="mx-auto text-gray-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No appointments found</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            You don't have any {activeTab !== 'all' ? activeTab : ''} appointments at the moment.
                        </p>
                    </div>
                )}
            </div>

            {/* Cancellation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-70"
                        onClick={() => setShowCancelModal(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md relative z-10">
                        <h3 className="text-xl font-bold mb-4">Cancel Appointment</h3>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Keep Appointment
                            </button>
                            <button
                                onClick={confirmCancellation}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentAppointmentsPage; 