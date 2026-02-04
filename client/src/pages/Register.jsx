import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, X, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [strength, setStrength] = useState({ score: 0, label: '', color: 'bg-slate-200' });
    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!password) {
            setStrength({ score: 0, label: '', color: 'bg-slate-200' });
            return;
        }

        let score = 0;
        if (password.length > 5) score += 1;
        if (password.length > 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        if (score <= 2) setStrength({ score: 1, label: 'Weak', color: 'bg-red-500' });
        else if (score <= 4) setStrength({ score: 2, label: 'Medium', color: 'bg-yellow-500' });
        else setStrength({ score: 3, label: 'Strong', color: 'bg-emerald-500' });

    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-300">
            <div className="card w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-300">
                <div className="text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Create Account
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Start tracking your expenses today</p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-3 rounded-lg text-sm text-center flex items-center justify-center gap-2 animate-pulse">
                        <X size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="input w-full bg-slate-50 dark:bg-slate-800/50"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>
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

                    {/* Password Field with Strength */}
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
                        {/* Password Strength Indicator */}
                        {password && (
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={clsx("h-full transition-all duration-300", strength.color)}
                                        style={{ width: `${(strength.score / 3) * 100}%` }}
                                    ></div>
                                </div>
                                <span className={clsx("text-xs font-medium uppercase", strength.color.replace('bg-', 'text-'))}>
                                    {strength.label}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password with Validation */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                className={clsx(
                                    "input w-full bg-slate-50 dark:bg-slate-800/50 pr-10 transition-colors",
                                    confirmPassword && (password === confirmPassword
                                        ? "border-green-500 focus:ring-green-500/20"
                                        : "border-red-500 focus:ring-red-500/20")
                                )}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                            {confirmPassword && (
                                <div className={clsx(
                                    "absolute right-3 top-1/2 -translate-y-1/2 transition-colors",
                                    password === confirmPassword ? "text-green-500" : "text-red-500"
                                )}>
                                    {password === confirmPassword ? <Check size={18} /> : <X size={18} />}
                                </div>
                            )}
                        </div>
                        {confirmPassword && (
                            <p className={clsx("text-xs mt-1 ml-1 transition-colors", password === confirmPassword ? "text-green-600 dark:text-green-400" : "text-red-500")}>
                                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
                            </p>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-full shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 active:scale-[0.98] transition-all mt-2">
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-sky-600 font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
