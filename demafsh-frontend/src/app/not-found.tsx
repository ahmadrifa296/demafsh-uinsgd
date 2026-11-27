import Link from "next/link";
import { ArrowLeft, FileSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#160207] px-4 py-20 text-center text-[#F8F5F2]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E7C45B]/35 bg-[#2A050E] text-[#E7C45B]">
        <FileSearch className="h-8 w-8" />
      </div>
      <span className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#E7C45B]">
        404 · Halaman Tidak Ditemukan
      </span>
      <h1 className="mt-2 font-sans text-3xl font-extrabold text-[#F8F5F2] sm:text-4xl">
        Konten Tidak Tersedia
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#F8F5F2]/75">
        Halaman atau artikel yang Anda cari mungkin telah dipindahkan, belum
        dipublikasikan, atau tautannya tidak sesuai.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E7C45B] px-6 py-2.5 text-sm font-bold text-[#160207] transition-colors hover:bg-[#C9A227]"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
}
