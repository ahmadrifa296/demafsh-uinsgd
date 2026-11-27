import type { Metadata } from "next";
import Link from "next/link";
import { Award, ExternalLink, PlusCircle, ShieldCheck, Trophy } from "lucide-react";
import PrestasiFilters from "@/components/PrestasiFilters";
import { fetchAchievements, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hall of Fame Prestasi Mahasiswa",
  description:
    "Galeri prestasi mahasiswa Fakultas Syariah dan Hukum UIN SGD Bandung serta layanan pendataan capaian resmi.",
};

interface PrestasiPageProps {
  searchParams: Promise<{
    level?: string;
    search?: string;
  }>;
}

export default async function PrestasiPage({ searchParams }: PrestasiPageProps) {
  const params = await searchParams;
  const activeLevel = params.level || "";
  const searchQuery = params.search || "";

  const achievements = await fetchAchievements();

  const filtered = achievements.filter((item) => {
    const matchesLevel =
      !activeLevel ||
      item.level.toLowerCase() === activeLevel.trim().toLowerCase();
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.student_name.toLowerCase().includes(q) ||
      item.major.toLowerCase().includes(q) ||
      item.event_name.toLowerCase().includes(q) ||
      item.rank.toLowerCase().includes(q);
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <section className="border-b border-[#E7C45B]/15 bg-gradient-to-b from-[#2A050E] to-[#160207] py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E7C45B]/35 bg-[#4A0B1B]/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
            <Award aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Apresiasi Akademik &amp; Nonakademik</span>
          </span>
          <h1 className="mt-4 font-sans text-3xl font-extrabold text-[#F8F5F2] sm:text-5xl">
            Hall of Fame Prestasi FSH
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#D4C9C4]">
            Dokumentasi capaian mahasiswa Fakultas Syariah dan Hukum UIN Sunan
            Gunung Djati Bandung yang telah diverifikasi resmi.
          </p>

          <Link
            href="/prestasi/ajukan"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E7C45B] px-6 py-3 text-sm font-bold text-[#160207] shadow-lg transition-colors hover:bg-[#C9A227]"
          >
            <PlusCircle aria-hidden="true" className="h-4 w-4" />
            <span>Ajukan Prestasi Mahasiswa</span>
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <PrestasiFilters
          activeLevel={activeLevel}
          initialSearch={searchQuery}
        />

        <section aria-labelledby="galeri-prestasi-heading">
          <div className="mb-6 flex flex-col items-center text-center">
            <h2
              id="galeri-prestasi-heading"
              className="font-sans text-2xl font-bold text-[#F8F5F2] sm:text-3xl"
            >
              Galeri Mahasiswa Berprestasi
            </h2>
            <p className="mt-1 text-xs text-[#D4C9C4] sm:text-sm">
              Menampilkan {filtered.length} capaian terverifikasi DEMA FSH
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
              {filtered.map((item) => {
                const photoUrl = getImageUrl(item.photo_url ?? item.photo);
                const certUrl = getImageUrl(
                  item.certificate_url ?? item.certificate_file
                );

                return (
                  <article
                    key={item.id}
                    className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E7C45B]/20 bg-[#2A050E]/90 transition-colors hover:border-[#E7C45B]/55 sm:rounded-2xl"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#4A0B1B] sm:aspect-[16/10]">
                      {photoUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={photoUrl}
                          alt={item.student_name}
                          width={640}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#6E1127]/75 via-[#4A0B1B] to-[#160207] p-4 sm:p-6">
                          <Trophy
                            aria-hidden="true"
                            className="h-8 w-8 text-[#E7C45B] sm:h-11 sm:w-11"
                          />
                          <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#D4C9C4] sm:mt-2 sm:text-[11px] sm:tracking-[0.2em]">
                            {item.level}
                          </span>
                        </div>
                      )}

                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#1B6B3A] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#F8F5F2] sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
                        <ShieldCheck aria-hidden="true" className="h-3 w-3" />
                        <span className="hidden sm:inline">Terverifikasi</span>
                      </span>
                      <span className="absolute right-2 top-2 rounded-full bg-[#E7C45B] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#160207] sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
                        {item.level}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-3 sm:p-5">
                      <span className="inline-block w-fit rounded-md bg-[#6E1127] px-2 py-0.5 text-[10px] font-bold text-[#E7C45B] sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-xs">
                        {item.rank}
                      </span>
                      <h3 className="mt-2 line-clamp-1 font-sans text-sm font-bold text-[#F8F5F2] sm:mt-3 sm:line-clamp-none sm:text-lg">
                        {item.student_name}
                      </h3>
                      <p className="line-clamp-1 text-[11px] font-semibold text-[#E7C45B] sm:line-clamp-none sm:text-xs">
                        {item.major}
                        {item.nim ? ` · ${item.nim}` : ""}
                      </p>
                      <p className="mt-1.5 line-clamp-2 flex-1 text-[11px] leading-snug text-[#D4C9C4] sm:mt-2.5 sm:line-clamp-none sm:text-sm sm:leading-relaxed">
                        {item.event_name}
                      </p>

                      {certUrl && (
                        <a
                          href={certUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex min-h-11 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#E7C45B] hover:text-[#F8F5F2] sm:mt-3 sm:gap-1.5 sm:text-xs"
                        >
                          <span>Lihat Sertifikat</span>
                          <ExternalLink
                            aria-hidden="true"
                            className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#E7C45B]/15 bg-[#2A050E]/80 p-12 text-center">
              <Trophy aria-hidden="true" className="mx-auto h-10 w-10 text-[#E7C45B]" />
              <h3 className="mt-4 font-sans text-xl font-bold text-[#F8F5F2]">
                Prestasi Tidak Ditemukan
              </h3>
              <p className="mt-2 text-sm text-[#D4C9C4]">
                Belum ada data prestasi sesuai filter saat ini. Punya capaian
                baru?
              </p>
              <Link
                href="/prestasi/ajukan"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E7C45B] px-5 py-2.5 text-sm font-bold text-[#160207] hover:bg-[#C9A227]"
              >
                <PlusCircle aria-hidden="true" className="h-4 w-4" />
                <span>Ajukan Prestasi Baru</span>
              </Link>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-[#E7C45B]/25 bg-[#2A050E] p-6 text-center sm:p-10">
          <h2 className="font-sans text-2xl font-bold text-[#F8F5F2]">
            Punya Capaian Kejuaraan atau Delegasi Ilmiah?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#D4C9C4]">
            Laporkan prestasi tingkat fakultas hingga internasional melalui
            halaman formulir khusus agar dapat diverifikasi dan dipublikasikan.
          </p>
          <Link
            href="/prestasi/ajukan"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E7C45B] px-6 py-3 text-sm font-bold text-[#160207] transition-colors hover:bg-[#C9A227]"
          >
            <PlusCircle aria-hidden="true" className="h-4 w-4" />
            <span>Buka Formulir Pengajuan Prestasi</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
