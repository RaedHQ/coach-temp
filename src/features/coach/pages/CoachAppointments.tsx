import React, { useState } from 'react';
import { Trash2, Mail, FileText, Calendar, Clock, User, AtSign, ExternalLink, X } from 'lucide-react';

// Mock data for appointments
const mockAppointments = [
    {
        id: '1',
        studentName: 'Alex Johnson',
        studentEmail: 'alex.johnson@example.com',
        cvFile: 'alex_johnson_resume.pdf',
        date: '2023-11-15',
        time: '10:00 AM',
        notes: 'Interested in software engineering opportunities'
    },
    {
        id: '2',
        studentName: 'Jamie Smith',
        studentEmail: 'jamie.smith@example.com',
        cvFile: 'jamie_smith_cv.pdf',
        date: '2023-11-16',
        time: '2:30 PM',
        notes: 'Looking for career change advice'
    },
    {
        id: '3',
        studentName: 'Taylor Wilson',
        studentEmail: 'taylor.wilson@example.com',
        cvFile: 'taylor_wilson_resume.docx',
        date: '2023-11-17',
        time: '11:00 AM',
        notes: 'Preparing for upcoming interview'
    },
    {
        id: '4',
        studentName: 'Morgan Lee',
        studentEmail: 'morgan.lee@example.com',
        cvFile: 'morgan_lee_cv.pdf',
        date: '2023-11-18',
        time: '3:00 PM',
        notes: 'Resume review and career guidance'
    }
];

const CoachAppointmentsPage: React.FC = () => {
    const [appointments, setAppointments] = useState(mockAppointments);
    const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState<string | null>(null);

    // Handle delete appointment
    const handleDeleteAppointment = (id: string) => {
        if (showConfirmDelete === id) {
            setAppointments(appointments.filter(appointment => appointment.id !== id));
            setShowConfirmDelete(null);
        } else {
            setShowConfirmDelete(id);
        }
    };

    // Handle send email
    const handleSendEmail = (id: string, email: string, studentName: string) => {
        // Create mailto link with prefilled subject and open it
        const subject = `Regarding your upcoming coaching session`;
        const body = `Hello ${studentName},\n\nI wanted to reach out regarding your upcoming coaching session.\n\n`;

        // Encode the subject and body for use in mailto URL
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the email client
        window.open(mailtoLink, '_blank');

        // Show notification
        setEmailSent(id);

        // Reset notification after 3 seconds
        setTimeout(() => {
            setEmailSent(null);
        }, 3000);
    };

    // Cancel delete
    const cancelDelete = () => {
        setShowConfirmDelete(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Appointments</h1>
                <div className="text-sm text-gray-400">
                    {appointments.length} upcoming appointments
                </div>
            </div>

            {appointments.length === 0 ? (
                <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800 shadow-lg">
                    <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Appointments Scheduled</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        You don't have any upcoming appointments. When students book sessions with you, they'll appear here.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg"
                        >
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between">
                                    <h3 className="text-xl font-semibold flex items-center gap-2">
                                        <User size={18} className="text-blue-400" />
                                        {appointment.studentName}
                                    </h3>
                                    <div className="flex gap-2">
                                        {showConfirmDelete === appointment.id ? (
                                            <>
                                                <button
                                                    onClick={() => handleDeleteAppointment(appointment.id)}
                                                    className="p-1.5 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
                                                    title="Confirm delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <button
                                                    onClick={cancelDelete}
                                                    className="p-1.5 rounded bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                                                    title="Cancel"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleDeleteAppointment(appointment.id)}
                                                className="p-1.5 rounded bg-gray-700 text-white hover:bg-red-600 transition-colors"
                                                title="Delete appointment"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleSendEmail(appointment.id, appointment.studentEmail, appointment.studentName)}
                                            className="p-1.5 rounded bg-blue-700 text-white hover:bg-blue-600 transition-colors"
                                            title="Send email"
                                        >
                                            <Mail size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar size={16} />
                                        {appointment.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Clock size={16} />
                                        {appointment.time}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <AtSign size={16} />
                                    <a href={`mailto:${appointment.studentEmail}`} className="text-blue-400 hover:text-blue-300">
                                        {appointment.studentEmail}
                                    </a>
                                </div>

                                <div className="flex items-center gap-2 mt-4 border-t border-gray-800 pt-4">
                                    <FileText size={16} className="text-blue-400" />
                                    <a
                                        href={`#/cv/${appointment.cvFile}`}
                                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Resume <ExternalLink size={14} />
                                    </a>
                                </div>

                                {appointment.notes && (
                                    <div className="mt-2 text-sm text-gray-400 italic">
                                        "{appointment.notes}"
                                    </div>
                                )}

                                {emailSent === appointment.id && (
                                    <div className="mt-2 text-xs bg-blue-600/20 text-blue-400 p-2 rounded">
                                        Email sent to {appointment.studentEmail}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoachAppointmentsPage; 