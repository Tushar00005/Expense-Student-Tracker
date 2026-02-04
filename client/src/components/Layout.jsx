import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Receipt,
    PieChart,
    LogOut,
    Menu,
    X,
    Moon,
    Sun
} from 'lucide-react';
import clsx from 'clsx';

const Layout = ({ children }) => {
    const { logout, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        }
    };

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Expenses', path: '/expenses', icon: Receipt },
        { name: 'Analytics', path: '/analytics', icon: PieChart },
    ];

    const NavLink = ({ item, mobile = false }) => (
        <Link
            to={item.path}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
            className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                location.pathname === item.path
                    ? "bg-primary text-white shadow-lg shadow-sky-500/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
        >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
        </Link>
    );

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 text-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ExpenseTracker
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink key={item.path} item={item} />
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <button
                        onClick={toggleTheme}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        <span className="font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span>
                    </button>
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>

                    <div className="px-4 py-2 text-xs text-slate-400 text-center">
                        Logged in as {user?.name}
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ExpenseTracker
                    </h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-slate-600 dark:text-slate-400"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </header>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="absolute inset-0 z-50 bg-white dark:bg-slate-900 p-4 transition-all duration-300 md:hidden flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold dark:text-white">Menu</h2>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="text-slate-600 dark:text-slate-400" />
                            </button>
                        </div>
                        <nav className="space-y-2 flex-1">
                            {navItems.map((item) => (
                                <NavLink key={item.path} item={item} mobile />
                            ))}
                        </nav>
                        <div className="mt-auto space-y-2">
                            <button
                                onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                                className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                                <span className="font-medium">Switch Theme</span>
                            </button>
                            <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50">
                                <LogOut size={20} />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content Scrollable */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
