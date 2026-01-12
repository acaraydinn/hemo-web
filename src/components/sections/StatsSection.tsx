'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Hospital, Star } from 'lucide-react';

const stats = [
    {
        icon: Heart,
        value: '10,000+',
        label: 'Hayat Kurtarıldı',
        color: 'text-red-500',
        bgColor: 'bg-red-50',
    },
    {
        icon: Users,
        value: '25,000+',
        label: 'Kayıtlı Kahraman',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
    },
    {
        icon: Hospital,
        value: '1,500+',
        label: 'Hastane',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
    },
    {
        icon: Star,
        value: '4.9',
        label: 'App Store Puanı',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
    },
];

export default function StatsSection() {
    return (
        <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full" />
                <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full" />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={`${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                            >
                                <stat.icon size={30} className={stat.color} />
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                className="stat-number mb-1"
                            >
                                {stat.value}
                            </motion.div>
                            <p className="text-gray-400 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
