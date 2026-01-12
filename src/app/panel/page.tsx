'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Droplets,
    PlusCircle,
    Heart,
    Trophy,
    TrendingUp,
    Clock
} from 'lucide-react';
import { authUtils } from '@/lib/auth';
import { bloodRequestAPI, userAPI, BloodRequest } from '@/lib/api';

export default function PanelPage() {
    const [user, setUser] = useState<{ firstName: string; points: number; badge: string } | null>(null);
    const [stats, setStats] = useState({
        activeAds: 0,
        totalDonations: 0,
    });
    const [recentAds, setRecentAds] = useState<BloodRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const storedUser = authUtils.getUser();
            if (!storedUser) return;

            setUser({
                firstName: storedUser.firstName,
                points: storedUser.points,
                badge: storedUser.badge,
            });

            // Fetch user's ads
            const { data: myAds } = await bloodRequestAPI.getMyRequests(storedUser.phone);
            if (myAds) {
                setStats({
                    activeAds: myAds.filter(ad => ad.is_active).length,
                    totalDonations: myAds.length,
                });
            }

            // Fetch recent public ads
            const { data: allAds } = await bloodRequestAPI.getAll(undefined, storedUser.phone);
            if (allAds) {
                setRecentAds(allAds.slice(0, 5));
            }

            // Refresh user data from API
            const { data: freshUser } = await userAPI.getProfile(storedUser.phone);
            if (freshUser) {
                authUtils.updatePoints(freshUser.points);
                setUser(prev => prev ? { ...prev, points: freshUser.points, badge: freshUser.badge } : null);
            }

            setIsLoading(false);
        };

        loadData();
    }, []);

    const getBadgeEmoji = (badge: string) => {
        const badges: Record<string, string> = {
            'Gönüllü': '🌱',
            'Yardımsever': '💪',
            'Kahraman': '🦸',
            'Efsane': '👑',
        };
        return badges[badge] || '🌱';
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white"
            >
                <h1 className="text-2xl font-bold mb-2">
                    Hoş Geldin, {user?.firstName}! 👋
                </h1>
                <p className="text-white/80">
                    Hayat kurtarmaya hazır mısın?
                </p>
                <div className="flex items-center space-x-4 mt-6">
                    <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                        <span className="text-2xl">{getBadgeEmoji(user?.badge || 'Gönüllü')}</span>
                        <span className="font-medium">{user?.badge || 'Gönüllü'}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                        <Heart size={18} fill="currentColor" />
                        <span className="font-medium">{user?.points || 0} Puan</span>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl p-6 border shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Aktif İlanlarım</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeAds}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <Droplets className="text-red-600" size={24} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-6 border shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Toplam İlan</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalDonations}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-blue-600" size={24} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl p-6 border shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Puanım</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{user?.points || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <Trophy className="text-yellow-600" size={24} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl p-6 border shadow-sm"
                >
                    <Link href="/panel/ilan-olustur" className="block">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Yeni İlan</p>
                                <p className="text-lg font-bold text-red-600 mt-1">Oluştur →</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <PlusCircle className="text-green-600" size={24} />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* Recent Blood Requests */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl border shadow-sm"
            >
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Son İlanlar</h2>
                    <Link href="/panel/ilanlar" className="text-red-600 text-sm font-medium hover:underline">
                        Tümünü Gör →
                    </Link>
                </div>
                <div className="divide-y">
                    {recentAds.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            Henüz aktif ilan bulunmuyor.
                        </div>
                    ) : (
                        recentAds.map((ad) => (
                            <Link
                                key={ad.id}
                                href={`/panel/ilan/${ad.id}`}
                                className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 font-bold mr-4">
                                    {ad.blood_type}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{ad.hospital}</p>
                                    <p className="text-sm text-gray-500">{ad.city} / {ad.district}</p>
                                </div>
                                <div className="flex items-center text-gray-400 text-sm">
                                    <Clock size={14} className="mr-1" />
                                    Yeni
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </motion.div>
        </div>
    );
}
