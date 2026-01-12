'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Heart, Droplets, Clock, Trophy, CheckCircle } from 'lucide-react';
import { authUtils } from '@/lib/auth';
import { bloodRequestAPI, donationAPI, userAPI, BloodRequest, getProductDisplayName } from '@/lib/api';

export default function ProfilPage() {
    const [user, setUser] = useState<{ firstName: string; lastName: string; points: number; badge: string } | null>(null);
    const [activeAds, setActiveAds] = useState<BloodRequest[]>([]);
    const [pastAds, setPastAds] = useState<BloodRequest[]>([]);
    interface Donation {
        hospital: string;
        blood_type: string;
        date: string;
        status: string;
    }
    const [donations, setDonations] = useState<Donation[]>([]);
    const [activeTab, setActiveTab] = useState<'active' | 'past' | 'donations'>('active');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const storedUser = authUtils.getUser();
            if (!storedUser) return;

            // Get fresh user data
            const { data: freshUser } = await userAPI.getProfile(storedUser.phone);
            if (freshUser) {
                authUtils.updatePoints(freshUser.points);
                setUser({
                    firstName: freshUser.first_name,
                    lastName: freshUser.last_name,
                    points: freshUser.points,
                    badge: freshUser.badge,
                });
            }

            // Get my ads
            const { data: myAds } = await bloodRequestAPI.getMyRequests(storedUser.phone);
            if (myAds) {
                setActiveAds(myAds.filter(ad => ad.is_active));
                setPastAds(myAds.filter(ad => !ad.is_active));
            }

            // Get my donations
            const { data: myDonations } = await donationAPI.getMyDonations(storedUser.phone);
            if (myDonations) {
                setDonations(myDonations);
            }

            setIsLoading(false);
        };

        loadData();
    }, []);

    const getBadgeInfo = (badge: string) => {
        const badges: Record<string, { emoji: string; color: string }> = {
            'Gönüllü': { emoji: '🌱', color: 'bg-green-100 text-green-800' },
            'Yardımsever': { emoji: '💪', color: 'bg-blue-100 text-blue-800' },
            'Kahraman': { emoji: '🦸', color: 'bg-purple-100 text-purple-800' },
            'Efsane': { emoji: '👑', color: 'bg-yellow-100 text-yellow-800' },
        };
        return badges[badge] || badges['Gönüllü'];
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
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border p-8"
            >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                    <div className="text-center sm:text-left flex-1">
                        <h1 className="text-2xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h1>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getBadgeInfo(user?.badge || '').color}`}>
                                <span>{getBadgeInfo(user?.badge || '').emoji}</span>
                                <span>{user?.badge}</span>
                            </span>
                            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                                <Heart size={14} className="text-red-500" />
                                <span>{user?.points} Puan</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-gray-900">
                            <Droplets size={24} className="text-red-500" />
                            <span>{activeAds.length}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Aktif İlan</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-gray-900">
                            <Clock size={24} className="text-blue-500" />
                            <span>{pastAds.length}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Geçmiş İlan</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-gray-900">
                            <Trophy size={24} className="text-yellow-500" />
                            <span>{donations.length}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Bağışım</p>
                    </div>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${activeTab === 'active' ? 'bg-white shadow text-red-600' : 'text-gray-600'
                        }`}
                >
                    Aktif İlanlarım ({activeAds.length})
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${activeTab === 'past' ? 'bg-white shadow text-red-600' : 'text-gray-600'
                        }`}
                >
                    Geçmiş ({pastAds.length})
                </button>
                <button
                    onClick={() => setActiveTab('donations')}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${activeTab === 'donations' ? 'bg-white shadow text-red-600' : 'text-gray-600'
                        }`}
                >
                    Bağışlarım ({donations.length})
                </button>
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border"
            >
                {activeTab === 'active' && (
                    activeAds.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Droplets size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>Henüz aktif ilanınız bulunmuyor.</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {activeAds.map((ad) => (
                                <Link key={ad.id} href={`/ilan/${ad.id}`} className="block hover:bg-gray-50 transition-colors">
                                    <div className="p-4 flex items-center">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 font-bold mr-4">
                                            {ad.blood_type}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{ad.hospital}</p>
                                            <p className="text-sm text-gray-500">{ad.city} / {ad.district}</p>
                                        </div>
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Aktif</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                )}

                {activeTab === 'past' && (
                    pastAds.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Clock size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>Henüz geçmiş ilanınız bulunmuyor.</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {pastAds.map((ad) => (
                                <Link key={ad.id} href={`/ilan/${ad.id}`} className="block hover:bg-gray-50 transition-colors">
                                    <div className="p-4 flex items-center opacity-75">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 font-bold mr-4">
                                            {ad.blood_type}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{ad.hospital}</p>
                                            <p className="text-sm text-gray-500">{getProductDisplayName(ad.blood_product)}</p>
                                        </div>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Tamamlandı</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                )}

                {activeTab === 'donations' && (
                    donations.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Heart size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>Henüz bağışınız bulunmuyor.</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {donations.map((donation, index) => (
                                <div key={index} className="p-4 flex items-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                                        <CheckCircle size={24} className="text-green-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{donation.hospital}</p>
                                        <p className="text-sm text-gray-500">{donation.blood_type} • {donation.date}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${donation.status === 'Onaylandı' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {donation.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </motion.div>
        </div>
    );
}
