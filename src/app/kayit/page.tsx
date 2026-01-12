'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus, ArrowLeft, Check } from 'lucide-react';
import { authAPI, locationAPI, BLOOD_TYPES } from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [cities, setCities] = useState<string[]>([]);
    const [agreements, setAgreements] = useState({
        terms: false,
        privacy: false,
        kvkk: false,
    });

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        city: '',
        blood_type: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        // Fetch cities
        const fetchCities = async () => {
            const { data } = await locationAPI.getCities();
            if (data) setCities(data);
        };
        fetchCities();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validations
        if (!agreements.terms || !agreements.privacy || !agreements.kvkk) {
            setError('Lütfen tüm sözleşmeleri onaylayın.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Şifre en az 6 karakter olmalı.');
            return;
        }

        if (formData.phone.length !== 11) {
            setError('Telefon numarası 11 haneli olmalı.');
            return;
        }

        setIsLoading(true);

        try {
            const { data, error: apiError } = await authAPI.register({
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone: formData.phone,
                email: formData.email,
                city: formData.city,
                blood_type: formData.blood_type,
                password: formData.password,
            });

            if (apiError) {
                setError(apiError);
                setIsLoading(false);
                return;
            }

            if (data) {
                // Redirect to OTP verification
                router.push(`/otp-dogrulama?phone=${formData.phone}`);
            }
        } catch {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Left Side - Decorative */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-red-500 to-red-700 items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute top-10 left-10 w-64 h-64 border border-white/20 rounded-full" />
                <div className="absolute bottom-20 right-10 w-48 h-48 border border-white/10 rounded-full" />

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
                    <h2 className="text-3xl font-bold mb-4">Kahraman Ol</h2>
                    <p className="text-white/80 max-w-sm mx-auto">
                        Hemo ailesine katılarak binlerce hayatı kurtarabilirsiniz.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg py-8"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Ana Sayfa
                    </Link>

                    <div className="flex items-center space-x-3 mb-6 lg:hidden">
                        <Image src="/logo.jpg" alt="Hemo Logo" width={40} height={40} className="rounded-xl" />
                        <span className="text-xl font-bold text-gray-900">HEMO</span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Kayıt Ol</h1>
                    <p className="text-gray-600 mb-6">Hayat kurtarmaya başlamak için bilgilerinizi girin.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                                <input
                                    type="text"
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                    placeholder="Adınız"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                                <input
                                    type="text"
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                    placeholder="Soyadınız"
                                />
                            </div>
                        </div>

                        {/* Contact Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                maxLength={11}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                placeholder="05XX XXX XX XX"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                placeholder="ornek@email.com"
                            />
                            <p className="text-xs text-gray-500 mt-1">Doğrulama kodu bu adrese gönderilecek</p>
                        </div>

                        {/* Location & Blood Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                                <select
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                >
                                    <option value="">Şehir Seçin</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kan Grubu</label>
                                <select
                                    value={formData.blood_type}
                                    onChange={(e) => setFormData({ ...formData, blood_type: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                >
                                    <option value="">Kan Grubu</option>
                                    {BLOOD_TYPES.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all pr-12"
                                        placeholder="Min. 6 karakter"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Şifre Tekrar</label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                    placeholder="••••••"
                                />
                            </div>
                        </div>

                        {/* Agreements */}
                        <div className="space-y-3 pt-2">
                            <label className="flex items-start space-x-3 cursor-pointer">
                                <div
                                    onClick={() => setAgreements({ ...agreements, terms: !agreements.terms })}
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${agreements.terms ? 'bg-red-600 border-red-600' : 'border-gray-300'
                                        }`}
                                >
                                    {agreements.terms && <Check size={14} className="text-white" />}
                                </div>
                                <span className="text-sm text-gray-600">
                                    <a href="/yasal/kullanim-kosullari" target="_blank" className="text-red-600 hover:underline">Kullanım Koşulları</a>&apos;nı okudum ve kabul ediyorum.
                                </span>
                            </label>

                            <label className="flex items-start space-x-3 cursor-pointer">
                                <div
                                    onClick={() => setAgreements({ ...agreements, privacy: !agreements.privacy })}
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${agreements.privacy ? 'bg-red-600 border-red-600' : 'border-gray-300'
                                        }`}
                                >
                                    {agreements.privacy && <Check size={14} className="text-white" />}
                                </div>
                                <span className="text-sm text-gray-600">
                                    <a href="/yasal/gizlilik-politikasi" target="_blank" className="text-red-600 hover:underline">Gizlilik Politikası</a>&apos;nı okudum ve kabul ediyorum.
                                </span>
                            </label>

                            <label className="flex items-start space-x-3 cursor-pointer">
                                <div
                                    onClick={() => setAgreements({ ...agreements, kvkk: !agreements.kvkk })}
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${agreements.kvkk ? 'bg-red-600 border-red-600' : 'border-gray-300'
                                        }`}
                                >
                                    {agreements.kvkk && <Check size={14} className="text-white" />}
                                </div>
                                <span className="text-sm text-gray-600">
                                    <a href="/yasal/kvkk" target="_blank" className="text-red-600 hover:underline">KVKK Aydınlatma Metni</a>&apos;ni okudum ve kabul ediyorum.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Kayıt Yapılıyor...</span>
                                </>
                            ) : (
                                <>
                                    <UserPlus size={20} />
                                    <span>Kayıt Ol</span>
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600">
                        Zaten hesabınız var mı?{' '}
                        <Link href="/giris" className="text-red-600 font-medium hover:underline">
                            Giriş Yap
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
