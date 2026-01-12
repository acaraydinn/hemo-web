'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { authUtils } from '@/lib/auth';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { data, error: apiError } = await authAPI.login(
                formData.phone,
                formData.password
            );

            if (apiError) {
                setError(apiError);
                setIsLoading(false);
                return;
            }

            if (data) {
                // Save user to cookies
                authUtils.saveUser({
                    phone: data.phone,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    points: data.points,
                    badge: data.badge,
                });

                // Redirect to panel
                router.push('/panel');
            }
        } catch {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Back to Home */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8 transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Ana Sayfa
                    </Link>

                    {/* Logo */}
                    <div className="flex items-center space-x-3 mb-8">
                        <Image
                            src="/logo.jpg"
                            alt="Hemo Logo"
                            width={50}
                            height={50}
                            className="rounded-xl"
                        />
                        <span className="text-2xl font-bold text-gray-900">HEMO</span>
                    </div>

                    {/* Header */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Giriş Yap</h1>
                    <p className="text-gray-600 mb-8">
                        Hesabınıza giriş yaparak hayat kurtarmaya devam edin.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Telefon Numarası
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                maxLength={11}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                placeholder="05XX XXX XX XX"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Şifre
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Giriş Yapılıyor...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    <span>Giriş Yap</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-8 text-center text-gray-600">
                        Hesabınız yok mu?{' '}
                        <Link href="/kayit" className="text-red-600 font-medium hover:underline">
                            Hemen Kaydol
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Side - Decorative */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-red-500 to-red-700 items-center justify-center p-12 relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-10 right-10 w-64 h-64 border border-white/20 rounded-full" />
                <div className="absolute bottom-20 left-10 w-48 h-48 border border-white/10 rounded-full" />
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl" />

                <div className="text-center text-white relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Image
                            src="/logo.jpg"
                            alt="Hemo"
                            width={150}
                            height={150}
                            className="rounded-3xl shadow-2xl mx-auto mb-8"
                        />
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4">Hayat Kurtaran Bağlantı</h2>
                    <p className="text-white/80 max-w-sm mx-auto">
                        Binlerce kahraman ile birlikte hayat kurtarmaya devam edin.
                    </p>
                </div>
            </div>
        </div>
    );
}
