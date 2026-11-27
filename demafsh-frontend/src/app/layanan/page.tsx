import type { Metadata } from "next";
import Link from "next/link";
import {
  HeartHandshake,
  Megaphone,
  MessageSquareQuote,
  Trophy,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Layanan Mahasiswa DEMA FSH",
  description:
    "Pusat layanan terpadu DEMA FSH UIN SGD Bandung: Ruang Aspirasi, Hall of Fame Prestasi, Form Media Partner, dan DEMA FSH Peduli.",
};

const LAYANAN_CARDS = [
  {
    title: "Aspirasi",
    description:
      "Sampaikan keluhan layanan kampus dan gagasan kebijakan secara terbuka atau anonim dilengkapi pelacakan kode tiket.",
    href: "/aspirasi",
    badge: "Advokasi",
    icon: MessageSquareQuote,
  },
  {
    title: "Prestasi",
    description:
      "Jelajahi galeri mahasiswa berprestasi FSH atau ajukan pendataan capaian kejuaraan Anda untuk diverifikasi.",
    href: "/prestasi",
    badge: "Hall of Fame",
    icon: Trophy,
  },
  {
    title: "Form Media Partner",
    description:
      "Ajukan kerja sama publikasi acara HMJ, UKM, maupun lembaga eksternal melalui kanal media resmi @demafshuinbdg.",
    href: "/layanan/media-partner",
    badge: "Kominfo FSH",
    icon: Megaphone,
  },
  {
    title: "DEMA FSH Peduli",
    description:
      "Salurkan donasi kemanusiaan, bantuan tanggap bencana, dan solidaritas pendidikan melalui kampanye donasi resmi.",
    href: "/layanan/peduli",
    badge: "Sosmas",
    icon: HeartHandshake,
  },
];

export default function LayananPage() {
  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <section className="border-b border-[#E7C45B]/15 bg-gradient-to-b from-[#2A050E] to-[#160207] py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E7C45B]/35 bg-[#4A0B1B]/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
            Ekosistem Layanan Terpadu
          </span>
          <h1 className="mt-4 font-sans text-3xl font-extrabold text-[#F8F5F2] sm:text-5xl">
            Layanan Mahasiswa DEMA FSH
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#D4C9C4]">
            Pilih layanan yang Anda butuhkan: pengawalan aspirasi, pendataan
            prestasi, kemitraan media partner, atau donasi DEMA FSH Peduli.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-4">
          {LAYANAN_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex min-w-0 flex-col rounded-xl border border-[#E7C45B]/15 bg-[#2A050E] p-3.5 transition-colors duration-200 hover:border-[#E7C45B]/55 hover:bg-[#4A0B1B]/70 sm:rounded-2xl sm:p-6"
              >
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#4A0B1B] text-[#E7C45B] ring-1 ring-[#E7C45B]/30 transition-colors group-hover:bg-[#E7C45B] group-hover:text-[#160207] sm:h-11 sm:w-11 sm:rounded-xl">
                    <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="max-w-full truncate rounded-full bg-[#1B6B3A] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#F8F5F2] sm:px-2.5 sm:py-1 sm:text-[10px]">
                    {card.badge}
                  </span>
                </div>

                <h2 className="mt-3 font-sans text-sm font-bold leading-snug text-[#F8F5F2] group-hover:text-[#E7C45B] sm:mt-5 sm:text-xl">
                  {card.title}
                </h2>
                <p className="mt-1.5 line-clamp-2 flex-1 text-[11px] leading-snug text-[#D4C9C4] sm:mt-2.5 sm:line-clamp-none sm:text-sm sm:leading-relaxed">
                  {card.description}
                </p>

                <span className="mt-3 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#E7C45B] sm:mt-5 sm:text-xs sm:tracking-[0.15em]">
                  <span>Buka Halaman</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
