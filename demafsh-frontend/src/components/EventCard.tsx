import Link from "next/link";
import { CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";
import { formatDateTimeID, getImageUrl, type EventItem } from "@/lib/api";

interface EventCardProps {
  item: EventItem;
}

export default function EventCard({ item }: EventCardProps) {
  const posterUrl = getImageUrl(item.poster_url ?? item.poster);
  const canRegister =
    item.is_registration_open && Boolean(item.registration_url);

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E7C45B]/20 bg-[#2A050E]/90 transition-colors hover:border-[#E7C45B]/55 sm:rounded-2xl">
      <Link
        href={`/event/${item.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-[#4A0B1B] sm:aspect-[16/10]"
      >
        {posterUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={posterUrl}
            alt={item.title}
            width={640}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#6E1127]/75 via-[#4A0B1B] to-[#160207] p-4 sm:p-6">
            <CalendarDays
              aria-hidden="true"
              className="h-7 w-7 text-[#E7C45B] sm:h-11 sm:w-11"
            />
            <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#D4C9C4] sm:mt-2 sm:text-[11px] sm:tracking-[0.2em]">
              {item.category}
            </span>
          </div>
        )}

        <span className="absolute left-1.5 top-1.5 max-w-[calc(58%-6px)] truncate rounded-full bg-[#E7C45B] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#160207] sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
          {item.category}
        </span>

        <span
          className={`absolute right-1.5 top-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px] ${
            item.is_registration_open
              ? "bg-[#1B6B3A] text-[#F8F5F2]"
              : "bg-[#4A0B1B] text-[#E7C45B]"
          }`}
        >
          {item.is_registration_open ? "Buka" : "Tutup"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-2.5 sm:p-5">
        <div className="space-y-0.5 text-[10px] text-[#D4C9C4] sm:space-y-1 sm:text-xs">
          <p className="flex items-center gap-1 sm:gap-1.5">
            <Clock
              aria-hidden="true"
              className="h-3 w-3 shrink-0 text-[#E7C45B] sm:h-3.5 sm:w-3.5"
            />
            <span className="truncate">{formatDateTimeID(item.event_date)}</span>
          </p>
          {item.location && (
            <p className="hidden items-center gap-1.5 sm:flex">
              <MapPin
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-[#E7C45B]"
              />
              <span className="truncate">{item.location}</span>
            </p>
          )}
        </div>

        <h3 className="mt-1.5 line-clamp-2 font-sans text-xs font-bold leading-snug text-[#F8F5F2] transition-colors group-hover:text-[#E7C45B] sm:mt-3 sm:line-clamp-none sm:text-base lg:text-lg">
          <Link href={`/event/${item.slug}`}>{item.title}</Link>
        </h3>

        <p className="mt-2 hidden line-clamp-2 text-sm leading-relaxed text-[#D4C9C4] sm:block">
          {item.description}
        </p>

        <div className="mt-auto flex flex-col gap-1 pt-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-4">
          {canRegister ? (
            <a
              href={item.registration_url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full bg-[#1B6B3A] px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#F8F5F2] transition-colors hover:bg-[#15572F] sm:px-4 sm:text-xs"
            >
              <span>Daftar Form</span>
              <ExternalLink aria-hidden="true" className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E7C45B]/25 bg-[#160207] px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#D4C9C4] sm:px-3.5 sm:text-xs">
              {item.is_registration_open
                ? "Link Menyusul"
                : "Pendaftaran Tutup"}
            </span>
          )}

          <Link
            href={`/event/${item.slug}`}
            className="inline-flex min-h-11 items-center justify-center text-[10px] font-bold uppercase tracking-wider text-[#E7C45B] transition-colors hover:text-[#F8F5F2] sm:text-xs"
          >
            Detail Acara
          </Link>
        </div>
      </div>
    </article>
  );
}
