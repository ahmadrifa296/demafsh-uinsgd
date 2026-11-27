import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  UserCheck,
} from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import ShareButtons from "@/components/ShareButtons";
import {
  estimateReadingTime,
  fetchPostBySlug,
  formatDateID,
  getImageUrl,
} from "@/lib/api";

export const dynamic = "force-dynamic";

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await fetchPostBySlug(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  const imageUrl = getImageUrl(post.thumbnail_url ?? post.thumbnail);

  return {
    title: post.title,
    description:
      post.excerpt ||
      `Berita dan kajian resmi DEMA Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung: ${post.title}`,
    openGraph: {
      title: post.title,
      description:
        post.excerpt ||
        "Portal Berita Resmi DEMA FSH UIN Sunan Gunung Djati Bandung",
      type: "article",
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : undefined,
    },
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const { post, related } = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const thumbUrl = getImageUrl(post.thumbnail_url ?? post.thumbnail);
  const readingMinutes = estimateReadingTime(post.content);

  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E7C45B] transition-colors hover:text-[#F8F5F2]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Portal Berita</span>
        </Link>

        <header className="mt-6">
          {post.category && (
            <span
              className="inline-block rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: post.category.color || "#6E1127" }}
            >
              {post.category.name}
            </span>
          )}

          <h1 className="mt-4 font-sans text-3xl font-extrabold leading-tight text-[#F8F5F2] sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[#E7C45B]/15 py-4 text-xs text-[#F8F5F2]/75 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-[#E7C45B]" />
              <span>{post.author?.name || "Redaksi Kominfo DEMA FSH"}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#E7C45B]" />
              <span>{formatDateID(post.published_at)}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#E7C45B]" />
              <span>{readingMinutes} menit baca</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#E7C45B]" />
              <span>{post.views} kali dibaca</span>
            </span>
          </div>
        </header>

        {thumbUrl && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#E7C45B]/20 bg-[#2A050E]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl}
              alt={post.title}
              className="max-h-[480px] w-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-invert prose-lg mt-10 max-w-none prose-headings:font-sans prose-headings:text-[#F8F5F2] prose-p:leading-relaxed prose-p:text-[#F8F5F2]/85 prose-a:text-[#E7C45B] prose-strong:text-[#F8F5F2] prose-blockquote:border-[#E7C45B] prose-blockquote:text-[#F8F5F2]/80 prose-li:text-[#F8F5F2]/85"
          dangerouslySetInnerHTML={{
            __html: post.content || post.excerpt || "",
          }}
        />

        <div className="mt-12 flex flex-col justify-between gap-4 rounded-2xl border border-[#E7C45B]/20 bg-[#2A050E] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E7C45B]">
              Sebarkan Informasi
            </p>
            <p className="mt-1 text-sm text-[#F8F5F2]/80">
              Bagikan artikel ini kepada mahasiswa FSH lainnya.
            </p>
          </div>
          <ShareButtons title={post.title} />
        </div>
      </article>

      {/* Berita Terkait */}
      {related.length > 0 && (
        <section className="border-t border-[#E7C45B]/15 bg-[#2A050E]/40 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans text-2xl font-bold text-[#F8F5F2] sm:text-3xl">
              Berita &amp; Kajian Terkait
            </h2>
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
              {related.slice(0, 3).map((item) => (
                <ArticleCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
