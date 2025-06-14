import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Check, X } from 'lucide-react';

const CoachAvailabilityPage: React.FC = () => {
    // State for current month/year
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [selectedSlots, setSelectedSlots] = useState<Record<string, Set<string>>>({});
    const [viewMode, setViewMode] = useState<'month' | 'day'>('month');

    // Generate calendar days for the current month
    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // First day of the month
        const firstDayOfMonth = new Date(year, month, 1);
        // Last day of the month
        const lastDayOfMonth = new Date(year, month + 1, 0);

        // Get the day of the week for the first day (0-6, 0 is Sunday)
        const firstDayWeekday = firstDayOfMonth.getDay();

        // Total days in the month
        const daysInMonth = lastDayOfMonth.getDate();

        // Create array to hold all calendar days (including padding days)
        const calendarDays = [];

        // Add empty days to fill the first row until the first day of month
        for (let i = 0; i < firstDayWeekday; i++) {
            calendarDays.push({ date: null, isCurrentMonth: false, isToday: false });
        }

        // Add actual days of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === today.toDateString();
            calendarDays.push({
                date,
                isCurrentMonth: true,
                isToday
            });
        }

        // Fill remaining cells to complete the grid (optional)
        const totalCells = Math.ceil((firstDayWeekday + daysInMonth) / 7) * 7;
        const remainingCells = totalCells - calendarDays.length;

        for (let i = 0; i < remainingCells; i++) {
            calendarDays.push({ date: null, isCurrentMonth: false, isToday: false });
        }

        return calendarDays;
    };

    // Generate time slots from 8 AM to 8 PM in hourly intervals
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 8; hour <= 20; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            const displayTime = hour < 12 ?
                `${hour} AM` :
                `${hour === 12 ? 12 : hour - 12} ${hour >= 12 ? 'PM' : 'AM'}`;
            slots.push({ time, displayTime, hour });
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();
    const calendarDays = generateCalendarDays();

    // Navigation functions for month view
    const previousMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
        setSelectedDay(null);
        setViewMode('month');
    };

    const nextMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
        setSelectedDay(null);
        setViewMode('month');
    };

    // Navigation functions for day view
    const previousDay = () => {
        if (!selectedDay) return;

        const newDate = new Date(selectedDay);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDay(newDate);
    };

    const nextDay = () => {
        if (!selectedDay) return;

        const newDate = new Date(selectedDay);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDay(newDate);
    };

    // Format date for display
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    // Format day date for display
    const formatDayDate = (date: Date) => {
        return {
            weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
            date: date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })
        };
    };

    // Handle day selection
    const handleDayClick = (day: Date | null) => {
        if (!day) return;
        setSelectedDay(day);
        setViewMode('day');
    };

    // Format day date for key in selectedSlots
    const formatDayKey = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    // Get appointment for a specific hour (mocked for now)
    const getAppointmentForHour = (date: Date, hour: number) => {
        // Mock appointment data - in a real app, this would come from your backend
        if (!selectedDay) return null;

        // Check if this hour is marked as available
        const dayKey = formatDayKey(date);
        const timeKey = `${hour.toString().padStart(2, '0')}:00`;

        if (selectedSlots[dayKey] && selectedSlots[dayKey].has(timeKey)) {
            return {
                title: "Available",
                startTime: `${hour.toString().padStart(2, '0')}:00`,
                endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
                isAvailable: true
            };
        }

        return null;
    };

    // Toggle time slot selection
    const toggleTimeSlot = (hour: number) => {
        if (!selectedDay) return;

        const dayKey = formatDayKey(selectedDay);
        const timeKey = `${hour.toString().padStart(2, '0')}:00`;

        setSelectedSlots(prev => {
            const newSlots = { ...prev };

            if (!newSlots[dayKey]) {
                newSlots[dayKey] = new Set();
            }

            const daySlots = new Set(newSlots[dayKey]);

            if (daySlots.has(timeKey)) {
                daySlots.delete(timeKey);
            } else {
                daySlots.add(timeKey);
            }

            newSlots[dayKey] = daySlots;
            return newSlots;
        });
    };

    // Back to month view
    const backToMonthView = () => {
        setViewMode('month');
    };

    // Return to today
    const goToToday = () => {
        const today = new Date();
        setSelectedDay(today);
    };

    // Get summary of availability for a day
    const getDayAvailabilitySummary = (date: Date) => {
        if (!date) return null;

        const dayKey = formatDayKey(date);
        if (!selectedSlots[dayKey] || selectedSlots[dayKey].size === 0) return null;

        const slots = Array.from(selectedSlots[dayKey]);

        if (slots.length === 0) return null;

        // Just show "Available" instead of specific times for now
        return "Available";
    };

    // Check if hour is the current hour
    const isCurrentHour = (hour: number) => {
        const now = new Date();
        return now.getHours() === hour;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Calendar</h1>
            </div>

            {viewMode === 'month' ? (
                /* Month view */
                <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                    {/* Month navigation */}
                    <div className="flex items-center justify-between px-6 py-4 bg-gray-800/50">
                        <button
                            onClick={previousMonth}
                            className="p-2 rounded-full bg-gray-700/70 hover:bg-gray-600/70 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h3 className="text-xl font-semibold">{formatDate(currentDate)}</h3>
                        <button
                            onClick={nextMonth}
                            className="p-2 rounded-full bg-gray-700/70 hover:bg-gray-600/70 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 text-center border-b border-gray-800">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                            <div key={index} className="py-3 text-gray-300 font-medium border-r border-gray-800 last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7">
                        {calendarDays.map((day, index) => (
                            <div
                                key={index}
                                onClick={() => day.date && handleDayClick(day.date)}
                                className={`
                                    min-h-24 border-r border-b border-gray-800 last:border-r-0 
                                    ${day.isCurrentMonth ? 'cursor-pointer hover:bg-gray-800/50' : 'bg-gray-950 cursor-default'}
                                    ${day.isToday ? 'bg-gray-800/70' : ''}
                                    ${day.date && selectedDay && day.date.toDateString() === selectedDay.toDateString() ? 'bg-gray-700' : ''}
                                    relative overflow-hidden
                                `}
                            >
                                {day.date && (
                                    <>
                                        <div className="p-2">
                                            <span className="text-lg font-medium">
                                                {day.date.getDate()}
                                            </span>
                                        </div>

                                        {/* Availability indicator at bottom of cell */}
                                        {getDayAvailabilitySummary(day.date) && (
                                            <div className="absolute bottom-0 left-0 right-0 p-1">
                                                <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded text-center overflow-hidden whitespace-nowrap text-ellipsis">
                                                    {getDayAvailabilitySummary(day.date)}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* Day view */
                <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                    {/* Day navigation */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-800/50">
                        <button
                            onClick={previousDay}
                            className="p-2 rounded-full bg-gray-700/70 hover:bg-gray-600/70 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">
                                {selectedDay && formatDayDate(selectedDay).weekday}
                            </h3>
                            <p className="text-gray-400">
                                {selectedDay && formatDayDate(selectedDay).date}
                            </p>
                        </div>
                        <button
                            onClick={nextDay}
                            className="p-2 rounded-full bg-gray-700/70 hover:bg-gray-600/70 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-center py-3 border-b border-gray-800 gap-2">
                        <button
                            onClick={goToToday}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
                        >
                            Today
                        </button>
                        <button
                            onClick={backToMonthView}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
                        >
                            Back to Month
                        </button>
                    </div>

                    {/* Day schedule */}
                    <div className="relative">
                        {timeSlots.map((slot, index) => {
                            const appointment = selectedDay ? getAppointmentForHour(selectedDay, slot.hour) : null;
                            return (
                                <div key={index} className="flex border-b border-gray-800 last:border-b-0 relative">
                                    {/* Time label on the left */}
                                    <div className="w-20 py-6 pr-4 text-right text-gray-400 text-sm font-medium border-r border-gray-800">
                                        {slot.displayTime}
                                    </div>

                                    {/* Time slot block - clickable to toggle availability */}
                                    <div
                                        className={`flex-1 h-20 relative ${isCurrentHour(slot.hour) ? 'bg-gray-800/50' : ''}`}
                                        onClick={() => toggleTimeSlot(slot.hour)}
                                    >
                                        {/* If there's an appointment or availability for this hour */}
                                        {appointment && (
                                            <div
                                                className={`absolute inset-0 m-1 rounded flex items-center px-3
                                                    ${appointment.isAvailable
                                                        ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700'
                                                        : 'bg-blue-600 text-white'
                                                    }`}
                                            >
                                                <div>
                                                    <div className="font-medium">{appointment.title}</div>
                                                    <div className="text-xs opacity-90">{appointment.startTime} - {appointment.endTime}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoachAvailabilityPage; 