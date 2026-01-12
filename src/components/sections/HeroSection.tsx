'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Droplets, Users, Clock, MapPin } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
            {/* Floating Blood Cells (Decorative) */}
            <div className="blood-cell top-20 left-10 w-16 h-16" style={{ animationDelay: '0s' }} />
            <div className="blood-cell top-40 right-20 w-24 h-24" style={{ animationDelay: '1s' }} />
            <div className="blood-cell bottom-32 left-1/4 w-12 h-12" style={{ animationDelay: '2s' }} />
            <div className="blood-cell bottom-20 right-1/3 w-20 h-20" style={{ animationDelay: '0.5s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                        >
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-white/90 text-sm font-medium">Türkiye&apos;nin Kan Bağışı Platformu</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                        >
                            Bir Damla Kan,
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                                Bir Hayat Kurtarır
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-white/90 mb-2 max-w-lg mx-auto lg:mx-0 font-medium"
                        >
                            Kan Ararken Kaybedilen Saniyeleri Hayata Dönüştürüyoruz.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="text-base text-white/60 mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                            Hemo, kan bağışçıları ile ihtiyaç sahiplerini hızlıca buluşturur.
                            Tek bir tıklamayla hayat kurtaracak kahramanlara ulaşın.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href="/kayit"
                                className="btn-primary inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-full text-lg font-semibold"
                            >
                                <Heart size={22} />
                                <span>Hemen Katıl</span>
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                href="/giris"
                                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-medium transition-all backdrop-blur-sm"
                            >
                                <span>Giriş Yap</span>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10"
                        >
                            <div className="text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                                    <Droplets className="text-red-400" size={24} />
                                    <span className="text-3xl font-bold text-white">1000+</span>
                                </div>
                                <p className="text-white/60 text-sm">Aktif İlan</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                                    <Users className="text-red-400" size={24} />
                                    <span className="text-3xl font-bold text-white">5000+</span>
                                </div>
                                <p className="text-white/60 text-sm">Kahraman</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                                    <Clock className="text-red-400" size={24} />
                                    <span className="text-3xl font-bold text-white">24/7</span>
                                </div>
                                <p className="text-white/60 text-sm">Aktif Destek</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Blood Type Card Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative flex justify-center items-center"
                    >
                        {/* Animated Blood Type Card */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 2, 0, -2, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative bg-white rounded-3xl shadow-2xl p-8 w-80 border-l-8 border-red-500"
                        >
                            {/* Emergency Badge */}
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute top-6 right-6 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold"
                            >
                                ACİL
                            </motion.div>

                            {/* Blood Type */}
                            <div className="text-5xl font-bold text-red-600 mb-4">
                                A Rh+
                            </div>

                            {/* Location */}
                            <div className="flex items-center text-gray-600 mb-4">
                                <MapPin size={18} className="mr-2" />
                                <span>Seyhan, Adana</span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                                Şehir Hastanesi'nde yatan hastamız için acil kan gereklidir.
                            </p>

                            {/* Action Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition-colors"
                            >
                                Kan Vermeye Gidiyorum
                            </motion.button>
                        </motion.div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full scale-110 -z-10" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
                >
                    <div className="w-1.5 h-2.5 bg-white/50 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
