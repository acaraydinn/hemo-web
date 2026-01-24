import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hesap Silme - Hemo',
    description: 'Hemo hesabınızı nasıl silebileceğinizi öğrenin.',
};

export default function HesapSilmePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">H</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Hemo</span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Hesap Silme
                    </h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 mb-8">
                            Hemo hesabınızı silmek isterseniz, aşağıdaki adımları takip ederek
                            uygulama içinden hesabınızı kalıcı olarak silebilirsiniz.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
                            📱 Uygulama İçinden Hesap Silme Adımları
                        </h2>

                        <ol className="list-decimal list-inside space-y-4 text-gray-700">
                            <li className="p-4 bg-gray-50 rounded-lg">
                                <strong>Hemo uygulamasını açın</strong> ve hesabınıza giriş yapın.
                            </li>
                            <li className="p-4 bg-gray-50 rounded-lg">
                                Alt menüden <strong>&quot;Profil&quot;</strong> sekmesine gidin.
                            </li>
                            <li className="p-4 bg-gray-50 rounded-lg">
                                <strong>&quot;Hesap Ayarları&quot;</strong> bölümüne tıklayın.
                            </li>
                            <li className="p-4 bg-gray-50 rounded-lg">
                                <strong>&quot;Hesabımı Sil&quot;</strong> seçeneğine tıklayın.
                            </li>
                            <li className="p-4 bg-gray-50 rounded-lg">
                                Onay ekranında <strong>&quot;Evet, Hesabımı Sil&quot;</strong> butonuna basın.
                            </li>
                        </ol>

                        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl">
                            <h3 className="text-lg font-semibold text-red-800 mb-2">
                                ⚠️ Önemli Bilgi
                            </h3>
                            <p className="text-red-700">
                                Hesabınızı sildiğinizde, tüm verileriniz (profil bilgileri, bağış geçmişi,
                                puanlar ve ilanlarınız) kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                            </p>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
                            📧 Alternatif: E-posta ile Talep
                        </h2>

                        <p className="text-gray-600">
                            Uygulamaya erişiminiz yoksa, hesap silme talebinizi aşağıdaki e-posta
                            adresine gönderebilirsiniz:
                        </p>

                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <a href="mailto:destek@hemo.com.tr" className="text-blue-600 font-semibold text-lg">
                                destek@hemo.com.tr
                            </a>
                        </div>

                        <p className="text-gray-500 mt-4 text-sm">
                            E-posta ile yapılan talepler 72 saat içinde işleme alınır.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
                            🗑️ Silinen Veriler
                        </h2>

                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Profil bilgileri (ad, soyad, telefon, e-posta)</li>
                            <li>Kan bağışı geçmişi</li>
                            <li>Oluşturduğunuz ilanlar</li>
                            <li>Kazanılan puanlar ve rozetler</li>
                            <li>Bildirim tercihleri</li>
                        </ul>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8 text-center">
                    <Link href="/yasal" className="text-red-600 hover:text-red-700 font-medium">
                        ← Yasal Bilgilere Dön
                    </Link>
                </div>
            </main>
        </div>
    );
}
