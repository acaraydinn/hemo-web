'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { authAPI } from '@/lib/api';

function OTPVerificationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phone = searchParams.get('phone') || '';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const code = otp.join('');
        if (code.length !== 6) {
            setError('Lütfen 6 haneli kodu girin.');
            return;
        }

        setIsLoading(true);

        try {
            const { error: apiError } = await authAPI.verifyOTP(phone, code);

            if (apiError) {
                setError(apiError);
                setIsLoading(false);
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/giris');
            }, 2000);
        } catch {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} className="text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Doğrulama Başarılı!</h1>
                    <p className="text-gray-600">Giriş sayfasına yönlendiriliyorsunuz...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Link
                    href="/kayit"
                    className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8 transition-colors"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Geri Dön
                </Link>

                <div className="flex items-center space-x-3 mb-8">
                    <Image src="/logo.jpg" alt="Hemo Logo" width={50} height={50} className="rounded-xl" />
                    <span className="text-2xl font-bold text-gray-900">HEMO</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">E-posta Doğrulama</h1>
                <p className="text-gray-600 mb-8">
                    E-posta adresinize gönderilen 6 haneli doğrulama kodunu girin.
                </p>

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

                    {/* OTP Inputs */}
                    <div className="flex gap-3 justify-center">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Doğrulanıyor...</span>
                            </>
                        ) : (
                            <span>Doğrula</span>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Kod gelmedi mi?{' '}
                    <button className="text-red-600 font-medium hover:underline">
                        Tekrar Gönder
                    </button>
                </p>
            </motion.div>
        </div>
    );
}

export default function OTPVerificationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <OTPVerificationContent />
        </Suspense>
    );
}
