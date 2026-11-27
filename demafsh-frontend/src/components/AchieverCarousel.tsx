"use client";

import { useState } from "react";
import Link from "next/link";
import { Pause, Play, PlusCircle, Trophy } from "lucide-react";
import { getImageUrl, type Achievement } from "@/lib/api";

interface AchieverCarouselProps {
  achievements: Achievement[];
}

export default function AchieverCarousel({
  achievements,
}: AchieverCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);

  if (achievements.length === 0) {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#E7C45B]/20 bg-[#2A050E] p-6 text-center">
        <Trophy aria-hidden="true" className="mx-auto h-8 w-8 text-[#E7C45B]" />
        <p className="mt-2 text-xs text-[#D4C9C4] sm:text-sm">
          Belum ada data mahasiswa berprestasi yang dipublikasikan.
        </p>
        <div className="mt-4 flex justify-center">
          <Link
            href="/prestasi/ajukan"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E7C45B]/50 bg-[#160207] px-4 py-1.5 text-xs font-semibold text-[#E7C45B] transition-colors hover:bg-[#E7C45B] hover:text-[#160207]"
          >
            <PlusCircle aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Ajukan Prestasi</span>
          </Link>
        </div>
      </div>
    );
  }

  // Repeat base items so half-track always exceeds desktop viewport width for seamless looping.
  const minTrackCards = 6;
  const repeatFactor =
    achievements.length < minTrackCards
      ? Math.ceil(minTrackCards / achievements.length)
      : 1;
  const halfTrack: Array<{ item: Achievement; primary: boolean; key: string }> =
    [];

  for (let r = 0; r < repeatFactor; r += 1) {
    for (const item of achievements) {
      halfTrack.push({
        item,
        primary: r === 0,
        key: `a-${r}-${item.id}`,
      });
    }
  }

  const fullTrack = [
    ...halfTrack,
    ...halfTrack.map((entry, idx) => ({
      item: entry.item,
      primary: false,
      key: `b-${idx}-${entry.item.id}`,
    })),
  ];

  const durationSeconds = Math.max(20, halfTrack.length * 4.5);

  return (
    <div className="mt-6">
      <div
        role="region"
        aria-label="Galeri mahasiswa berprestasi bergerak otomatis"
        className="relative overflow-hidden py-1"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#160207] to-transparent sm:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#160207] to-transparent sm:w-16"
        />

        <div
          className="animate-marquee-scroll flex w-max gap-3 sm:gap-5"
          style={{
            animationDuration: `${durationSeconds}s`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {fullTrack.map(({ item, primary, key }) => {
            const photoUrl = getImageUrl(item.photo_url ?? item.photo);

            return (
              <Link
                key={key}
                href="/prestasi"
                tabIndex={primary ? 0 : -1}
                aria-hidden={!primary || undefined}
                className="group relative block aspect-square w-40 shrink-0 overflow-hidden rounded-xl border border-[#E7C45B]/25 bg-[#2A050E] transition-colors hover:border-[#E7C45B] sm:w-56 sm:rounded-2xl md:w-64"
              >
                {photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={photoUrl}
                    alt={primary ? `${item.student_name} - ${item.rank}` : ""}
                    width={320}
                    height={320}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#6E1127]/75 via-[#4A0B1B] to-[#160207] pb-12">
                    <Trophy
                      aria-hidden="true"
                      className="h-9 w-9 text-[#E7C45B] sm:h-11 sm:w-11"
                    />
                    <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4C9C4]">
                      {item.level}
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#160207] via-[#160207]/85 to-transparent p-2.5 pt-8 sm:p-4">
                  <span className="inline-block max-w-full truncate rounded-full bg-[#E7C45B] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#160207] sm:text-[10px]">
                    {item.rank}
                  </span>
                  <p className="mt-1 truncate font-sans text-xs font-bold text-[#F8F5F2] sm:text-sm">
                    {item.student_name}
                  </p>
                  <p className="truncate text-[10px] text-[#D4C9C4] sm:text-[11px]">
                    {item.major}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <Link
          href="/prestasi/ajukan"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#E7C45B]/50 bg-[#2A050E] px-4 py-1.5 text-xs font-semibold text-[#E7C45B] transition-colors hover:bg-[#E7C45B] hover:text-[#160207]"
        >
          <PlusCircle aria-hidden="true" className="h-3.5 w-3.5" />
          <span>Ajukan Prestasi</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-pressed={isPaused}
          aria-label={
            isPaused
              ? "Putar geser otomatis galeri prestasi"
              : "Jeda geser otomatis galeri prestasi"
          }
          className="inline-flex items-center gap-1.5 rounded-full border border-[#E7C45B]/25 bg-[#2A050E]/70 px-3 py-1.5 text-xs font-medium text-[#D4C9C4] transition-colors hover:border-[#E7C45B]/60 hover:text-[#F8F5F2]"
        >
          {isPaused ? (
            <>
              <Play aria-hidden="true" className="h-3 w-3 text-[#E7C45B]" />
              <span>Putar</span>
            </>
          ) : (
            <>
              <Pause aria-hidden="true" className="h-3 w-3 text-[#E7C45B]" />
              <span>Jeda</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
