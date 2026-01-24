import Link from 'next/link';
import Image from 'next/image';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <Image
                                src="/logo.jpg"
                                alt="Hemo Logo"
                                width={50}
                                height={50}
                                className="rounded-lg"
                            />
                            <span className="text-2xl font-bold">HEMO</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Kan bağışçıları ile ihtiyaç sahiplerini buluşturan, hayat kurtaran modern platform.
                        </p>
                        <div className="flex items-center space-x-2 text-red-400">
                            <Heart size={20} fill="currentColor" />
                            <span className="font-medium">Hayat Kurtaran Bağlantı</span>
                        </div>
                    </div>

                    {/* Hızlı Linkler */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Hızlı Linkler</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#ozellikler" className="text-gray-400 hover:text-white transition-colors">
                                    Özellikler
                                </Link>
                            </li>
                            <li>
                                <Link href="#nasil-calisir" className="text-gray-400 hover:text-white transition-colors">
                                    Nasıl Çalışır?
                                </Link>
                            </li>
                            <li>
                                <Link href="#sss" className="text-gray-400 hover:text-white transition-colors">
                                    Sık Sorulan Sorular
                                </Link>
                            </li>
                            <li>
                                <Link href="/giris" className="text-gray-400 hover:text-white transition-colors">
                                    Giriş Yap
                                </Link>
                            </li>
                            <li>
                                <Link href="/kayit" className="text-gray-400 hover:text-white transition-colors">
                                    Kayıt Ol
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Hukuki */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Hukuki</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/yasal/kullanim-kosullari" className="text-gray-400 hover:text-white transition-colors">
                                    Kullanım Koşulları
                                </Link>
                            </li>
                            <li>
                                <Link href="/yasal/gizlilik-politikasi" className="text-gray-400 hover:text-white transition-colors">
                                    Gizlilik Politikası
                                </Link>
                            </li>
                            <li>
                                <Link href="/yasal/kvkk" className="text-gray-400 hover:text-white transition-colors">
                                    KVKK Aydınlatma Metni
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* İletişim */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">İletişim</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Mail size={18} className="text-red-400" />
                                <a href="mailto:hemo@socialrate.net" className="hover:text-white transition-colors">
                                    hemo@socialrate.net
                                </a>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Phone size={18} className="text-red-400" />
                                <a href="tel:+905383036001" className="hover:text-white transition-colors">
                                    +90 538 303 60 01
                                </a>
                            </li>
                            <li className="flex items-start space-x-3 text-gray-400">
                                <MapPin size={18} className="text-red-400 mt-1" />
                                <span>Adana, Türkiye</span>
                            </li>
                        </ul>

                        {/* App Store Badges */}
                        <div className="mt-6 flex flex-col space-y-3">
                            <a
                                href="https://apps.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2 text-sm"
                            >
                                App Store&apos;dan İndir
                            </a>
                            <a
                                href="https://play.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2 text-sm"
                            >
                                Google Play&apos;den İndir
                            </a>
                        </div>
                    </div>
                </div>

                {/* Buy Me a Coffee - Support Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">☕</span>
                            <div className="text-left">
                                <p className="text-white font-semibold">Hemo&apos;yu Destekle</p>
                                <p className="text-gray-400 text-sm">Uygulamanın geliştirilmesine katkıda bulun</p>
                            </div>
                        </div>
                        <a
                            href="https://buymeacoffee.com/Hemoapp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900 font-bold px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg"
                        >
                            <span className="text-xl">☕</span>
                            Bize Kahve Ismarla
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} Hemo. Tüm hakları saklıdır.
                        </p>
                        <p className="text-gray-500 text-sm">
                            from <span className="text-gray-400 font-medium">UBASOFT</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
