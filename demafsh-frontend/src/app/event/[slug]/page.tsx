import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";
import {
  fetchEventBySlug,
  formatDateTimeID,
  getImageUrl,
} from "@/lib/api";

export const dynamic = "force-dynamic";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await fetchEventBySlug(slug);

  if (!event) {
    return { title: "Event Tidak Ditemukan" };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await fetchEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const posterUrl = getImageUrl(event.poster_url ?? event.poster);
  const canRegister =
    event.is_registration_open && Boolean(event.registration_url);

  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/event"
          className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E7C45B] transition-colors hover:text-[#F8F5F2]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          <span>Kembali ke Daftar Event</span>
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[#E7C45B] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#160207]">
              {event.category}
            </span>
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${
                event.is_registration_open
                  ? "bg-[#1B6B3A] text-[#F8F5F2]"
                  : "bg-[#4A0B1B] text-[#E7C45B]"
              }`}
            >
              {event.is_registration_open
                ? "Pendaftaran Dibuka"
                : "Pendaftaran Ditutup"}
            </span>
          </div>

          <h1 className="mt-4 font-sans text-3xl font-extrabold leading-tight text-[#F8F5F2] sm:text-4xl lg:text-[2.65rem]">
            {event.title}
          </h1>

          <div className="mt-6 grid gap-3 rounded-2xl border border-[#E7C45B]/20 bg-[#2A050E] p-5 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#E7C45B]" />
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#E7C45B]">
                  Waktu Pelaksanaan
                </span>
                <span className="mt-0.5 block text-sm text-[#F8F5F2]">
                  {formatDateTimeID(event.event_date)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#E7C45B]" />
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#E7C45B]">
                  Lokasi
                </span>
                <span className="mt-0.5 block text-sm text-[#F8F5F2]">
                  {event.location || "Menyusul"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#E7C45B]" />
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#E7C45B]">
                  Penyelenggara
                </span>
                <span className="mt-0.5 block text-sm text-[#F8F5F2]">
                  {event.organizer || "DEMA FSH UIN SGD Bandung"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {posterUrl && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#E7C45B]/25 bg-[#2A050E]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterUrl}
              alt={event.title}
              width={1200}
              height={675}
              fetchPriority="high"
              className="max-h-[540px] w-full object-cover"
            />
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-[#E7C45B]/15 bg-[#2A050E]/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            <span>Deskripsi Kegiatan</span>
          </div>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-[#F8F5F2]">
            {event.description}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E7C45B]/30 bg-[#2A050E] p-6 sm:flex-row">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E7C45B]">
              Pendaftaran Peserta (Google Form)
            </p>
            <p className="mt-1 text-sm text-[#D4C9C4]">
              {canRegister
                ? "Klik tombol di samping untuk mengisi formulir pendaftaran resmi."
                : event.is_registration_open
                  ? "Tautan Google Form sedang disiapkan oleh panitia."
                  : "Pendaftaran untuk kegiatan ini telah ditutup."}
            </p>
          </div>

          {canRegister ? (
            <a
              href={event.registration_url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#1B6B3A] px-6 py-3 text-sm font-bold text-[#F8F5F2] shadow-lg transition-colors hover:bg-[#15572F]"
            >
              <span>Daftar via Google Form</span>
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : (
            <span className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-[#E7C45B]/30 bg-[#160207] px-5 py-2.5 text-sm font-bold text-[#D4C9C4]">
              {event.is_registration_open ? "Segera Hadir" : "Ditutup"}
            </span>
          )}
        </div>
      </article>
    </div>
  );
}
