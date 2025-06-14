import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Users, Calendar, User, Menu, X } from 'lucide-react';

const StudentLayout: React.FC = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigationItems = [
        {
            path: '/student/dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard
        },
        {
            path: '/student/browse-coaches',
            label: 'Browse Coaches',
            icon: Users
        },
        {
            path: '/student/appointments',
            label: 'My Appointments',
            icon: Calendar
        },
        {
            path: '/student/profile',
            label: 'Profile',
            icon: User
        }
    ];

    const isActivePath = (path: string) => {
        return location.pathname === path;
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background-main">
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg bg-gray-800 text-white"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar - Desktop always visible, Mobile as overlay */}
            <div
                className={`${mobileMenuOpen ? 'fixed inset-0 z-40 block' : 'hidden'
                    } md:relative md:block md:w-64 bg-background-card border-r border-gray-800 flex-shrink-0`}
            >
                <div className="flex flex-col h-full">
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
                                        onClick={() => setMobileMenuOpen(false)}
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
                                <p className="font-medium text-white">Alex Johnson</p>
                                <p className="text-sm text-gray-400">Student</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-background-card border-b border-gray-800 px-8 py-6">
                    <h1 className="text-2xl font-bold text-white">Student Portal</h1>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Menu Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default StudentLayout; 