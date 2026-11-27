import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MessageCircle } from "lucide-react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchSiteSettings, getImageUrl } from "@/lib/api";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "DEMA FSH UIN SGD Bandung | Kabinet 2026–2027",
    template: "%s | DEMA FSH UIN SGD Bandung",
  },
  description:
    "Website resmi Company Profile, Layanan Mahasiswa, dan Portal Berita Dewan Eksekutif Mahasiswa Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung periode 2026–2027.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSiteSettings();
  const logoUrl = getImageUrl(settings.logo_url ?? settings.logo);
  const waDigits = settings.whatsapp?.replace(/\D/g, "") || "";

  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#160207] text-[#F8F5F2]">
        <a href="#main-content" className="skip-link">
          Loncat ke konten utama
        </a>
        <Navbar
          period={settings.period}
          logoUrl={logoUrl}
          instagramHandle={settings.instagram_handle}
        />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />

        {waDigits && (
          <a
            href={`https://wa.me/${waDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi Sekretariat DEMA FSH melalui WhatsApp"
            className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1B6B3A] text-[#F8F5F2] shadow-lg ring-1 ring-[#E7C45B]/35 transition-colors hover:bg-[#15572F] sm:bottom-5 sm:right-5 sm:h-auto sm:min-h-11 sm:w-auto sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm sm:font-bold"
          >
            <span
              aria-hidden="true"
              className="hidden h-2 w-2 rounded-full bg-[#F8F5F2] sm:inline-block"
            />
            <MessageCircle aria-hidden="true" className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="sr-only sm:not-sr-only">Chat WhatsApp</span>
          </a>
        )}
      </body>
    </html>
  );
}
