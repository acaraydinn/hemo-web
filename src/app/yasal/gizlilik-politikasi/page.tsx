import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Gizlilik Politikası - Hemo',
    description: 'Hemo gizlilik politikası.',
};

export default function GizlilikPolitikasi() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gizlilik Politikası</h1>
                        <p className="text-sm text-gray-500 mb-6">Son Güncelleme: 04.01.2026</p>
                        <div className="prose prose-gray max-w-none">
                            <p className="mb-4">
                                Hemo ("Uygulama") olarak gizliliğinize önem veriyoruz. Bu Gizlilik Politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Toplanan Veriler</h3>
                            <p className="mb-2">Uygulamayı kullanırken aşağıdaki verileri toplayabiliriz:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. Kimlik Numarası (doğrulama için).</li>
                                <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi.</li>
                                <li><strong>Sağlık Bilgileri:</strong> Kan grubu, kronik rahatsızlık bilgisi (sadece kan bağışı uygunluğu için).</li>
                                <li><strong>Konum Bilgileri:</strong> Size en yakın kan bağış noktalarını veya acil kan ihtiyaçlarını göstermek için (izniniz dahilinde).</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Verilerin Kullanımı</h3>
                            <p className="mb-2">Toplanan veriler şu amaçlarla kullanılır:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Kan bağışçısı ve ihtiyaç sahibini eşleştirmek.</li>
                                <li>Acil durumlarda bildirim göndermek.</li>
                                <li>Hesap güvenliğini sağlamak.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Verilerin Paylaşımı</h3>
                            <p className="mb-4">
                                Kişisel verileriniz, yasal zorunluluklar haricinde veya açık rızanız olmadan üçüncü şahıslarla ticari amaçla paylaşılmaz. Ancak acil kan ihtiyacı durumunda, kan grubunuz eşleşiyorsa, konumunuz ve iletişim bilgileriniz sadece ilgili sağlık kuruluşu veya ihtiyaç sahibi ile paylaşılabilir.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Veri Güvenliği</h3>
                            <p className="mb-4">
                                Verileriniz güvenli sunucularda, SSL şifreleme teknolojisi ile saklanmaktadır.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. İletişim</h3>
                            <p className="mb-4">
                                Gizlilik politikamızla ilgili sorularınız için: <a href="mailto:hemo@socialrate.net" className="text-red-600 hover:text-red-700">hemo@socialrate.net</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
