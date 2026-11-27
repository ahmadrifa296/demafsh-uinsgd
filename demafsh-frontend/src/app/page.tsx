import Link from "next/link";
import {
  CalendarDays,
  HeartHandshake,
  Megaphone,
  MessageSquareQuote,
  Newspaper,
  Trophy,
  Users,
} from "lucide-react";
import AchieverCarousel from "@/components/AchieverCarousel";
import ArticleCard from "@/components/ArticleCard";
import AspirasiClient from "@/components/AspirasiClient";
import EventCard from "@/components/EventCard";
import {
  fetchAchievements,
  fetchEvents,
  fetchPosts,
  fetchSiteSettings,
  getImageUrl,
  trackAspiration,
} from "@/lib/api";

export const dynamic = "force-dynamic";

const STUDENT_SERVICES = [
  {
    title: "Ruang Aspirasi",
    description:
      "Sampaikan keluhan, kritik, dan gagasan kebijakan kampus secara terbuka maupun anonim lengkap dengan kode tiket pelacakan.",
    href: "/aspirasi",
    badge: "Advokasi Mahasiswa",
    icon: MessageSquareQuote,
  },
  {
    title: "Hall of Fame Prestasi",
    description:
      "Laporkan capaian kompetisi akademik maupun nonakademik mahasiswa FSH untuk diverifikasi dan dipublikasikan secara resmi.",
    href: "/prestasi",
    badge: "Apresiasi Talenta",
    icon: Trophy,
  },
  {
    title: "DEMA FSH Peduli",
    description:
      "Program solidaritas sosial, bantuan tanggap bencana, dan subsidi darurat pendidikan untuk sivitas akademika FSH.",
    href: "/layanan/peduli",
    badge: "Sosial Masyarakat",
    icon: HeartHandshake,
  },
  {
    title: "Media Partner",
    description:
      "Ajukan kerja sama publikasi acara HMJ, UKM, maupun komunitas eksternal melalui kanal media resmi @demafshuinbdg.",
    href: "/layanan/media-partner",
    badge: "Kominfo FSH",
    icon: Megaphone,
  },
];

