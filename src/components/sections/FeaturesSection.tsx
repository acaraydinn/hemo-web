'use client';

import { motion } from 'framer-motion';
import {
    Heart,
    Bell,
    MapPin,
    Shield,
    Trophy,
    Zap,
    Smartphone,
    Clock
} from 'lucide-react';

const features = [
    {
        icon: Heart,
        title: 'Acil Kan İlanları',
        description: 'Hastanelerdeki acil kan ihtiyaçlarını anında görün ve hayat kurtarın.',
        color: 'bg-red-500',
    },
    {
        icon: Bell,
        title: 'Anlık Bildirimler',
        description: 'Şehrinizde acil kan ihtiyacı olduğunda anında haberdar olun.',
        color: 'bg-orange-500',
    },
    {
        icon: MapPin,
        title: 'Konum Bazlı Arama',
        description: 'Size en yakın kan ihtiyaçlarını bulun ve hızlıca yardım edin.',
        color: 'bg-blue-500',
    },
    {
        icon: Shield,
        title: 'Güvenli Platform',
        description: 'KVKK uyumlu, kişisel verileriniz güvende, TC kimlik gizli tutulur.',
        color: 'bg-green-500',
    },
    {
        icon: Trophy,
        title: 'Kahraman Rozetleri',
        description: 'Her bağışta puan kazanın ve liderlik tablosunda yerinizi alın.',
        color: 'bg-purple-500',
    },
    {
        icon: Zap,
        title: 'Hızlı Eşleşme',
        description: 'Kan grubu uyumuna göre otomatik eşleşme sistemi.',
        color: 'bg-yellow-500',
    },
    {
        icon: Smartphone,
        title: 'Mobil Uygulama',
        description: 'iOS ve Android uygulamalarımızla her yerden erişin.',
        color: 'bg-pink-500',
    },
    {
        icon: Clock,
        title: '7/24 Aktif',
        description: 'Platform her an aktif, acil durumlarda hızlı çözüm.',
        color: 'bg-cyan-500',
    },
];

export default function FeaturesSection() {
    return (
        <section id="ozellikler" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                        Özellikler
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
                        Neden Hemo?
                    </h2>
                    <div className="section-divider mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Modern teknoloji ile geleneksel kan bağışı süreçlerini dijitalleştiriyoruz.
                        Hayat kurtarmak artık çok daha kolay.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                        >
                            <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-5`}>
                                <feature.icon size={26} className="text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
