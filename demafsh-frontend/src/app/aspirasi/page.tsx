import type { Metadata } from "next";
import { MessageSquareQuote } from "lucide-react";
import AspirasiClient from "@/components/AspirasiClient";

export const metadata: Metadata = {
  title: "Ruang Aspirasi Mahasiswa",
  description:
    "Sampaikan aspirasi, pengaduan layanan kampus, dan lacak progres tindak lanjut melalui kode tiket resmi DEMA FSH UIN SGD Bandung.",
};

export default function AspirasiPage() {
  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <section className="border-b border-[#E7C45B]/15 bg-gradient-to-b from-[#2A050E] to-[#160207] py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E7C45B]/35 bg-[#4A0B1B]/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
            <MessageSquareQuote className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Advokasi &amp; Pengawalan Kebijakan</span>
          </span>
          <h1 className="mt-4 font-sans text-3xl font-extrabold text-[#F8F5F2] sm:text-5xl">
            Ruang Aspirasi Mahasiswa FSH
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#D4C9C4]">
            Kanal resmi penyampaian aspirasi, keluhan fasilitas, dan advokasi
            akademik mahasiswa Fakultas Syariah dan Hukum UIN Sunan Gunung Djati
            Bandung.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AspirasiClient />
      </div>
    </div>
  );
}
