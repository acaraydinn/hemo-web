'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Lock, Save, AlertTriangle, Trash2 } from 'lucide-react';
import { authUtils } from '@/lib/auth';
import { userAPI, authAPI } from '@/lib/api';

export default function AyarlarPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });

    useEffect(() => {
        const loadProfile = async () => {
            const user = authUtils.getUser();
            if (!user) return;

            const { data } = await userAPI.getProfile(user.phone);
            if (data) {
                setProfileData({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                });
            }
        };
        loadProfile();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        const user = authUtils.getUser();
        if (!user) return;

        const { error: apiError } = await userAPI.updateProfile({
            phone: user.phone,
            first_name: profileData.first_name,
            last_name: profileData.last_name,
            email: profileData.email,
        });

        if (apiError) {
            setError(apiError);
        } else {
            setSuccess('Profil başarıyla güncellendi.');
            // Update local storage
            authUtils.saveUser({
                ...user,
                firstName: profileData.first_name,
                lastName: profileData.last_name,
            });
        }
        setIsLoading(false);
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (passwordData.new_password !== passwordData.confirm_password) {
            setError('Yeni şifreler eşleşmiyor.');
            return;
        }

        if (passwordData.new_password.length < 6) {
            setError('Şifre en az 6 karakter olmalı.');
            return;
        }

        setIsLoading(true);

        const user = authUtils.getUser();
        if (!user) return;

        const { error: apiError } = await authAPI.changePassword(
            user.phone,
            passwordData.old_password,
            passwordData.new_password
        );

        if (apiError) {
            setError(apiError);
        } else {
            setSuccess('Şifre başarıyla değiştirildi.');
            setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
        }
        setIsLoading(false);
    };

    const handleDeleteAccount = async () => {
        if (!confirm('Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
        if (!confirm('Son kez onaylayın: Tüm verileriniz silinecek. Devam etmek istiyor musunuz?')) return;

        const user = authUtils.getUser();
        if (!user) return;

        const { error: apiError } = await userAPI.deleteAccount(user.phone);
        if (apiError) {
            setError(apiError);
        } else {
            authUtils.logout();
            router.push('/');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
                <p className="text-gray-500">Hesap ayarlarınızı yönetin</p>
            </div>

            {/* Status Messages */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                >
                    {error}
                </motion.div>
            )}
            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm"
                >
                    {success}
                </motion.div>
            )}

            {/* Profile Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border p-6"
            >
                <div className="flex items-center space-x-2 text-gray-900 font-semibold mb-6">
                    <User size={20} />
                    <span>Profil Bilgileri</span>
                </div>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                            <input
                                type="text"
                                value={profileData.first_name}
                                onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                            <input
                                type="text"
                                value={profileData.last_name}
                                onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                        <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary text-white px-6 py-3 rounded-xl font-medium inline-flex items-center space-x-2 disabled:opacity-50"
                    >
                        <Save size={18} />
                        <span>Kaydet</span>
                    </button>
                </form>
            </motion.div>

            {/* Password Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border p-6"
            >
                <div className="flex items-center space-x-2 text-gray-900 font-semibold mb-6">
                    <Lock size={20} />
                    <span>Şifre Değiştir</span>
                </div>
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mevcut Şifre</label>
                        <input
                            type="password"
                            value={passwordData.old_password}
                            onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre</label>
                            <input
                                type="password"
                                value={passwordData.new_password}
                                onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
                            <input
                                type="password"
                                value={passwordData.confirm_password}
                                onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center space-x-2 disabled:opacity-50 transition-colors"
                    >
                        <Lock size={18} />
                        <span>Şifreyi Değiştir</span>
                    </button>
                </form>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-red-50 rounded-2xl border border-red-200 p-6"
            >
                <div className="flex items-center space-x-2 text-red-700 font-semibold mb-4">
                    <AlertTriangle size={20} />
                    <span>Tehlikeli Bölge</span>
                </div>
                <p className="text-red-600 text-sm mb-4">
                    Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                </p>
                <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center space-x-2 transition-colors"
                >
                    <Trash2 size={18} />
                    <span>Hesabımı Sil</span>
                </button>
            </motion.div>
        </div>
    );
}
