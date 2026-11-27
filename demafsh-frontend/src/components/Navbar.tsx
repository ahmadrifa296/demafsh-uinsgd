"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MessageSquareQuote, X } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";

interface NavbarProps {
  period?: string;
  logoUrl?: string | null;
  instagramHandle?: string | null;
}

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/kabinet", label: "Kabinet" },
  { href: "/berita", label: "Berita" },
  { href: "/event", label: "Event" },
];

const LAYANAN_SUBMENU = [
  { href: "/aspirasi", label: "Aspirasi" },
  { href: "/prestasi", label: "Prestasi" },
  { href: "/layanan/media-partner", label: "Form Media Partner" },
  { href: "/layanan/peduli", label: "DEMA FSH Peduli" },
];

export default function Navbar({
  period = "2026–2027",
  logoUrl,
  instagramHandle,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(true);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const layananMenuRef = useRef<HTMLDivElement>(null);

  const igUsername =
    instagramHandle?.replace(/^@/, "").trim() || "demafshuinbdg";

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isLayananActive =
    isActive("/layanan") || isActive("/aspirasi") || isActive("/prestasi");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (layananOpen) setLayananOpen(false);
        if (mobileOpen) {
          setMobileOpen(false);
          toggleBtnRef.current?.focus();
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        layananMenuRef.current &&
        !layananMenuRef.current.contains(event.target as Node)
      ) {
        setLayananOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen, layananOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7C45B]/15 bg-[#160207]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-3 rounded-md">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#E7C45B]/55 bg-[#F8F5F2] sm:h-11 sm:w-11">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl || "/logo-demafsh.png"}
              alt="Logo DEMA FSH UIN SGD Bandung"
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <span className="block font-sans text-sm font-extrabold uppercase tracking-wide text-[#F8F5F2] sm:text-base">
              DEMA FSH
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E7C45B]">
              UIN SGD · {period}
            </span>
          </div>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 md:flex lg:gap-1.5"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${active
                  ? "border border-[#E7C45B]/30 bg-[#2A050E] font-semibold text-[#F8F5F2]"
                  : "text-[#D4C9C4] hover:bg-[#2A050E]/60 hover:text-[#F8F5F2]"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div
            ref={layananMenuRef}
            className="relative"
            onMouseEnter={() => setLayananOpen(true)}
            onMouseLeave={() => setLayananOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLayananOpen((prev) => !prev)}
              aria-expanded={layananOpen}
              aria-haspopup="true"
              aria-controls="desktop-layanan-menu"
              className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${isLayananActive
                ? "border border-[#E7C45B]/30 bg-[#2A050E] font-semibold text-[#F8F5F2]"
                : "text-[#D4C9C4] hover:bg-[#2A050E]/60 hover:text-[#F8F5F2]"
                }`}
            >
              <span>Layanan</span>
              <ChevronDown
                aria-hidden="true"
                className={`h-3.5 w-3.5 transition-transform duration-150 ${layananOpen ? "rotate-180 text-[#E7C45B]" : ""
                  }`}
              />
            </button>

            {layananOpen && (
              <div
                id="desktop-layanan-menu"
                role="menu"
                aria-label="Submenu Layanan"
                className="absolute left-0 top-full w-56 pt-1.5"
              >
                <div className="rounded-xl border border-[#E7C45B]/25 bg-[#2A050E] p-1.5 shadow-2xl">
                  {LAYANAN_SUBMENU.map((sub) => {
                    const subActive = isActive(sub.href);
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        role="menuitem"
                        onClick={() => setLayananOpen(false)}
                        className={`flex min-h-11 items-center rounded-lg px-3.5 py-2 text-sm transition-colors ${subActive
                          ? "bg-[#4A0B1B] font-semibold text-[#E7C45B]"
                          : "text-[#F8F5F2] hover:bg-[#4A0B1B]/70 hover:text-[#E7C45B]"
                          }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`https://instagram.com/${igUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram resmi @${igUsername}`}
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-lg text-[#D4C9C4] transition-colors hover:bg-[#2A050E] hover:text-[#E7C45B] sm:inline-flex"
          >
            <InstagramIcon aria-hidden="true" className="h-5 w-5" />
          </a>

          <Link
            href="/aspirasi"
            className={`hidden min-h-11 items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-colors md:inline-flex ${isActive("/aspirasi")
              ? "bg-[#E7C45B] text-[#160207]"
              : "bg-[#1B6B3A] text-[#F8F5F2] hover:bg-[#15572F]"
              }`}
          >
            <MessageSquareQuote aria-hidden="true" className="h-4 w-4" />
            <span>Ruang Aspirasi</span>
          </Link>

          <button
            ref={toggleBtnRef}
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg border border-[#E7C45B]/30 bg-[#2A050E] px-3 text-xs font-bold text-[#F8F5F2] transition-colors hover:border-[#E7C45B] md:hidden"
          >
            {mobileOpen ? (
              <>
                <X aria-hidden="true" className="h-4 w-4 text-[#E7C45B]" />
                <span>Tutup</span>
              </>
            ) : (
              <>
                <Menu aria-hidden="true" className="h-4 w-4 text-[#E7C45B]" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-[#E7C45B]/20 bg-[#160207] px-4 pb-5 pt-3 md:hidden"
        >
          <nav aria-label="Navigasi seluler" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-11 items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${active
                    ? "border border-[#E7C45B]/30 bg-[#2A050E] font-semibold text-[#E7C45B]"
                    : "text-[#D4C9C4] hover:bg-[#2A050E] hover:text-[#F8F5F2]"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-1">
              <button
                type="button"
                onClick={() => setMobileLayananOpen((prev) => !prev)}
                aria-expanded={mobileLayananOpen}
                className={`flex min-h-11 w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isLayananActive
                  ? "border border-[#E7C45B]/30 bg-[#2A050E] font-semibold text-[#E7C45B]"
                  : "text-[#D4C9C4] hover:bg-[#2A050E] hover:text-[#F8F5F2]"
                  }`}
              >
                <span>Layanan</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${mobileLayananOpen ? "rotate-180 text-[#E7C45B]" : ""
                    }`}
                />
              </button>

              {mobileLayananOpen && (
                <div className="mt-1 space-y-1 border-l border-[#E7C45B]/25 pl-4 ml-4">
                  {LAYANAN_SUBMENU.map((sub) => {
                    const subActive = isActive(sub.href);
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex min-h-11 items-center rounded-lg px-3 py-2 text-sm transition-colors ${subActive
                          ? "bg-[#2A050E] font-semibold text-[#E7C45B]"
                          : "text-[#D4C9C4] hover:bg-[#2A050E] hover:text-[#F8F5F2]"
                          }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/aspirasi"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1B6B3A] px-4 py-2.5 text-sm font-bold text-[#F8F5F2]"
            >
              <MessageSquareQuote aria-hidden="true" className="h-4 w-4" />
              <span>Ruang Aspirasi</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
