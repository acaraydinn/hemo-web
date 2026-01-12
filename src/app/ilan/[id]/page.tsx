'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { bloodRequestAPI, donationAPI, BloodRequest } from '@/lib/api';
import { authUtils } from '@/lib/auth';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building2, User, Phone, Share2, Heart, ArrowLeft, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function IlanDetayPage() {
    const params = useParams();
    const router = useRouter();
    const [request, setRequest] = useState<BloodRequest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [donating, setDonating] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [donors, setDonors] = useState<{ donation_id: number; donor_name: string }[]>([]);

    useEffect(() => {
        const fetchRequest = async () => {
            if (!params.id) return;
            try {
                // @ts-ignore - getById added recently
                const { data, error } = await bloodRequestAPI.getById(Number(params.id));
                if (error) {
                    setError('İlan bulunamadı veya kaldırılmış.');
                } else {
                    setRequest(data);
                    // Check ownership
                    const user = authUtils.getUser();
                    if (user && data && user.phone === data.contact_phone) {
                        setIsOwner(true);
                    }
                }
            } catch (err) {
                setError('Bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
    }, [params.id]);

    // Fetch donors if owner
    useEffect(() => {
        if (isOwner && params.id) {
            const fetchDonors = async () => {
                try {
                    // @ts-ignore
                    const { data } = await bloodRequestAPI.getDonors(Number(params.id));
                    if (data) setDonors(data);
                } catch (e) {
                    console.log('Error fetching donors:', e);
                }
            };
            fetchDonors();
        }
    }, [isOwner, params.id]);

    const handleApprove = async (donationId: number) => {
        try {
            const { error } = await donationAPI.approve(donationId);
            if (error) {
                toast.error(error);
            } else {
                toast.success('Bağış onaylandı! Kahramana puan verildi. 🎉');
                // Remove from list
                setDonors(prev => prev.filter(d => d.donation_id !== donationId));
            }
        } catch (err) {
            toast.error('İşlem başarısız.');
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Acil Kan İhtiyacı',
                    text: `${request?.city} - ${request?.hospital} için ${request?.blood_type} kan aranıyor! #Hemo`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link kopyalandı!');
        }
    };

    const handleDonate = async () => {
        const user = authUtils.getUser();
        if (!user) {
            // Redirect to login with return url
            toast.error('Bağış yapmak için giriş yapmalısınız.');
            router.push(`/giris?returnUrl=/ilan/${params.id}`);
            return;
        }

        setDonating(true);
        try {
            const { error: apiError } = await donationAPI.create(user.phone, Number(params.id));
            if (apiError) {
                toast.error(apiError);
            } else {
                toast.success('Bağış talebiniz iletildi! Teşekkürler kahraman!');
                // Wait a bit then refresh or redirect
                setTimeout(() => router.push('/panel'), 2000);
            }
        } catch (err) {
            toast.error('İşlem başarısız.');
        } finally {
            setDonating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error || !request) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <div className="bg-red-50 p-4 rounded-full inline-flex mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{error || 'İlan bulunamadı'}</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="text-red-600 font-medium hover:text-red-700 underline"
                    >
                        Ana Sayfaya Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-12 pt-24">
            <Toaster position="top-center" />

            <div className="container-custom max-w-4xl mx-auto">
                {/* Header / Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 mb-6 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-1" />
                    Geri Dön
                </button>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                >
                    <div className="md:flex">
                        {/* Left Side: Critical Info */}
                        <div className="md:w-2/5 bg-gradient-to-br from-red-600 to-red-700 p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opacity-10"></div>

                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg"
                            >
                                <span className="text-4xl font-black text-red-600">{request.blood_type}</span>
                            </motion.div>

                            <h2 className="text-2xl font-bold mb-2">ACİL KAN ARANIYOR</h2>
                            <p className="text-white/80 font-medium">{request.city} / {request.district}</p>
                        </div>

                        {/* Right Side: Details */}
                        <div className="md:w-3/5 p-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="mr-2">🩸</span>
                                {request.hospital}
                            </h1>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start">
                                    <User className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Hasta Adı Soyadı</p>
                                        <p className="font-medium text-gray-900">{request.patient_first_name} {request.patient_last_name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <User className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Hasta Yakını</p>
                                        <p className="font-medium text-gray-900">{request.first_name} {request.last_name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Phone className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">İletişim Numarası</p>
                                        <a href={`tel:${request.contact_phone}`} className="font-medium text-red-600 hover:underline">
                                            {request.contact_phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Building2 className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Hastane</p>
                                        <p className="font-medium text-gray-900">{request.hospital}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Konum</p>
                                        <p className="font-medium text-gray-900">{request.district}, {request.city}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Calendar className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">İlan Tarihi</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(request.created_at).toLocaleDateString('tr-TR')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {isOwner && donors.length > 0 && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                                    <div className="flex items-center mb-4 text-green-700">
                                        <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                                        <h3 className="font-bold">Gelen Yardım Talepleri ({donors.length})</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {donors.map((donor) => (
                                            <div key={donor.donation_id} className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
                                                <div>
                                                    <span className="font-semibold text-gray-800">{donor.donor_name}</span>
                                                    <p className="text-xs text-green-600">Bağış yapmak istiyor</p>
                                                </div>
                                                <button
                                                    onClick={() => handleApprove(donor.donation_id)}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                                                >
                                                    ONAYLA
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Warning Box */}
                            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-6">
                                <div className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                                    <p className="text-sm text-yellow-800">
                                        Lütfen sadece kan grubu uyumlu olan ve son 3 ay içinde bağış yapmamış kişiler iletişime geçsin.
                                    </p>
                                </div>
                            </div>

                            {/* Desktop Actions (Hidden on Mobile) */}
                            <div className="hidden md:flex gap-4">
                                <button
                                    onClick={handleShare}
                                    className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Share2 size={20} />
                                    Paylaş
                                </button>
                                {isOwner ? (
                                    <button
                                        disabled
                                        className="flex-[2] px-6 py-3 bg-gray-400 text-white rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <div className="w-5 h-5 flex items-center justify-center border-2 border-white rounded-full">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        Bu Sizin İlanınız
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDonate}
                                        disabled={donating}
                                        className="flex-[2] px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {donating ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Heart size={20} />
                                                Kan Vermeye Gidiyorum
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:hidden z-40 pb-safe">
                <div className="flex gap-3">
                    <button
                        onClick={handleShare}
                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Share2 size={20} />
                        Paylaş
                    </button>
                    {isOwner ? (
                        <button
                            disabled
                            className="flex-[2] px-4 py-3 bg-gray-400 text-white rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <div className="w-4 h-4 flex items-center justify-center border-2 border-white rounded-full">
                                <span className="text-[10px]">✓</span>
                            </div>
                            Sizin İlanınız
                        </button>
                    ) : (
                        <button
                            onClick={handleDonate}
                            disabled={donating}
                            className="flex-[2] px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {donating ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Heart size={20} fill="currentColor" />
                                    Kan Ver
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
