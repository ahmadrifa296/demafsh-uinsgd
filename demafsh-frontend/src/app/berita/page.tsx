import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Newspaper,
  Sparkles,
} from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import BeritaFilters from "@/components/BeritaFilters";
import { fetchPosts, formatDateID, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portal Berita & Kajian",
  description:
    "Kumpulan berita kegiatan, kajian hukum & syariah, konsolidasi mahasiswa, pengumuman Open Recruitment, dan laporan DEMA FSH Peduli.",
};

interface BeritaPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function BeritaPage({ searchParams }: BeritaPageProps) {
  const params = await searchParams;
  const activeCategory = params.category || "";
  const searchQuery = params.search || "";
  const currentPage = Math.max(1, Number(params.page) || 1);

  const postsData = await fetchPosts({
    category: activeCategory || undefined,
    search: searchQuery || undefined,
    limit: 9,
    page: currentPage,
  });

  const featured = postsData.featured;
  const featuredThumb = getImageUrl(
    featured?.thumbnail_url ?? featured?.thumbnail
  );

  const buildPageHref = (targetPage: number) => {
    const query = new URLSearchParams();
    if (activeCategory) query.set("category", activeCategory);
    if (searchQuery) query.set("search", searchQuery);
    if (targetPage > 1) query.set("page", String(targetPage));
    const qs = query.toString();
    return qs ? `/berita?${qs}` : "/berita";
  };

  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      {/* Page Header */}
      <section className="border-b border-[#E7C45B]/15 bg-gradient-to-b from-[#2A050E] to-[#160207] py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E7C45B]/35 bg-[#4A0B1B]/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
            <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Pers &amp; Publikasi Resmi</span>
          </span>
          <h1 className="mt-4 font-sans text-3xl font-extrabold text-[#F8F5F2] sm:text-5xl">
            Portal Berita &amp; Kajian FSH
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#D4C9C4]">
            Informasi kegiatan organisasi, opini hukum dan kesyariahan, seruan
            konsolidasi, serta pengumuman resmi DEMA FSH UIN SGD Bandung.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        {/* Banner Headline Utama */}
        {featured && !activeCategory && !searchQuery && currentPage === 1 && (
          <section className="overflow-hidden rounded-3xl border border-[#E7C45B]/30 bg-gradient-to-br from-[#4A0B1B]/90 via-[#2A050E] to-[#160207] shadow-2xl">
            <div className="grid items-stretch lg:grid-cols-12">
              <Link
                href={`/berita/${featured.slug}`}
                className="relative min-h-[260px] overflow-hidden bg-[#4A0B1B] lg:col-span-6"
              >
                {featuredThumb ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={featuredThumb}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#6E1127] via-[#4A0B1B] to-[#160207] p-10 text-center">
                    <Sparkles className="h-12 w-12 text-[#E7C45B]" />
                    <span className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#E7C45B]">
                      Headline Utama DEMA FSH
                    </span>
                  </div>
                )}
                <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#E7C45B] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#160207]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Headline Utama
                </span>
              </Link>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#F8F5F2]/70">
                  {featured.category && (
                    <span
                      className="rounded-full px-3 py-1 font-bold uppercase tracking-wider text-white"
                      style={{
                        backgroundColor: featured.category.color || "#6E1127",
                      }}
                    >
                      {featured.category.name}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#E7C45B]" />
                    {formatDateID(featured.published_at)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-[#E7C45B]" />
                    {featured.views} dibaca
                  </span>
                </div>

                <h2 className="mt-4 font-sans text-2xl font-bold leading-snug text-[#F8F5F2] sm:text-3xl">
                  <Link
                    href={`/berita/${featured.slug}`}
                    className="transition-colors hover:text-[#E7C45B]"
                  >
                    {featured.title}
                  </Link>
                </h2>

                {featured.excerpt && (
                  <p className="mt-4 text-sm leading-relaxed text-[#F8F5F2]/80 sm:text-base">
                    {featured.excerpt}
                  </p>
                )}

                <div className="mt-6">
                  <Link
                    href={`/berita/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#E7C45B] px-5 py-2.5 text-sm font-bold text-[#160207] transition-colors hover:bg-[#C9A227]"
                  >
                    <span>Baca Liputan Utama</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filter Rubrik & Pencarian */}
        <BeritaFilters
          categories={postsData.categories}
          activeCategory={activeCategory}
          initialSearch={searchQuery}
        />

        {/* Grid Artikel Shopee-style 2 Kolom di Mobile */}
        {postsData.data.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
            {postsData.data.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#E7C45B]/15 bg-[#2A050E]/80 p-14 text-center">
            <Newspaper className="mx-auto h-10 w-10 text-[#E7C45B]/60" />
            <h3 className="mt-4 font-sans text-xl font-bold text-[#F8F5F2]">
              Artikel Tidak Ditemukan
            </h3>
            <p className="mt-2 text-sm text-[#F8F5F2]/70">
              Coba ubah kata kunci pencarian atau pilih kategori berita lainnya.
            </p>
          </div>
        )}

        {/* Pagination */}
        {postsData.meta.last_page > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            {currentPage > 1 && (
              <Link
                href={buildPageHref(currentPage - 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-[#E7C45B]/25 bg-[#2A050E] px-3.5 py-2 text-xs font-semibold text-[#F8F5F2] hover:border-[#E7C45B]"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Sebelumnya</span>
              </Link>
            )}

            {Array.from(
              { length: postsData.meta.last_page },
              (_, i) => i + 1
            ).map((pageNum) => (
              <Link
                key={pageNum}
                href={buildPageHref(pageNum)}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                  pageNum === currentPage
                    ? "bg-[#E7C45B] text-[#160207]"
                    : "border border-[#E7C45B]/25 bg-[#2A050E] text-[#F8F5F2] hover:border-[#E7C45B]"
                }`}
              >
                {pageNum}
              </Link>
            ))}

            {currentPage < postsData.meta.last_page && (
              <Link
                href={buildPageHref(currentPage + 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-[#E7C45B]/25 bg-[#2A050E] px-3.5 py-2 text-xs font-semibold text-[#F8F5F2] hover:border-[#E7C45B]"
              >
                <span>Berikutnya</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
