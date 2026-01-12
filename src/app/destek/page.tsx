import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
    title: 'Destek - Hemo',
    description: 'Hemo destek ekibiyle iletişime geçin. Sorularınız, önerileriniz veya destek talepleriniz için bize ulaşın.',
    openGraph: {
        title: 'Destek - Hemo',
        description: 'Hemo destek ekibiyle iletişime geçin. Sorularınız için bize ulaşın.',
    }
};

export default function Destek() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-24">
                <ContactSection />
            </div>
            <Footer />
        </main>
    );
}
