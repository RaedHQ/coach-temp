import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Calendar, Clock, User } from 'lucide-react';

const CoachLayout: React.FC = () => {
    const location = useLocation();

    const navigationItems = [
        {
            path: '/coach/dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard
        },
        {
            path: '/coach/availability',
            label: 'Availability',
            icon: Clock
        },
        {
            path: '/coach/appointments',
            label: 'Appointments',
            icon: Calendar
        },
        {
            path: '/coach/profile',
            label: 'Profile',
            icon: User
        }
    ];

    const isActivePath = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen flex bg-background-main">
            {/* Sidebar */}
            <div className="w-64 bg-background-card border-r border-gray-800 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <Link to="/" className="flex items-center space-x-2 text-primary-500">
                        <GraduationCap size={28} />
                        <span className="text-xl font-semibold">EduConnect</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6">
                    <div className="space-y-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActivePath(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* User Info */}
                <div className="p-6 border-t border-gray-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-500/10 rounded-full flex items-center justify-center">
                            <User size={20} className="text-primary-500" />
                        </div>
                        <div>
                            <p className="font-medium text-white">Professor Williams</p>
                            <p className="text-sm text-gray-400">Coach</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-background-card border-b border-gray-800 px-8 py-6">
                    <h1 className="text-2xl font-bold text-white">Coach Dashboard</h1>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default CoachLayout; 