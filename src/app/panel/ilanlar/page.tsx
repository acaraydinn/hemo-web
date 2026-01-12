'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Droplets, Clock, Filter, MoreVertical, Flag, Ban } from 'lucide-react';
import { authUtils } from '@/lib/auth';
import { bloodRequestAPI, locationAPI, BloodRequest, getProductDisplayName, userAPI } from '@/lib/api';

export default function IlanlarPage() {
    const [ads, setAds] = useState<BloodRequest[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState('Tüm Türkiye');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [userPhone, setUserPhone] = useState('');

    useEffect(() => {
        const user = authUtils.getUser();
        if (user) setUserPhone(user.phone);
        loadCities();
    }, []);

    useEffect(() => {
        loadAds();
    }, [selectedCity, userPhone]);

    const loadCities = async () => {
        const { data } = await locationAPI.getCities();
        if (data) setCities(['Tüm Türkiye', ...data]);
    };

    const loadAds = async () => {
        setIsLoading(true);
        const city = selectedCity === 'Tüm Türkiye' ? undefined : selectedCity;
        const { data } = await bloodRequestAPI.getAll(city, userPhone);
        if (data) setAds(data);
        setIsLoading(false);
    };

    const handleBlock = async (userId: number, userName: string) => {
        if (!confirm(`${userName} kullanıcısını engellemek istediğinize emin misiniz?`)) return;

        await userAPI.blockUser(userPhone, userId);
        loadAds(); // Refresh list
    };

    const handleReport = async (adId: number) => {
        const reason = prompt('Şikayet nedeninizi yazın:');
        if (!reason) return;

        await userAPI.reportContent(userPhone, adId, reason);
        alert('Şikayetiniz alındı. 24 saat içinde incelenecektir.');
    };

    const filteredAds = ads.filter(ad =>
        ad.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.blood_type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kan İlanları</h1>
                    <p className="text-gray-500">Aktif kan ihtiyaçlarını görüntüleyin</p>
                </div>
                <Link
                    href="/panel/ilan-olustur"
                    className="btn-primary text-white px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center"
                >
                    + Yeni İlan
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-xl border p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Hastane, şehir veya kan grubu ara..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                        />
                    </div>

                    {/* City Filter */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <Filter size={20} className="text-gray-500" />
                        <span className="text-gray-700">{selectedCity}</span>
                    </button>
                </div>

                {/* City Dropdown */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2 pt-4 border-t"
                    >
                        {cities.map((city) => (
                            <button
                                key={city}
                                onClick={() => {
                                    setSelectedCity(city);
                                    setShowFilters(false);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCity === city
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Results Count */}
            <p className="text-gray-500">
                {filteredAds.length} ilan bulundu
            </p>

            {/* Ads List */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredAds.length === 0 ? (
                <div className="bg-white rounded-xl border p-12 text-center">
                    <Droplets size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Bu kriterlere uygun ilan bulunamadı.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {filteredAds.map((ad, index) => (
                        <motion.div
                            key={ad.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl border p-5 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between">
                                <Link href={`/panel/ilan/${ad.id}`} className="flex items-start flex-1">
                                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg mr-4">
                                        {ad.blood_type}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors">
                                            {ad.hospital}
                                        </h3>
                                        <div className="flex items-center text-gray-500 text-sm mt-1">
                                            <MapPin size={14} className="mr-1" />
                                            <span>{ad.city} / {ad.district}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 mt-2">
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                {getProductDisplayName(ad.blood_product)}
                                            </span>
                                            <span className="flex items-center text-xs text-gray-400">
                                                <Clock size={12} className="mr-1" />
                                                Yeni
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Actions Menu */}
                                <div className="relative group/menu">
                                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                        <MoreVertical size={18} />
                                    </button>
                                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10">
                                        <button
                                            onClick={() => handleReport(ad.id)}
                                            className="flex items-center space-x-2 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <Flag size={16} className="text-orange-500" />
                                            <span>Şikayet Et</span>
                                        </button>
                                        <button
                                            onClick={() => handleBlock(ad.user_id, `${ad.first_name} ${ad.last_name}`)}
                                            className="flex items-center space-x-2 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <Ban size={16} className="text-red-500" />
                                            <span>Kullanıcıyı Engelle</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
