import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import AchievementForm from "@/components/AchievementForm";

export const metadata: Metadata = {
  title: "Ajukan Prestasi Mahasiswa",
  description:
    "Formulir resmi pengajuan data prestasi akademik dan nonakademik mahasiswa Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung.",
};

export default function AjukanPrestasiPage() {
  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <section className="border-b border-[#E7C45B]/15 bg-gradient-to-b from-[#2A050E] to-[#160207] py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/prestasi"
            className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E7C45B] transition-colors hover:text-[#F8F5F2]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            <span>Kembali ke Galeri Prestasi</span>
          </Link>

          <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
            <Trophy aria-hidden="true" className="h-4 w-4" />
            <span>Pendataan Resmi Mahasiswa</span>
          </div>
          <h1 className="mt-2 font-sans text-3xl font-extrabold text-[#F8F5F2] sm:text-4xl">
            Formulir Pengajuan Prestasi
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#D4C9C4] sm:text-base">
            Lengkapi data kejuaraan atau penghargaan beserta bukti sertifikat
            untuk diverifikasi tim DEMA FSH sebelum tampil di Hall of Fame.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <AchievementForm />
      </div>
    </div>
  );
}
