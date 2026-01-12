'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function ContactSection() {
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            const response = await fetch('https://formspree.io/f/xyzknvnb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setFormStatus('error');
            }
        } catch {
            setFormStatus('error');
        }
    };

    return (
        <section id="destek" className="py-24 bg-gradient-to-b from-white to-gray-50">
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
                        Destek
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
                        Destek Ekibimizle İletişime Geçin
                    </h2>
                    <div className="section-divider mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Sorularınız, önerileriniz veya destek talepleriniz için her zaman yanınızdayız.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Mail className="text-red-600" size={22} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                                <a href="mailto:hemo@socialrate.net" className="text-gray-600 hover:text-red-600 transition-colors">
                                    hemo@socialrate.net
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Phone className="text-red-600" size={22} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                                <a href="tel:+905383036001" className="text-gray-600 hover:text-red-600 transition-colors">
                                    +90 538 303 60 01
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <MapPin className="text-red-600" size={22} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                                <p className="text-gray-600">Adana/Türkiye</p>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white mt-8">
                            <h3 className="font-semibold text-lg mb-3">7/24 Destek</h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Acil durumlarınızda her zaman yanınızdayız. Uygulama içinden de destek talebi oluşturabilirsiniz.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        {formStatus === 'success' ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                                <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Mesajınız Alındı!</h3>
                                <p className="text-gray-600">En kısa sürede size dönüş yapacağız.</p>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    className="mt-6 text-red-600 font-medium hover:underline"
                                >
                                    Yeni mesaj gönder
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Ad Soyad
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                            placeholder="Adınız Soyadınız"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            E-posta
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                            placeholder="ornek@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Konu
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                        placeholder="Mesaj konusu"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mesajınız
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"
                                        placeholder="Mesajınızı buraya yazın..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === 'sending'}
                                    className="w-full btn-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                                >
                                    {formStatus === 'sending' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Gönderiliyor...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            <span>Mesajı Gönder</span>
                                        </>
                                    )}
                                </button>

                                {formStatus === 'error' && (
                                    <p className="mt-4 text-red-600 text-center text-sm">
                                        Bir hata oluştu. Lütfen tekrar deneyin.
                                    </p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
