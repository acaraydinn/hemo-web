import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Yasal Bilgiler - Hemo',
    description: 'Hemo kullanım koşulları, gizlilik politikası ve KVKK aydınlatma metni. Yasal bilgilerimizi inceleyin.',
    openGraph: {
        title: 'Yasal Bilgiler - Hemo',
        description: 'Hemo kullanım koşulları, gizlilik politikası ve KVKK aydınlatma metni',
    }
};

export default function Yasal() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Yasal Bilgiler</h1>
                        <p className="text-lg text-gray-600">
                            Hemo platformunu kullanırken geçerli olan yasal belgeler
                        </p>
                    </div>

                    {/* Legal Documents Links */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <a href="/yasal/kullanim-kosullari" className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-100 group">
                            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">Kullanım Koşulları</h2>
                            <p className="text-sm text-gray-500 mb-4">Yürürlük Tarihi: 04.01.2026</p>
                            <p className="text-gray-600">Hemo platformunun kullanım şartları ve yükümlülükler.</p>
                            <span className="inline-block mt-4 text-red-600 font-medium group-hover:underline">İncele →</span>
                        </a>

                        <a href="/yasal/gizlilik-politikasi" className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-100 group">
                            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">Gizlilik Politikası</h2>
                            <p className="text-sm text-gray-500 mb-4">Son Güncelleme: 04.01.2026</p>
                            <p className="text-gray-600">Kişisel verilerinizin toplanması ve korunması hakkında bilgiler.</p>
                            <span className="inline-block mt-4 text-red-600 font-medium group-hover:underline">İncele →</span>
                        </a>

                        <a href="/yasal/kvkk" className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-100 group">
                            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">KVKK Aydınlatma Metni</h2>
                            <p className="text-sm text-gray-500 mb-4">Kişisel Verilerin Korunması</p>
                            <p className="text-gray-600">6698 sayılı kanun uyarınca veri işleme süreçleri.</p>
                            <span className="inline-block mt-4 text-red-600 font-medium group-hover:underline">İncele →</span>
                        </a>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">Sorularınız mı var?</h3>
                        <p className="mb-6">Yasal konularla ilgili sorularınız için bizimle iletişime geçebilirsiniz.</p>
                        <a href="mailto:hemo@socialrate.net" className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block">
                            hemo@socialrate.net
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
