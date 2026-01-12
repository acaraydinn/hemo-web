'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { leaderboardAPI } from '@/lib/api';

interface LeaderboardEntry {
    first_name: string;
    last_name: string;
    points: number;
    badge: string;
}

export default function LiderlikPage() {
    const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadLeaderboard = async () => {
            const { data } = await leaderboardAPI.get();
            if (data) setLeaders(data);
            setIsLoading(false);
        };
        loadLeaderboard();
    }, []);

    const getBadgeInfo = (badge: string, rank: number) => {
        if (rank === 0) return { icon: Crown, color: 'text-yellow-500', bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600' };
        if (rank === 1) return { icon: Medal, color: 'text-gray-400', bg: 'bg-gradient-to-br from-gray-300 to-gray-500' };
        if (rank === 2) return { icon: Award, color: 'text-orange-500', bg: 'bg-gradient-to-br from-orange-400 to-orange-600' };
        return { icon: Trophy, color: 'text-gray-600', bg: 'bg-gray-100' };
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
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Liderlik Tablosu</h1>
                <p className="text-gray-500">En çok katkı yapan kahramanlarımız</p>
            </div>

            {/* Top 3 */}
            {leaders.length >= 3 && (
                <div className="flex justify-center items-end gap-4 py-8">
                    {/* 2nd Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto">
                            2
                        </div>
                        <p className="font-medium text-gray-900">{leaders[1].first_name}</p>
                        <p className="text-sm text-gray-500">{leaders[1].points} puan</p>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-center"
                    >
                        <div className="relative">
                            <Crown size={32} className="text-yellow-500 absolute -top-6 left-1/2 -translate-x-1/2" />
                            <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-2 mx-auto shadow-lg">
                                1
                            </div>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">{leaders[0].first_name}</p>
                        <p className="text-sm text-gray-500">{leaders[0].points} puan</p>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto">
                            3
                        </div>
                        <p className="font-medium text-gray-900">{leaders[2].first_name}</p>
                        <p className="text-sm text-gray-500">{leaders[2].points} puan</p>
                    </motion.div>
                </div>
            )}

            {/* Full Leaderboard */}
            <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                        <div className="col-span-1">#</div>
                        <div className="col-span-6">Kahraman</div>
                        <div className="col-span-3">Rozet</div>
                        <div className="col-span-2 text-right">Puan</div>
                    </div>
                </div>
                <div className="divide-y">
                    {leaders.map((leader, index) => {
                        const badgeInfo = getBadgeInfo(leader.badge, index);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`p-4 hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-gray-50/50' : ''}`}
                            >
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-1">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index < 3 ? badgeInfo.bg + ' text-white' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        <p className="font-medium text-gray-900">{leader.first_name} {leader.last_name}</p>
                                    </div>
                                    <div className="col-span-3">
                                        <span className="text-sm text-gray-500">{leader.badge}</span>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <span className="font-bold text-red-600">{leader.points}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
