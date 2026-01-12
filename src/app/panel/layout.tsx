'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Droplets,
    PlusCircle,
    User,
    Settings,
    Trophy,
    LogOut,
    Menu,
    X,
    Heart
} from 'lucide-react';
import { authUtils } from '@/lib/auth';

const menuItems = [
    { href: '/panel', icon: LayoutDashboard, label: 'Panel' },
    { href: '/panel/ilanlar', icon: Droplets, label: 'İlanlar' },
    { href: '/panel/ilan-olustur', icon: PlusCircle, label: 'İlan Oluştur' },
    { href: '/panel/profil', icon: User, label: 'Profilim' },
    { href: '/panel/liderlik', icon: Trophy, label: 'Liderlik' },
    { href: '/panel/ayarlar', icon: Settings, label: 'Ayarlar' },
];

export default function PanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<{ firstName: string; lastName: string; points: number } | null>(null);

    useEffect(() => {
        // Check authentication
        const storedUser = authUtils.getUser();
        if (!storedUser) {
            router.push('/giris');
            return;
        }
        setUser({
            firstName: storedUser.firstName,
            lastName: storedUser.lastName,
            points: storedUser.points,
        });
    }, [router]);

    const handleLogout = () => {
        authUtils.logout();
        router.push('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-40 flex items-center justify-between px-4">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-gray-600"
                >
                    <Menu size={24} />
                </button>
                <Link href="/panel" className="flex items-center space-x-2">
                    <Image src="/logo.jpg" alt="Hemo" width={32} height={32} className="rounded-lg" />
                    <span className="font-bold text-gray-900">HEMO</span>
                </Link>
                <div className="w-10" />
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ x: isSidebarOpen ? 0 : '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-white border-r z-50 lg:translate-x-0"
                style={{ transform: 'translateX(-100%)' }}
            >
                {/* Close Button (Mobile) */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-2 text-gray-400"
                >
                    <X size={20} />
                </button>

                {/* Logo */}
                <div className="p-6 border-b">
                    <Link href="/" className="flex items-center space-x-3">
                        <Image src="/logo.jpg" alt="Hemo" width={45} height={45} className="rounded-xl" />
                        <div>
                            <span className="text-xl font-bold text-gray-900 block">HEMO</span>
                            <span className="text-xs text-gray-500">Panel</span>
                        </div>
                    </Link>
                </div>

                {/* User Info */}
                <div className="p-4 mx-4 mt-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                            <div className="flex items-center space-x-1 text-sm text-white/80">
                                <Heart size={12} fill="currentColor" />
                                <span>{user.points} Puan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-red-50 text-red-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Çıkış Yap</span>
                    </button>
                </div>
            </motion.aside>

            {/* Desktop Sidebar - Always visible */}
            <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-72 bg-white border-r z-30">
                {/* Logo */}
                <div className="p-6 border-b">
                    <Link href="/" className="flex items-center space-x-3">
                        <Image src="/logo.jpg" alt="Hemo" width={45} height={45} className="rounded-xl" />
                        <div>
                            <span className="text-xl font-bold text-gray-900 block">HEMO</span>
                            <span className="text-xs text-gray-500">Panel</span>
                        </div>
                    </Link>
                </div>

                {/* User Info */}
                <div className="p-4 mx-4 mt-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                            <div className="flex items-center space-x-1 text-sm text-white/80">
                                <Heart size={12} fill="currentColor" />
                                <span>{user.points} Puan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-red-50 text-red-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Çıkış Yap</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
