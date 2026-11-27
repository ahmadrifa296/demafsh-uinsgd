import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { fetchSiteSettings, getImageUrl } from "@/lib/api";

export default async function Footer() {
  const settings = await fetchSiteSettings();
  const logoSrc =
    getImageUrl(settings.logo_url ?? settings.logo) || "/logo-demafsh.png";
  const igUsername =
    settings.instagram_handle?.replace(/^@/, "") || "demafshuinbdg";

  return (
    <footer className="border-t border-[#E7C45B]/20 bg-[#160207] text-[#F8F5F2]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#E7C45B]/50 bg-[#F8F5F2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoSrc}
                  alt={settings.organization_name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-sans text-lg font-bold text-[#F8F5F2]">
                  {settings.organization_name}
                </h2>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E7C45B]">
                  Periode Kepengurusan {settings.period}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#D4C9C4]">
              {settings.hero_subtitle ||
                "Dewan Eksekutif Mahasiswa Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung: Mengawal keadilan, memperkuat kajian ilmiah, dan melayani mahasiswa secara inklusif."}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
              Navigasi Portal
            </h3>
            <ul className="mt-3 space-y-1 text-xs sm:text-sm text-[#D4C9C4]">
              <li>
                <Link
                  href="/"
                  className="inline-block py-1 transition-colors hover:text-[#E7C45B]"
                >
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link
                  href="/kabinet"
                  className="inline-block py-1 transition-colors hover:text-[#E7C45B]"
                >
                  Profil &amp; Struktur Kabinet
                </Link>
              </li>
              <li>
                <Link
                  href="/berita"
                  className="inline-block py-1 transition-colors hover:text-[#E7C45B]"
                >
                  Portal Berita &amp; Kajian
                </Link>
              </li>
              <li>
                <Link
                  href="/aspirasi"
                  className="inline-block py-1 transition-colors hover:text-[#E7C45B]"
                >
                  Ruang Aspirasi Mahasiswa
                </Link>
              </li>
              <li>
                <Link
                  href="/event"
                  className="inline-block py-1 transition-colors hover:text-[#E7C45B]"
                >
                  Event &amp; Seminar FSH
                </Link>
              </li>
              <li>
                <Link
                  href="/prestasi"
                  className="inline-block py-1 transition-colors hover:text-[#E7C45B]"
                >
                  Hall of Fame Prestasi
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan/media-partner"
                  className="inline-block py-1 transition-colors hover:text-[#E7C45B]"
                >
                  Form Media Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan/peduli"
                  className="inline-block py-1 transition-colors hover:text-[#E7C45B]"
                >
                  DEMA FSH Peduli
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
              Sekretariat &amp; Kontak
            </h3>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#D4C9C4]">
              {settings.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#E7C45B]"
                  />
                  <span className="leading-relaxed">{settings.address}</span>
                </li>
              )}
              {settings.email && (
                <li className="flex items-center gap-2.5">
                  <Mail
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#E7C45B]"
                  />
                  <a
                    href={`mailto:${settings.email}`}
                    className="py-1 transition-colors hover:text-[#E7C45B]"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <InstagramIcon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[#E7C45B]"
                />
                <a
                  href={`https://instagram.com/${igUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 transition-colors hover:text-[#E7C45B]"
                >
                  {settings.instagram_handle || "@demafshuinbdg"}
                </a>
              </li>
              {settings.whatsapp && (
                <li className="flex items-center gap-2.5">
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#E7C45B]"
                  />
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1 transition-colors hover:text-[#E7C45B]"
                  >
                    +{settings.whatsapp.replace(/\D/g, "")}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E7C45B]/15 pt-6 text-xs text-[#D4C9C4] sm:flex-row">
          <p>
            &copy; {settings.period} DEMA Fakultas Syariah dan Hukum UIN Sunan
            Gunung Djati Bandung.
          </p>
          <p className="text-[#E7C45B]">
            {settings.cabinet_name || "Kabinet Andalusia"} · Integritas Syariah
            &amp; Hukum
          </p>
        </div>
      </div>
    </footer>
  );
}
