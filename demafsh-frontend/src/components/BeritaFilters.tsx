"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { PostCategory } from "@/lib/api";

interface BeritaFiltersProps {
  categories: PostCategory[];
  activeCategory: string;
  initialSearch: string;
}

export default function BeritaFilters({
  categories,
  activeCategory,
  initialSearch,
}: BeritaFiltersProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(initialSearch);

  const navigateWithParams = (nextCategory: string, nextSearch: string) => {
    const params = new URLSearchParams();
    if (nextCategory) params.set("category", nextCategory);
    if (nextSearch.trim()) params.set("search", nextSearch.trim());
    const qs = params.toString();
    router.push(qs ? `/berita?${qs}` : "/berita");
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
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => navigateWithParams("", searchValue)}
          className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
            !activeCategory
              ? "bg-[#E7C45B] text-[#160207] shadow"
              : "border border-[#E7C45B]/25 bg-[#2A050E] text-[#F8F5F2]/80 hover:border-[#E7C45B]/60 hover:text-[#F8F5F2]"
          }`}
        >
          Semua Rubrik
        </button>

        {categories.map((cat) => {
          const isSelected = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigateWithParams(cat.slug, searchValue)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                isSelected
                  ? "bg-[#E7C45B] text-[#160207] shadow"
                  : "border border-[#E7C45B]/25 bg-[#2A050E] text-[#F8F5F2]/80 hover:border-[#E7C45B]/60 hover:text-[#F8F5F2]"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={handleSearchSubmit}
        className="flex w-full items-center gap-2 lg:w-80"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E7C45B]" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Cari judul atau topik..."
            className="w-full rounded-full border border-[#E7C45B]/25 bg-[#2A050E] py-2.5 pl-10 pr-9 text-sm text-[#F8F5F2] placeholder-[#F8F5F2]/45 focus:border-[#E7C45B] focus:outline-none"
          />
          {(searchValue || activeCategory) && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Reset filter"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8F5F2]/55 hover:text-[#E7C45B]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="rounded-full bg-[#6E1127] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F8F5F2] ring-1 ring-[#E7C45B]/35 transition-colors hover:bg-[#E7C45B] hover:text-[#160207]"
        >
          Cari
        </button>
      </form>
    </div>
  );
}
