import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
    title: 'Sıkça Sorulan Sorular - Hemo',
    description: 'Hemo kan bağışı platformu hakkında sıkça sorulan sorular ve cevapları. Kan bağışı süreci, güvenlik ve daha fazlası hakkında bilgi edinin.',
    openGraph: {
        title: 'Sıkça Sorulan Sorular - Hemo',
        description: 'Hemo kan bağışı platformu hakkında sıkça sorulan sorular ve cevapları',
    }
};

export default function SSS() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-24">
                <FAQSection />
            </div>
            <Footer />
        </main>
    );
}
