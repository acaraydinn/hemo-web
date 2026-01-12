'use client';

import { motion } from 'framer-motion';
import { UserPlus, Search, Heart, CheckCircle } from 'lucide-react';

const steps = [
    {
        icon: UserPlus,
        number: '01',
        title: 'Hesap Oluşturun',
        description: 'Telefon numarası ve e-posta ile hızlıca kayıt olun. E-posta doğrulaması ile güvenliğinizi sağlayın.',
        color: 'from-red-500 to-red-600',
    },
    {
        icon: Search,
        number: '02',
        title: 'İlan Arayın veya Oluşturun',
        description: 'Kan ihtiyacınız varsa ilan oluşturun. Bağış yapmak istiyorsanız size yakın ilanları bulun.',
        color: 'from-orange-500 to-red-500',
    },
    {
        icon: Heart,
        number: '03',
        title: 'Bağış Yapın',
        description: 'İlana tıklayıp "Kan Vermeye Geliyorum" deyin. İlan sahibi sizinle iletişime geçecek.',
        color: 'from-pink-500 to-red-500',
    },
    {
        icon: CheckCircle,
        number: '04',
        title: 'Kahraman Olun',
        description: 'Bağışınız onaylandığında puan kazanın ve liderlik tablosunda yerinizi alın!',
        color: 'from-green-500 to-emerald-500',
    },
];

export default function HowItWorksSection() {
    return (
        <section id="nasil-calisir" className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
                        Adım Adım
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
                        Nasıl Çalışır?
                    </h2>
                    <div className="section-divider mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        4 basit adımda kan bağışı sürecine dahil olun ve hayat kurtarın.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="relative"
                        >
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-14 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent" />
                            )}

                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow relative">
                                {/* Step Number */}
                                <div className="absolute -top-4 -right-2 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6`}>
                                    <step.icon size={32} className="text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <a
                        href="/kayit"
                        className="btn-primary inline-flex items-center space-x-2 text-white px-8 py-4 rounded-full text-lg font-semibold"
                    >
                        <span>Hemen Başla</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
