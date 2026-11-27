import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HeartHandshake, Landmark, QrCode } from "lucide-react";
import { fetchDonations, formatCurrencyIDR, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DEMA FSH Peduli",
  description:
    "Program solidaritas sosial, bantuan kemanusiaan, dan penggalangan donasi resmi DEMA Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung.",
};

export default async function PeduliPage() {
  const donations = await fetchDonations();

  return (
    <div className="bg-[#160207] text-[#F8F5F2]">
      <section className="border-b border-[#E7C45B]/15 bg-gradient-to-b from-[#2A050E] to-[#160207] py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/layanan"
            className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E7C45B] transition-colors hover:text-[#F8F5F2]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            <span>Semua Layanan Mahasiswa</span>
          </Link>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E7C45B]/35 bg-[#4A0B1B]/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#E7C45B]">
            <HeartHandshake aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Program Sosial Masyarakat</span>
          </span>
          <h1 className="mt-4 font-sans text-3xl font-extrabold text-[#F8F5F2] sm:text-5xl">
            DEMA FSH Peduli
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#D4C9C4]">
            Salurkan kepedulian sosial, bantuan darurat pendidikan, serta
            aksi kemanusiaan bersama Departemen Sosial Masyarakat DEMA FSH.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {donations.length > 0 ? (
          <div className="grid gap-6">
            {donations.map((campaign) => {
              const qrisUrl = getImageUrl(
                campaign.qris_image_url ?? campaign.qris_image
              );
              const percentage = Math.min(
                100,
                Math.max(0, campaign.progress_percentage || 0)
              );

              return (
                <article
                  key={campaign.id}
                  className="grid gap-6 rounded-3xl border border-[#E7C45B]/25 bg-gradient-to-br from-[#2A050E] to-[#160207] p-6 sm:p-8 lg:grid-cols-12"
                >
                  <div className="flex flex-col justify-between lg:col-span-8">
                    <div>
                      <span className="inline-block rounded-full bg-[#1B6B3A] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#F8F5F2]">
                        Kampanye Donasi Aktif
                      </span>
                      <h2 className="mt-3 font-sans text-2xl font-bold text-[#F8F5F2]">
                        {campaign.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-[#D4C9C4] sm:text-base">
                        {campaign.description}
                      </p>
                    </div>

                    <div className="mt-6 rounded-2xl border border-[#E7C45B]/15 bg-[#160207]/75 p-5">
                      <div className="flex flex-wrap items-end justify-between gap-2">
                        <div>
                          <span className="block text-xs uppercase tracking-wider text-[#D4C9C4]">
                            Dana Terkumpul
                          </span>
                          <span className="font-sans text-2xl font-bold text-[#E7C45B]">
                            {formatCurrencyIDR(campaign.collected_amount)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-xs uppercase tracking-wider text-[#D4C9C4]">
                            Target ({percentage}%)
                          </span>
                          <span className="text-sm font-semibold text-[#F8F5F2]">
                            {formatCurrencyIDR(campaign.target_amount)}
                          </span>
                        </div>
                      </div>

                      <div
                        role="progressbar"
                        aria-label={`Progres donasi ${campaign.title}`}
                        aria-valuenow={percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#4A0B1B]"
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#1B6B3A] via-[#C9A227] to-[#E7C45B]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {campaign.bank_info && (
                      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7C45B]/20 bg-[#4A0B1B]/45 p-4">
                        <Landmark
                          aria-hidden="true"
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#E7C45B]"
                        />
                        <div>
                          <span className="block text-xs font-bold uppercase tracking-wider text-[#E7C45B]">
                            Rekening Donasi Resmi
                          </span>
                          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-[#F8F5F2]">
                            {campaign.bank_info}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E7C45B]/20 bg-[#160207]/90 p-6 text-center lg:col-span-4">
                    {qrisUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={qrisUrl}
                          alt={`QRIS ${campaign.title}`}
                          width={256}
                          height={256}
                          className="max-h-64 w-auto rounded-xl border border-[#E7C45B]/30 bg-white object-contain p-2"
                        />
                        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#E7C45B]">
                          Scan QRIS DEMA FSH Peduli
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-dashed border-[#E7C45B]/40 bg-[#2A050E] text-[#E7C45B]">
                          <QrCode aria-hidden="true" className="h-12 w-12" />
                        </div>
                        <p className="mt-4 font-sans text-base font-bold text-[#F8F5F2]">
                          QRIS Segera Hadir
                        </p>
                        <p className="mt-1 text-xs text-[#D4C9C4]">
                          Salurkan donasi melalui rekening resmi di samping
                          atau unggah QRIS dari CMS Admin.
                        </p>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E7C45B]/15 bg-[#2A050E] p-12 text-center">
            <HeartHandshake
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-[#E7C45B]"
            />
            <p className="mt-3 text-sm text-[#D4C9C4]">
              Saat ini belum ada program DEMA FSH Peduli yang aktif.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
