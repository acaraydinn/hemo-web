import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Kullanım Koşulları - Hemo',
    description: 'Hemo platformu kullanım koşulları.',
};

export default function KullanimKosullari() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kullanım Koşulları</h1>
                        <p className="text-sm text-gray-500 mb-6">Yürürlük Tarihi: 04.01.2026</p>
                        <div className="prose prose-gray max-w-none">
                            <p className="mb-4">
                                Bu uygulamayı (Hemo) kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Hizmetin Tanımı</h3>
                            <p className="mb-4">
                                Hemo, gönüllü kan bağışçıları ile kan ihtiyacı olan kişileri bir araya getiren sosyal sorumluluk odaklı bir platformdur. Hemo, bir sağlık kuruluşu değildir ve tıbbi hizmet vermez.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Kullanıcı Yükümlülükleri</h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Kullanıcı, sisteme girdiği bilgilerin (kan grubu, hastalık durumu vb.) doğru olduğunu taahhüt eder. Yanlış beyandan doğacak sorumluluk kullanıcıya aittir.</li>
                                <li>Uygulama üzerinden yapılan iletişimlerde genel ahlak kurallarına uyulmalıdır.</li>
                                <li>Kullanıcı, üyeliğini ticari amaçlarla kullanamaz.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Sorumluluk Reddi</h3>
                            <p className="mb-4">
                                Hemo, bağışçılar ve ihtiyaç sahipleri arasındaki iletişimi sağlar ancak gerçekleşecek kan bağışı işleminin tıbbi uygunluğunu garanti etmez. Tüm tıbbi süreçler Sağlık Bakanlığı onaylı kuruluşlarda yapılmalıdır.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Hesabın Askıya Alınması</h3>
                            <p className="mb-4">
                                Kötüye kullanım tespit edildiğinde Hemo, kullanıcı hesabını askıya alma veya silme hakkını saklı tutar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
