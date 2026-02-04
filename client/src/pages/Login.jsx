import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotView, setIsForgotView] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleForgotSubmit = (e) => {
        e.preventDefault();
        // Mock API call
        setTimeout(() => {
            setResetSent(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-300">
            <div className="card w-full max-w-md space-y-8 relative overflow-hidden">

                {/* Header */}
                <div className="text-center relative z-10">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transform transition-all duration-500">
                        {isForgotView ? 'Reset Password' : 'Welcome Back'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 transition-opacity duration-300">
                        {isForgotView
                            ? 'Enter your email to receive a reset link'
                            : 'Sign in to manage your budget'}
                    </p>
                </div>

                {error && !isForgotView && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-3 rounded-lg text-sm text-center animate-shake">
                        {error}
                    </div>
                )}

                {/* Normal Login Form */}
                {!isForgotView && (
                    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email</label>
                            <input
                                type="email"
                                required
                                className="input w-full bg-slate-50 dark:bg-slate-800/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="student@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="input w-full bg-slate-50 dark:bg-slate-800/50 pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={() => { setIsForgotView(true); setError(''); }}
                                    className="text-sm text-primary hover:text-sky-600 font-medium hover:underline transition-all"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 active:scale-[0.98] transition-all">
                            Sign In
                        </button>
                    </form>
                )}

                {/* Forgot Password View */}
                {isForgotView && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-500">
                        {resetSent ? (
                            <div className="text-center py-8 space-y-4 animate-in zoom-in duration-300">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-green-50 dark:ring-green-900/10">
                                    <Mail size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Check your email</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-sm">
                                    We have sent a password reset link to <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span>
                                </p>
                                <button
                                    onClick={() => { setIsForgotView(false); setResetSent(false); }}
                                    className="btn btn-secondary w-full mt-4"
                                >
                                    Back to Login
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleForgotSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="input w-full bg-slate-50 dark:bg-slate-800/50"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your registered email"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-full shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 active:scale-[0.98] transition-all">
                                    Send Reset Link
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsForgotView(false)}
                                    className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors py-2"
                                >
                                    <ArrowLeft size={16} />
                                    <span>Back to Login</span>
                                </button>
                            </form>
                        )}
                    </div>
                )}

                {!isForgotView && (
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-sky-600 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
