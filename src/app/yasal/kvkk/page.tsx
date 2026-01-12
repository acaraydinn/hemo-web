import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'KVKK Aydınlatma Metni - Hemo',
    description: 'Hemo KVKK aydınlatma metni.',
};

export default function KVKK() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">KVKK Aydınlatma Metni</h1>
                        <p className="text-sm text-gray-500 mb-6">Veri Sorumlusu: Hemo System</p>
                        <div className="prose prose-gray max-w-none">
                            <p className="mb-4">
                                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Hemo System ("Veri Sorumlusu") olarak; kişisel verilerinizin işlenmesi hakkında sizi bilgilendiriyoruz.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Veri İşleme Amacı</h3>
                            <p className="mb-4">
                                Kişisel verileriniz; üyelik işlemlerinin gerçekleştirilmesi, kan bağışı eşleşmelerinin yapılması, acil durum bildirimlerinin iletilmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. İşlenen Kişisel Veriler</h3>
                            <p className="mb-4">
                                Kimlik, İletişim, Lokasyon ve Sağlık (Kan Grubu) verileriniz işlenmektedir. Sağlık verisi, "Özel Nitelikli Kişisel Veri" statüsünde olup sadece açık rızanız ile işlenir.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Veri Aktarımı</h3>
                            <p className="mb-4">
                                Verileriniz, kan ihtiyacı durumunda eşleştiğiniz kullanıcılarla veya yetkili kamu kurum ve kuruluşlarıyla (Sağlık Bakanlığı, Emniyet vb.) paylaşılabilir.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Haklarınız (Madde 11)</h3>
                            <p className="mb-4">
                                KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme hakkına sahipsiniz. Taleplerinizi <a href="mailto:hemo@socialrate.net" className="text-red-600 hover:text-red-700">hemo@socialrate.net</a> adresine iletebilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
