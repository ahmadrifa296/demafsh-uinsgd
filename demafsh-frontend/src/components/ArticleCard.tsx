import Link from "next/link";
import { Calendar, Eye, Newspaper } from "lucide-react";
import { formatDateID, getImageUrl, type Post } from "@/lib/api";

interface ArticleCardProps {
  post: Post;
}

function getBadgeTextColor(bgHex?: string | null): string {
  const hex = (bgHex || "").replace("#", "");
  if (hex.length !== 6) return "#F8F5F2";
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const toLin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  const lum = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  return lum > 0.25 ? "#160207" : "#FFFFFF";
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const thumbUrl = getImageUrl(post.thumbnail_url ?? post.thumbnail);
  const bgColor = post.category?.color || "#6E1127";

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E7C45B]/15 bg-[#2A050E]/90 transition-colors duration-200 hover:border-[#E7C45B]/50 sm:rounded-2xl">
      <Link
        href={`/berita/${post.slug}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#4A0B1B] sm:aspect-[16/10]"
      >
        {thumbUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumbUrl}
            alt={post.title}
            width={640}
            height={400}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#23040B] p-4 text-center sm:p-6">
            <Newspaper
              aria-hidden="true"
              className="h-7 w-7 text-[#E7C45B] sm:h-10 sm:w-10"
            />
            <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D4C9C4] sm:mt-2 sm:text-[11px] sm:tracking-[0.2em]">
              DEMA FSH Editorial
            </span>
          </div>
        )}
        {post.category && (
          <span
            className="absolute left-2 top-2 max-w-[calc(100%-16px)] truncate rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow sm:left-3.5 sm:top-3.5 sm:px-3 sm:py-1 sm:text-[11px]"
            style={{
              backgroundColor: bgColor,
              color: getBadgeTextColor(bgColor),
            }}
          >
            {post.category.name}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-[#D4C9C4] sm:gap-3 sm:text-xs">
          <span className="inline-flex items-center gap-1 sm:gap-1.5">
            <Calendar
              aria-hidden="true"
              className="h-3 w-3 text-[#E7C45B] sm:h-3.5 sm:w-3.5"
            />
            {formatDateID(post.published_at)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye
              aria-hidden="true"
              className="h-3 w-3 text-[#E7C45B] sm:h-3.5 sm:w-3.5"
            />
            {post.views}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 font-sans text-xs font-bold leading-snug text-[#F8F5F2] transition-colors group-hover:text-[#E7C45B] sm:mt-3 sm:line-clamp-none sm:text-lg">
          <Link href={`/berita/${post.slug}`}>{post.title}</Link>
        </h3>

        {post.excerpt && (
          <p className="mt-1.5 hidden line-clamp-3 text-sm leading-relaxed text-[#D4C9C4] sm:mt-2.5 sm:block">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto pt-1.5 sm:pt-3">
          <Link
            href={`/berita/${post.slug}`}
            className="inline-flex min-h-11 items-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#E7C45B] transition-colors hover:text-[#F8F5F2] sm:text-xs sm:tracking-[0.14em]"
          >
            <span>Baca Selengkapnya</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
