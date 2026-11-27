import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import { fetchEvents } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Event & Seminar Mahasiswa",
  description:
    "Jadwal resmi seminar, diskusi publik, workshop, pelatihan, dan pendaftaran kegiatan DEMA Fakultas Syariah dan Hukum UIN SGD Bandung via Google Form.",
};

interface EventPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function EventPage({ searchParams }: EventPageProps) {
  const params = await searchParams;
  const activeCategory = params.category || "";
  const searchQuery = params.search || "";

  const eventsRes = await fetchEvents({
    category: activeCategory || undefined,
    search: searchQuery || undefined,
  });

  const events = eventsRes.data;

  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <section className="border-b border-[#E7C45B]/15 bg-gradient-to-b from-[#2A050E] to-[#160207] py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E7C45B]/35 bg-[#4A0B1B]/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Agenda &amp; Pendaftaran Kegiatan</span>
          </span>
          <h1 className="mt-4 font-sans text-3xl font-extrabold text-[#F8F5F2] sm:text-5xl">
            Event &amp; Seminar FSH
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#D4C9C4]">
            Temukan informasi seminar nasional, pelatihan hukum, dan diskusi
            publik DEMA FSH serta daftar langsung melalui tautan Google Form
            resmi.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <EventFilters
          categories={eventsRes.categories}
          activeCategory={activeCategory}
          initialSearch={searchQuery}
        />

        <section aria-labelledby="daftar-event-heading">
          <div className="mb-6 flex flex-col items-center text-center">
            <h2
              id="daftar-event-heading"
              className="font-sans text-2xl font-bold text-[#F8F5F2] sm:text-3xl"
            >
              Daftar Kegiatan &amp; Seminar
            </h2>
            <p className="mt-1 text-xs text-[#D4C9C4] sm:text-sm">
              Menampilkan {events.length} agenda kegiatan DEMA FSH
            </p>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
              {events.map((item) => (
                <EventCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#E7C45B]/15 bg-[#2A050E]/80 p-12 text-center">
              <CalendarDays
                aria-hidden="true"
                className="mx-auto h-10 w-10 text-[#E7C45B]"
              />
              <h3 className="mt-4 font-sans text-xl font-bold text-[#F8F5F2]">
                Belum Ada Event Sesuai Pencarian
              </h3>
              <p className="mt-2 text-sm text-[#D4C9C4]">
                Ubah kata kunci pencarian atau pilih kategori kegiatan lain.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
