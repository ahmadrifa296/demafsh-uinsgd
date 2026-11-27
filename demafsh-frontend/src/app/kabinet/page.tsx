import type { Metadata } from "next";
import { Compass, Target, UserRound } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { fetchCabinet, fetchSiteSettings, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profil & Struktur Kabinet Andalusia",
  description:
    "Visi, Misi, serta susunan lengkap Badan Pengurus Harian dan Departemen Kabinet Andalusia DEMA Fakultas Syariah dan Hukum UIN SGD Bandung periode 2026–2027.",
};

export default async function KabinetPage() {
  const [settings, departments] = await Promise.all([
    fetchSiteSettings(),
    fetchCabinet(),
  ]);

  const logoSrc =
    getImageUrl(settings.logo_url ?? settings.logo) || "/logo-demafsh.png";
  const cabinetName = settings.cabinet_name?.trim() || "Kabinet Andalusia";

  const missionLines = (settings.mission || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <section className="relative overflow-hidden border-b border-[#E7C45B]/15 bg-[#160207]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden sm:inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-bg.jpg"
            alt=""
            width={996}
            height={420}
            fetchPriority="high"
            className="h-auto w-full object-cover object-top sm:h-full sm:object-[center_18%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(22,2,7,0.12)_0%,rgba(22,2,7,0.48)_62%,#160207_100%)] sm:bg-[linear-gradient(to_bottom,rgba(22,2,7,0.18)_0%,rgba(22,2,7,0.42)_48%,rgba(22,2,7,0.92)_100%)]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_62%_50%_at_50%_58%,rgba(22,2,7,0.68)_0%,rgba(22,2,7,0.22)_62%,transparent_100%)] sm:block"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-12 text-center sm:px-6 sm:pt-14 sm:pb-16">
          <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#E7C45B]/70 bg-[#F8F5F2] shadow-[0_0_50px_rgba(231,196,91,0.28)] sm:h-36 sm:w-36">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={`Lambang resmi ${settings.organization_name}`}
              width={144}
              height={144}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl font-sans text-3xl font-extrabold uppercase leading-[1.08] tracking-tight text-[#F8F5F2] drop-shadow-[0_3px_14px_rgba(0,0,0,0.85)] sm:mt-7 sm:text-5xl lg:text-[3.5rem]">
            {cabinetName}
          </h1>

          <p className="mx-auto mt-3.5 max-w-2xl text-sm leading-relaxed text-[#F8F5F2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:mt-4 sm:text-lg">
            Profil &amp; Struktur Pengurus · {settings.organization_name}
          </p>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E7C45B] sm:mt-6 sm:text-xs sm:tracking-[0.2em]">
            Fakultas Syariah &amp; Hukum · UIN Sunan Gunung Djati Bandung · Periode{" "}
            {settings.period}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-3xl border border-[#E7C45B]/25 bg-[#2A050E] p-8 lg:col-span-5">
            <div className="flex items-center gap-3 text-[#E7C45B]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4A0B1B] ring-1 ring-[#E7C45B]/35">
                <Compass aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="font-sans text-2xl font-bold text-[#F8F5F2]">
                Visi Kabinet
              </h2>
            </div>
            <p className="mt-5 font-sans text-lg leading-relaxed text-[#F8F5F2]">
              &ldquo;{settings.vision}&rdquo;
            </p>
          </div>

          <div className="rounded-3xl border border-[#E7C45B]/25 bg-[#2A050E] p-8 lg:col-span-7">
            <div className="flex items-center gap-3 text-[#E7C45B]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4A0B1B] ring-1 ring-[#E7C45B]/35">
                <Target aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="font-sans text-2xl font-bold text-[#F8F5F2]">
                Misi Strategis
              </h2>
            </div>
            <ul className="mt-5 space-y-3">
              {missionLines.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-[#E7C45B]/10 bg-[#160207]/60 px-4 py-3 text-sm leading-relaxed text-[#D4C9C4]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E7C45B] text-[11px] font-bold text-[#160207]">
                    {idx + 1}
                  </span>
                  <span>{item.replace(/^\d+\.\s*/, "")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-14 px-4 pb-20 sm:px-6 lg:px-8">
        {departments.length > 0 ? (
          departments.map((department) => (
            <div
              key={department.id}
              className="rounded-2xl border border-[#E7C45B]/15 bg-[#2A050E]/55 p-4 sm:rounded-3xl sm:p-8"
            >
              <div className="border-b border-[#E7C45B]/15 pb-4 text-center sm:pb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E7C45B] sm:text-xs">
                  Struktur Bidang {String(department.sort_order).padStart(2, "0")}
                </span>
                <h2 className="mt-1 font-sans text-xl font-bold text-[#F8F5F2] sm:text-3xl">
                  {department.name}
                </h2>
                {department.description && (
                  <p className="mx-auto mt-2 max-w-3xl text-xs leading-relaxed text-[#D4C9C4] sm:text-sm">
                    {department.description}
                  </p>
                )}
              </div>

              {department.members.length > 0 ? (
                <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:mt-6 sm:gap-5">
                  {department.members.map((member) => {
                    const photoUrl = getImageUrl(member.photo_url ?? member.photo);
                    const igHandle = member.instagram_handle?.replace(/^@/, "");

                    return (
                      <div
                        key={member.id}
                        className="group flex w-[calc(50%-5px)] min-w-0 max-w-[280px] flex-col overflow-hidden rounded-xl border border-[#E7C45B]/15 bg-[#160207]/85 transition-colors hover:border-[#E7C45B]/55 sm:w-60 sm:max-w-xs sm:rounded-2xl lg:w-64"
                      >
                        <div className="relative aspect-square w-full overflow-hidden bg-[#4A0B1B]">
                          {photoUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={photoUrl}
                              alt={member.name}
                              width={480}
                              height={480}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#6E1127]/70 via-[#4A0B1B] to-[#160207] p-4 sm:p-6">
                              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E7C45B]/40 bg-[#2A050E] text-[#E7C45B] sm:h-20 sm:w-20">
                                <UserRound aria-hidden="true" className="h-7 w-7 sm:h-10 sm:w-10" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-3 sm:p-5">
                          <span className="line-clamp-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#E7C45B] sm:line-clamp-none sm:text-[11px] sm:tracking-[0.14em]">
                            {member.position}
                          </span>
                          <h3 className="mt-1 line-clamp-2 font-sans text-sm font-bold text-[#F8F5F2] sm:line-clamp-none sm:text-lg">
                            {member.name}
                          </h3>

                          {igHandle && (
                            <a
                              href={`https://instagram.com/${igHandle}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto inline-flex min-h-11 items-center gap-1 pt-2 text-[11px] font-medium text-[#D4C9C4] transition-colors hover:text-[#E7C45B] sm:gap-1.5 sm:pt-3 sm:text-xs"
                            >
                              <InstagramIcon
                                aria-hidden="true"
                                className="h-3 w-3 shrink-0 text-[#E7C45B] sm:h-3.5 sm:w-3.5"
                              />
                              <span className="truncate">@{igHandle}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-6 text-sm text-[#D4C9C4]">
                  Data pengurus untuk departemen ini belum ditambahkan.
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-[#E7C45B]/15 bg-[#2A050E] p-12 text-center">
            <p className="text-sm text-[#D4C9C4]">
              Data struktur kabinet belum tersedia. Pastikan API backend aktif.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
