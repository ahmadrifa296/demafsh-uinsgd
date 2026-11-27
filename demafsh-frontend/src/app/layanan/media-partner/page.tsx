import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Megaphone } from "lucide-react";
import MediaPartnerForm from "@/components/MediaPartnerForm";

export const metadata: Metadata = {
  title: "Form Media Partner",
  description:
    "Formulir pengajuan kerja sama publikasi Media Partner bersama Departemen Kominfo DEMA Fakultas Syariah dan Hukum UIN SGD Bandung.",
};

export default function MediaPartnerPage() {
  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <section className="border-b border-[#E7C45B]/15 bg-gradient-to-b from-[#2A050E] to-[#160207] py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/layanan"
            className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E7C45B] transition-colors hover:text-[#F8F5F2]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            <span>Semua Layanan Mahasiswa</span>
          </Link>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E7C45B]/35 bg-[#4A0B1B]/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
            <Megaphone aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Kemitraan Publikasi Resmi</span>
          </span>
          <h1 className="mt-4 font-sans text-3xl font-extrabold text-[#F8F5F2] sm:text-5xl">
            Pengajuan Media Partner
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#D4C9C4]">
            Ajukan kerja sama publikasi kegiatan organisasi, seminar, maupun
            acara kemahasiswaan melalui kanal resmi @demafshuinbdg.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <MediaPartnerForm />
      </div>
    </div>
  );
}
