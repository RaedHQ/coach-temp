import React from 'react';
import PageLayout from '../../../components/PageLayout';
import Card from '../../../components/Card';
import { Users, UserCheck, School, BarChart2, AlertTriangle, Briefcase } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
    return (
        <PageLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-gray-400">Platform overview and management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="flex items-center">
                    <div className="p-3 rounded-full bg-primary-500/10 mr-4">
                        <Users className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Total Users</p>
                        <p className="text-2xl font-semibold">2,458</p>
                        <p className="text-xs text-green-500">+18% from last month</p>
                    </div>
                </Card>

                <Card className="flex items-center">
                    <div className="p-3 rounded-full bg-green-500/10 mr-4">
                        <UserCheck className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Active Coaches</p>
                        <p className="text-2xl font-semibold">64</p>
                        <p className="text-xs text-green-500">+3 this week</p>
                    </div>
                </Card>

                <Card className="flex items-center">
                    <div className="p-3 rounded-full bg-amber-500/10 mr-4">
                        <School className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Partner Universities</p>
                        <p className="text-2xl font-semibold">18</p>
                        <p className="text-xs text-green-500">+2 this quarter</p>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                <Card className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Platform Usage</h2>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-lg text-sm">Weekly</button>
                            <button className="px-3 py-1 bg-background-dark text-gray-400 rounded-lg text-sm">Monthly</button>
                            <button className="px-3 py-1 bg-background-dark text-gray-400 rounded-lg text-sm">Yearly</button>
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between px-2">
                        {[40, 55, 75, 81, 68, 62, 50].map((value, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className="w-12 bg-primary-500 rounded-t-sm opacity-80 hover:opacity-100 transition-all"
                                    style={{ height: `${value * 0.6}%` }}
                                ></div>
                                <span className="text-xs text-gray-400 mt-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">System Alerts</h2>
                        <button className="text-primary-500 hover:text-primary-400 text-sm">View All</button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { message: 'Server load high (85%)', time: '10 minutes ago', type: 'warning', icon: AlertTriangle, color: 'text-amber-500' },
                            { message: 'Database backup completed', time: '2 hours ago', type: 'success', icon: Briefcase, color: 'text-green-500' },
                            { message: 'New version deployed (v2.4.0)', time: '1 day ago', type: 'info', icon: Briefcase, color: 'text-primary-500' },
                            { message: 'Storage space low (15% left)', time: '2 days ago', type: 'warning', icon: AlertTriangle, color: 'text-amber-500' }
                        ].map((alert, index) => (
                            <div key={index} className="p-4 bg-background-dark rounded-lg flex items-start">
                                <div className={`p-2 rounded-lg ${alert.color.replace('text-', 'bg-')}/10 mr-3`}>
                                    <alert.icon className={`h-5 w-5 ${alert.color}`} />
                                </div>
                                <div>
                                    <h3 className="font-medium">{alert.message}</h3>
                                    <p className="text-gray-400 text-sm">{alert.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Recent User Registrations</h2>
                    <button className="text-primary-500 hover:text-primary-400 text-sm">View All Users</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">University</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date Joined</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Alex Johnson', email: 'alex@example.com', role: 'Student', university: 'MIT', date: '2023-08-15', status: 'Active' },
                                { name: 'Emily Parker', email: 'emily@example.com', role: 'Student', university: 'Stanford', date: '2023-08-14', status: 'Active' },
                                { name: 'Dr. Richard Wilson', email: 'richard@example.com', role: 'Coach', university: 'Harvard', date: '2023-08-12', status: 'Pending' },
                                { name: 'Sarah Williams', email: 'sarah@example.com', role: 'Student', university: 'UCLA', date: '2023-08-10', status: 'Active' },
                                { name: 'Prof. James Smith', email: 'james@example.com', role: 'Coach', university: 'Princeton', date: '2023-08-08', status: 'Active' }
                            ].map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-background-dark' : ''}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'Student' ? 'bg-primary-500/10 text-primary-500' : 'bg-purple-500/10 text-purple-500'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{user.university}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{user.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </PageLayout>
    );
};

export default AdminDashboardPage; 