export default async function HomePage() {
  const [settings, postsData, achievements, eventsRes, sampleTicket] =
    await Promise.all([
      fetchSiteSettings(),
      fetchPosts({ limit: 4 }),
      fetchAchievements(),
      fetchEvents(),
      trackAspiration("ASP-FSH001"),
    ]);

  const logoSrc =
    getImageUrl(settings.logo_url ?? settings.logo) || "/logo-demafsh.png";
  const latestPosts = postsData.data.slice(0, 4);
  const featuredEvents = eventsRes.data.slice(0, 4);

  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <section className="relative overflow-hidden border-b border-[#E7C45B]/15 bg-[#160207]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden sm:inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-bg.jpg"
            alt=""
            width={996}
            height={420}
            fetchPriority="high"
            className="h-auto w-full object-cover object-top sm:h-full sm:object-[center_18%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(22,2,7,0.12)_0%,rgba(22,2,7,0.48)_62%,#160207_100%)] sm:bg-[linear-gradient(to_bottom,rgba(22,2,7,0.18)_0%,rgba(22,2,7,0.42)_48%,rgba(22,2,7,0.92)_100%)]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_62%_50%_at_50%_58%,rgba(22,2,7,0.68)_0%,rgba(22,2,7,0.22)_62%,transparent_100%)] sm:block"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-10 text-center sm:px-6 sm:pt-14 sm:pb-16">
          <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#E7C45B]/70 bg-[#F8F5F2] shadow-[0_0_50px_rgba(231,196,91,0.28)] sm:h-36 sm:w-36">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={`Lambang resmi ${settings.organization_name}`}
              width={144}
              height={144}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl font-sans text-2xl font-extrabold uppercase leading-[1.1] tracking-tight text-[#F8F5F2] drop-shadow-[0_3px_14px_rgba(0,0,0,0.85)] sm:mt-7 sm:text-5xl lg:text-[3.35rem]">
            {settings.hero_title}
          </h1>

          <p className="mx-auto mt-3.5 max-w-2xl text-sm leading-relaxed text-[#F8F5F2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:mt-4 sm:text-lg">
            {settings.hero_subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <Link
              href="/aspirasi"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E7C45B] px-5 py-2.5 text-xs font-bold text-[#160207] transition-colors hover:bg-[#C9A227] sm:px-7 sm:py-3 sm:text-sm"
            >
              <MessageSquareQuote aria-hidden="true" className="h-4 w-4" />
              <span>Sampaikan Aspirasi</span>
            </Link>
            <Link
              href="/kabinet"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E7C45B]/45 bg-[#2A050E] px-5 py-2.5 text-xs font-semibold text-[#F8F5F2] transition-colors hover:border-[#E7C45B] hover:bg-[#4A0B1B] sm:px-7 sm:py-3 sm:text-sm"
            >
              <Users aria-hidden="true" className="h-4 w-4 text-[#E7C45B]" />
              <span>Struktur Kabinet</span>
            </Link>
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E7C45B] sm:mt-8 sm:text-xs sm:tracking-[0.2em]">
            Fakultas Syariah &amp; Hukum · UIN Sunan Gunung Djati Bandung · Periode{" "}
            {settings.period}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E7C45B] sm:text-xs sm:tracking-[0.22em]">
            Ekosistem Layanan Terpadu
          </span>
          <h2 className="mt-1 font-sans text-xl font-bold text-[#F8F5F2] sm:mt-2 sm:text-3xl">
            Layanan Mahasiswa FSH
          </h2>
          <Link
            href="/layanan"
            className="mt-0.5 inline-flex min-h-11 items-center text-xs font-semibold text-[#E7C45B] transition-colors hover:text-[#F8F5F2] sm:text-sm"
          >
            <span>Lihat Semua Layanan</span>
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-5 lg:grid-cols-4">
          {STUDENT_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group flex min-w-0 flex-col rounded-xl border border-[#E7C45B]/15 bg-[#2A050E] p-3 transition-colors duration-200 hover:border-[#E7C45B]/55 hover:bg-[#4A0B1B]/70 sm:rounded-2xl sm:p-6"
              >
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#4A0B1B] text-[#E7C45B] ring-1 ring-[#E7C45B]/30 transition-colors group-hover:bg-[#E7C45B] group-hover:text-[#160207] sm:h-11 sm:w-11 sm:rounded-xl">
                    <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="max-w-full truncate rounded-full bg-[#1B6B3A] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#F8F5F2] sm:px-2.5 sm:py-1 sm:text-[10px]">
                    {service.badge}
                  </span>
                </div>

                <h3 className="mt-2.5 font-sans text-xs font-bold leading-snug text-[#F8F5F2] group-hover:text-[#E7C45B] sm:mt-5 sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-snug text-[#D4C9C4] sm:mt-2.5 sm:line-clamp-none sm:text-sm sm:leading-relaxed">
                  {service.description}
                </p>

                <span className="mt-2.5 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#E7C45B] sm:mt-5 sm:text-xs sm:tracking-[0.15em]">
                  <span>Akses Layanan</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section
        id="agenda-event"
        aria-labelledby="home-event-heading"
        className="border-y border-[#E7C45B]/15 bg-[#23040B]"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E7C45B] sm:text-xs sm:tracking-[0.22em]">
              <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Agenda &amp; Pendaftaran Kegiatan</span>
            </span>
            <h2
              id="home-event-heading"
              className="mt-1 font-sans text-xl font-bold text-[#F8F5F2] sm:mt-2 sm:text-3xl"
            >
              Event &amp; Seminar DEMA FSH
            </h2>
            <p className="mx-auto mt-1 hidden max-w-2xl text-sm text-[#D4C9C4] sm:block">
              Ikuti seminar nasional, sekolah advokasi, diskusi publik, dan kompetisi hukum melalui pendaftaran resmi Google Form.
            </p>
            <Link
              href="/event"
              className="mt-0.5 inline-flex min-h-11 items-center text-xs font-semibold text-[#E7C45B] transition-colors hover:text-[#F8F5F2] sm:text-sm"
            >
              <span>Lihat Semua Event</span>
            </Link>
          </div>

          {featuredEvents.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-5 lg:grid-cols-4">
              {featuredEvents.map((ev) => (
                <EventCard key={ev.id} item={ev} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-[#E7C45B]/15 bg-[#2A050E] p-8 text-center sm:mt-8 sm:p-10">
              <p className="text-xs text-[#D4C9C4] sm:text-sm">
                Belum ada agenda event yang dipublikasikan saat ini. Cek berkala halaman{" "}
                <Link href="/event" className="font-semibold text-[#E7C45B] underline">
                  Event DEMA FSH
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E7C45B] sm:text-xs sm:tracking-[0.22em]">
            <Newspaper aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Portal Informasi &amp; Wacana</span>
          </span>
          <h2 className="mt-1 font-sans text-xl font-bold text-[#F8F5F2] sm:mt-2 sm:text-3xl">
            Kabar &amp; Kajian Terbaru
          </h2>
          <Link
            href="/berita"
            className="mt-0.5 inline-flex min-h-11 items-center text-xs font-semibold text-[#E7C45B] transition-colors hover:text-[#F8F5F2] sm:text-sm"
          >
            <span>Jelajahi Portal Berita</span>
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-5 lg:grid-cols-4">
            {latestPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-[#E7C45B]/15 bg-[#2A050E] p-8 text-center sm:mt-8 sm:p-10">
            <p className="text-xs text-[#D4C9C4] sm:text-sm">
              Belum ada artikel berita yang tersedia saat ini.
            </p>
          </div>
        )}
      </section>

      <section
        id="ruang-aspirasi"
        aria-labelledby="home-aspirasi-heading"
        className="border-y border-[#E7C45B]/15 bg-[#23040B]"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-5 flex flex-col items-center text-center sm:mb-9">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E7C45B] sm:text-xs sm:tracking-[0.22em]">
              <MessageSquareQuote aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Advokasi &amp; Pengawalan Kebijakan</span>
            </span>
            <h2
              id="home-aspirasi-heading"
              className="mt-1 font-sans text-xl font-bold text-[#F8F5F2] sm:mt-2 sm:text-3xl"
            >
              Ruang Aspirasi Mahasiswa FSH
            </h2>
            <p className="mx-auto mt-1 hidden max-w-2xl text-sm text-[#D4C9C4] sm:block">
              Sampaikan masukan, keluhan layanan kampus, atau advokasi akademik langsung dari beranda dan pantau tindak lanjutnya lewat kode tiket.
            </p>
            <Link
              href="/aspirasi"
              className="mt-0.5 inline-flex min-h-11 items-center text-xs font-semibold text-[#E7C45B] transition-colors hover:text-[#F8F5F2] sm:text-sm"
            >
              <span>Buka Halaman Penuh Ruang Aspirasi</span>
            </Link>
          </div>

          <AspirasiClient compact initialTracked={sampleTicket.data} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E7C45B] sm:text-xs sm:tracking-[0.22em]">
            Apresiasi Mahasiswa FSH
          </span>
          <h2 className="mt-1 font-sans text-xl font-bold text-[#F8F5F2] sm:mt-2 sm:text-3xl">
            Mahasiswa Berprestasi
          </h2>
          <Link
            href="/prestasi"
            className="mt-0.5 inline-flex min-h-11 items-center text-xs font-semibold text-[#E7C45B] transition-colors hover:text-[#F8F5F2] sm:text-sm"
          >
            <span>Lihat Semua Galeri</span>
          </Link>
        </div>

        <AchieverCarousel achievements={achievements} />
      </section>
    </div>
  );
}
