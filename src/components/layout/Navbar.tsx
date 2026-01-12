'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { authUtils } from '@/lib/auth';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);
    const pathname = usePathname();

    // Navbar should be solid/dark if scrolled OR if not on homepage
    const isSolid = isScrolled || pathname !== '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Check if user is logged in
        const storedUser = authUtils.getUser();
        if (storedUser) {
            setUser({ firstName: storedUser.firstName, lastName: storedUser.lastName });
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        authUtils.logout();
        setUser(null);
        window.location.href = '/';
    };

    const navLinks = [
        { href: '/#ozellikler', label: 'Özellikler' },
        { href: '/#nasil-calisir', label: 'Nasıl Çalışır' },
        { href: '/sss', label: 'SSS' },
        { href: '/yasal', label: 'Yasal' },
        { href: '/destek', label: 'Destek' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid ? 'glass shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <Image
                            src="/logo.jpg"
                            alt="Hemo Logo"
                            width={45}
                            height={45}
                            className="rounded-lg"
                        />
                        <span className={`text-2xl font-bold ${isSolid ? 'text-gray-900' : 'text-white'}`}>
                            HEMO
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-medium transition-colors hover:text-red-500 ${isSolid ? 'text-gray-700' : 'text-white/90'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/panel"
                                    className="flex items-center space-x-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-medium transition-all"
                                >
                                    <User size={18} />
                                    <span>{user.firstName}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className={`p-2 rounded-full transition-colors ${isSolid ? 'text-gray-600 hover:bg-gray-100' : 'text-white/80 hover:bg-white/10'
                                        }`}
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/giris"
                                    className={`font-medium transition-colors ${isSolid ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-red-300'
                                        }`}
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    href="/kayit"
                                    className="btn-primary text-white px-6 py-2.5 rounded-full font-medium"
                                >
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden p-2 rounded-lg ${isSolid ? 'text-gray-900' : 'text-white'
                            }`}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-gray-700 font-medium py-2"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="pt-4 border-t space-y-3">
                                {user ? (
                                    <>
                                        <Link
                                            href="/panel"
                                            className="block w-full text-center bg-red-600 text-white py-3 rounded-lg font-medium"
                                        >
                                            Panelim
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-center text-gray-600 py-2"
                                        >
                                            Çıkış Yap
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/giris"
                                            className="block w-full text-center text-gray-700 py-3 border rounded-lg font-medium"
                                        >
                                            Giriş Yap
                                        </Link>
                                        <Link
                                            href="/kayit"
                                            className="block w-full text-center bg-red-600 text-white py-3 rounded-lg font-medium"
                                        >
                                            Kayıt Ol
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
