"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface EventFiltersProps {
  categories: string[];
  activeCategory: string;
  initialSearch: string;
}

export default function EventFilters({
  categories,
  activeCategory,
  initialSearch,
}: EventFiltersProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(initialSearch);

  const navigateWithParams = (nextCategory: string, nextSearch: string) => {
    const params = new URLSearchParams();
    if (nextCategory) params.set("category", nextCategory);
    if (nextSearch.trim()) params.set("search", nextSearch.trim());
    const qs = params.toString();
    router.push(qs ? `/event?${qs}` : "/event");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateWithParams(activeCategory, searchValue);
  };

  const handleClear = () => {
    setSearchValue("");
    navigateWithParams("", "");
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div
        role="group"
        aria-label="Filter jenis kegiatan"
        className="flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          onClick={() => navigateWithParams("", searchValue)}
          aria-pressed={!activeCategory}
          className={`min-h-11 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            !activeCategory
              ? "bg-[#E7C45B] text-[#160207] shadow"
              : "border border-[#E7C45B]/25 bg-[#2A050E] text-[#D4C9C4] hover:border-[#E7C45B]/60 hover:text-[#F8F5F2]"
          }`}
        >
          Semua Event
        </button>

        {categories.map((cat) => {
          const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => navigateWithParams(cat, searchValue)}
              aria-pressed={isSelected}
              className={`min-h-11 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                isSelected
                  ? "bg-[#E7C45B] text-[#160207] shadow"
                  : "border border-[#E7C45B]/25 bg-[#2A050E] text-[#D4C9C4] hover:border-[#E7C45B]/60 hover:text-[#F8F5F2]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={handleSearchSubmit}
        role="search"
        className="flex w-full items-center gap-2 lg:w-80"
      >
        <div className="relative flex-1">
          <label htmlFor="event-search" className="sr-only">
            Cari nama seminar, lomba, atau lokasi
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E7C45B]"
          />
          <input
            id="event-search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Cari seminar atau event..."
            className="min-h-11 w-full rounded-full border border-[#E7C45B]/25 bg-[#2A050E] py-2.5 pl-10 pr-10 text-sm text-[#F8F5F2] placeholder-[#C7B8B3] focus:border-[#E7C45B]"
          />
          {(searchValue || activeCategory) && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Reset filter event"
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#D4C9C4] hover:text-[#E7C45B]"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="min-h-11 shrink-0 rounded-full bg-[#4A0B1B] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F8F5F2] ring-1 ring-[#E7C45B]/35 transition-colors hover:bg-[#6E1127]"
        >
          Cari
        </button>
      </form>
    </div>
  );
}
