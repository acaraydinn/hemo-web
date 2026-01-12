'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PlusCircle, MapPin, Droplets, User, Phone, Clock } from 'lucide-react';
import { authUtils } from '@/lib/auth';
import { bloodRequestAPI, locationAPI, BLOOD_TYPES, BLOOD_PRODUCTS } from '@/lib/api';

export default function IlanOlusturPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [cities, setCities] = useState<string[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [hospitals, setHospitals] = useState<{ id: number; name: string }[]>([]);

    const [formData, setFormData] = useState({
        patient_first_name: '',
        patient_last_name: '',
        patient_tc: '',
        city: '',
        district: '',
        hospital: '',
        blood_type: '',
        blood_product: 'tam_kan',
        amount: '1',
        contact_phone: '',
    });

    useEffect(() => {
        const loadCities = async () => {
            const { data } = await locationAPI.getCities();
            if (data) setCities(data);
        };
        loadCities();
    }, []);

    useEffect(() => {
        if (!formData.city) return;
        const loadDistricts = async () => {
            setDistricts([]);
            setHospitals([]);
            setFormData(prev => ({ ...prev, district: '', hospital: '' }));
            const { data } = await locationAPI.getDistricts(formData.city);
            if (data) setDistricts(data);
        };
        loadDistricts();
    }, [formData.city]);

    useEffect(() => {
        if (!formData.city || !formData.district) return;
        const loadHospitals = async () => {
            setHospitals([]);
            setFormData(prev => ({ ...prev, hospital: '' }));
            const { data } = await locationAPI.getHospitals(formData.city, formData.district);
            if (data) setHospitals(data.map(h => ({ id: h.id, name: h.name })));
        };
        loadHospitals();
    }, [formData.city, formData.district]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const user = authUtils.getUser();
        if (!user) {
            setError('Oturum hatası. Lütfen tekrar giriş yapın.');
            setIsLoading(false);
            return;
        }

        try {
            const { error: apiError } = await bloodRequestAPI.create({
                user_phone: user.phone,
                patient_first_name: formData.patient_first_name,
                patient_last_name: formData.patient_last_name,
                patient_tc: formData.patient_tc,
                city: formData.city,
                district: formData.district,
                hospital: formData.hospital,
                blood_type: formData.blood_type,
                blood_product: formData.blood_product,
                amount: parseInt(formData.amount),
                contact_phone: formData.contact_phone,
                transport_support: false,
            });

            if (apiError) {
                setError(apiError);
                setIsLoading(false);
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/panel/ilanlar');
            }, 2000);
        } catch {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <PlusCircle size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">İlan Oluşturuldu!</h2>
                    <p className="text-gray-600">Geçmiş olsun, ilanınız yayınlandı.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Yeni İlan Oluştur</h1>
                <p className="text-gray-500 mb-8">Kan ihtiyacınızı paylaşarak hayat kurtaran kahramanlara ulaşın.</p>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-6 sm:p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Patient Info */}
                    <div>
                        <div className="flex items-center space-x-2 text-gray-700 font-medium mb-4">
                            <User size={20} />
                            <span>Hasta Bilgileri</span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={formData.patient_first_name}
                                onChange={(e) => setFormData({ ...formData, patient_first_name: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                placeholder="Hasta Adı"
                            />
                            <input
                                type="text"
                                value={formData.patient_last_name}
                                onChange={(e) => setFormData({ ...formData, patient_last_name: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                placeholder="Hasta Soyadı"
                            />
                        </div>
                        <input
                            type="text"
                            value={formData.patient_tc}
                            onChange={(e) => setFormData({ ...formData, patient_tc: e.target.value })}
                            maxLength={11}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 mt-4"
                            placeholder="Hasta TC Kimlik No (Gizli tutulur)"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <div className="flex items-center space-x-2 text-gray-700 font-medium mb-4">
                            <MapPin size={20} />
                            <span>Konum Bilgileri</span>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <select
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            >
                                <option value="">Şehir Seçin</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            <select
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                required
                                disabled={!formData.city}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 disabled:bg-gray-50"
                            >
                                <option value="">İlçe Seçin</option>
                                {districts.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <select
                                value={formData.hospital}
                                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                                required
                                disabled={!formData.district}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 disabled:bg-gray-50"
                            >
                                <option value="">Hastane Seçin</option>
                                {hospitals.map((hospital) => (
                                    <option key={hospital.id} value={hospital.name}>{hospital.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Blood Info */}
                    <div>
                        <div className="flex items-center space-x-2 text-gray-700 font-medium mb-4">
                            <Droplets size={20} />
                            <span>Kan Bilgileri</span>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <select
                                value={formData.blood_type}
                                onChange={(e) => setFormData({ ...formData, blood_type: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            >
                                <option value="">Kan Grubu</option>
                                {BLOOD_TYPES.map((type) => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                            <select
                                value={formData.blood_product}
                                onChange={(e) => setFormData({ ...formData, blood_product: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            >
                                {BLOOD_PRODUCTS.map((product) => (
                                    <option key={product.value} value={product.value}>{product.label}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                placeholder="Ünite Sayısı"
                            />
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <div className="flex items-center space-x-2 text-gray-700 font-medium mb-4">
                            <Phone size={20} />
                            <span>İletişim</span>
                        </div>
                        <input
                            type="tel"
                            value={formData.contact_phone}
                            onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                            maxLength={11}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            placeholder="İletişim Telefon Numarası"
                        />
                    </div>

                    {/* Info Box */}
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                        <Clock size={20} className="text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-800">
                            <p className="font-medium">Bilgilendirme</p>
                            <p className="mt-1 text-blue-600">Hasta TC kimlik numarası gizli tutulur ve sadece kan bağışı süreciyle ilgili kullanılır.</p>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Yayınlanıyor...</span>
                            </>
                        ) : (
                            <>
                                <PlusCircle size={20} />
                                <span>İlanı Yayınla</span>
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
