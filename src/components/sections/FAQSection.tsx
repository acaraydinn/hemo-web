'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'Hemo nedir?',
        answer: 'Hemo, kan bağışçıları ile kan ihtiyacı olan hastaları buluşturan modern bir platformdur. Türkiye genelinde hastanelerdeki acil kan ihtiyaçlarını görüntüleyebilir ve bağış yapabilirsiniz.',
    },
    {
        question: 'Nasıl kayıt olurum?',
        answer: 'Kayıt olmak için telefon numaranız, e-posta adresiniz, kan grubunuz ve bulunduğunuz şehri girmeniz yeterli. E-posta adresinize gelen doğrulama kodu ile hesabınızı aktifleştirirsiniz.',
    },
    {
        question: 'Kan bağışı yapmak için ne yapmalıyım?',
        answer: 'Giriş yaptıktan sonra "İlanlar" bölümünden size yakın kan ihtiyaçlarını görebilirsiniz. Uygun bir ilan bulduğunuzda "Kan Vermeye Geliyorum" butonuna tıklayın. İlan sahibi sizinle iletişime geçecektir.',
    },
    {
        question: 'Kendi kan ilanımı nasıl oluştururum?',
        answer: 'Panel\'e giriş yaptıktan sonra "İlan Oluştur" butonuna tıklayın. Hasta bilgileri, hastane, kan grubu ve iletişim numarasını girerek ilanınızı yayınlayabilirsiniz.',
    },
    {
        question: 'Puan sistemi nasıl çalışır?',
        answer: 'Her onaylanan bağışınız için puan kazanırsınız. Tam kan bağışı 100, trombosit 250, plazma 150 puan değerindedir. Puanlarınız arttıkça rozetiniz yükselir: Gönüllü → Yardımsever → Kahraman → Efsane.',
    },
    {
        question: 'Bilgilerim güvende mi?',
        answer: 'Evet, platformumuz KVKK (Kişisel Verilerin Korunması Kanunu) uyumludur. Hasta TC kimlik numaraları gizli tutulur ve hiçbir şekilde paylaşılmaz.',
    },
    {
        question: 'Uygulama ücretsiz mi?',
        answer: 'Evet, Hemo tamamen ücretsizdir. Hiçbir ücret talep etmiyoruz. Amacımız sadece hayat kurtarmaktır.',
    },
    {
        question: 'Bir kullanıcıyı engelleyebilir miyim?',
        answer: 'Evet, herhangi bir ilanın sağ üst köşesindeki menüden "Kullanıcıyı Engelle" seçeneğini kullanabilirsiniz. Engellediğiniz kişinin ilanlarını artık görmezsiniz.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="sss" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                        SSS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
                        Sık Sorulan Sorular
                    </h2>
                    <div className="section-divider mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Merak ettiğiniz soruların cevapları burada.
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-gray-50 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <HelpCircle
                                        size={22}
                                        className={`transition-colors ${openIndex === index ? 'text-red-500' : 'text-gray-400'
                                            }`}
                                    />
                                    <span className={`font-medium ${openIndex === index ? 'text-red-600' : 'text-gray-900'
                                        }`}>
                                        {faq.question}
                                    </span>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-6 pl-16 text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
