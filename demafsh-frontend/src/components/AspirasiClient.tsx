"use client";

import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Copy,
  EyeOff,
  Loader2,
  MessageSquareQuote,
  Search,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  API_BASE_URL,
  formatDateID,
  trackAspiration,
  type AspirationTicket,
} from "@/lib/api";
import { extractApiError, FSH_MAJORS } from "@/lib/constants";

const STATUS_STEPS: Array<{
  key: AspirationTicket["status"];
  label: string;
}> = [
  { key: "diterima", label: "Diterima" },
  { key: "dikaji", label: "Dikaji" },
  { key: "ditindaklanjuti", label: "Ditindaklanjuti" },
  { key: "selesai", label: "Selesai" },
];

const STATUS_BADGE_MAP: Record<AspirationTicket["status"], string> = {
  diterima: "bg-zinc-700/70 text-zinc-100 border-zinc-500/40",
  dikaji: "bg-[#E7C45B]/20 text-[#E7C45B] border-[#E7C45B]/45",
  ditindaklanjuti: "bg-sky-500/20 text-sky-300 border-sky-400/45",
  selesai: "bg-[#1B6B3A]/40 text-emerald-300 border-emerald-500/50",
};

const SAMPLE_TICKETS = ["ASP-FSH001", "ASP-FSH002", "ASP-FSH003"] as const;

interface AspirasiClientProps {
  compact?: boolean;
  initialTracked?: AspirationTicket | null;
}

export default function AspirasiClient({
  compact = false,
  initialTracked = null,
}: AspirasiClientProps) {
  // Submission state
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [nim, setNim] = useState("");
  const [major, setMajor] = useState<string>(FSH_MAJORS[0]);
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdTicket, setCreatedTicket] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Mobile tab state when rendered compact on Beranda
  const [mobileTab, setMobileTab] = useState<"submit" | "track">("submit");

  // Tracker state
  const [ticketInput, setTicketInput] = useState(
    initialTracked?.ticket_code || "ASP-FSH001"
  );
  const [tracking, setTracking] = useState(false);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [trackedData, setTrackedData] = useState<AspirationTicket | null>(
    initialTracked
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setCreatedTicket(null);

    try {
      const response = await fetch(`${API_BASE_URL}/aspirations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender_name: isAnonymous ? null : senderName.trim() || null,
          nim: isAnonymous ? null : nim.trim() || null,
          major,
          topic: topic.trim(),
          message: message.trim(),
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.data?.ticket_code) {
        setSubmitError(
          extractApiError(payload, "Gagal mengirim aspirasi. Periksa isian Anda.")
        );
        return;
      }

      const newCode = payload.data.ticket_code as string;
      setCreatedTicket(newCode);
      setTopic("");
      setMessage("");
      setSenderName("");
      setNim("");
    } catch {
      setSubmitError("Tidak dapat terhubung ke server API DEMA FSH.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrack = async (codeOverride?: string) => {
    const code = (codeOverride ?? ticketInput).trim().toUpperCase();
    if (!code) {
      setTrackError("Masukkan kode tiket aspirasi terlebih dahulu.");
      return;
    }

    setTicketInput(code);
    if (compact) {
      setMobileTab("track");
    }
    setTracking(true);
    setTrackError(null);

    const result = await trackAspiration(code);
    if (!result.found || !result.data) {
      setTrackedData(null);
      setTrackError(result.message || "Tiket tidak ditemukan.");
    } else {
      setTrackedData(result.data);
    }

    setTracking(false);
  };

  const copyTicketCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const activeStepIndex = trackedData
    ? STATUS_STEPS.findIndex((s) => s.key === trackedData.status)
    : -1;

  const idPrefix = compact ? "home-asp" : "page-asp";
  const HeadingTag = compact ? "h3" : "h2";

  return (
    <div>
      {compact && (
        <div
          role="tablist"
          aria-label="Pilih mode layanan aspirasi"
          className="mb-4 grid grid-cols-2 gap-1.5 rounded-2xl border border-[#E7C45B]/25 bg-[#160207] p-1.5 lg:hidden"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === "submit"}
            onClick={() => setMobileTab("submit")}
            className={`min-h-11 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              mobileTab === "submit"
                ? "bg-[#E7C45B] text-[#160207]"
                : "text-[#D4C9C4] hover:text-[#F8F5F2]"
            }`}
          >
            Kirim Aspirasi
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === "track"}
            onClick={() => setMobileTab("track")}
            className={`min-h-11 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              mobileTab === "track"
                ? "bg-[#1B6B3A] text-[#F8F5F2]"
                : "text-[#D4C9C4] hover:text-[#F8F5F2]"
            }`}
          >
            Lacak Tiket
          </button>
        </div>
      )}

      <div className={`grid ${compact ? "gap-4 sm:gap-6" : "gap-8"} lg:grid-cols-12`}>
        {/* Bagian 1: Form Pengiriman Ruang Aspirasi */}
        <section
          className={`${
            compact && mobileTab !== "submit" ? "hidden lg:block" : ""
          } rounded-2xl border border-[#E7C45B]/20 bg-[#2A050E] sm:rounded-3xl ${
            compact ? "p-4 sm:p-6" : "p-6 sm:p-8"
          } lg:col-span-7`}
        >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4A0B1B] text-[#E7C45B] ring-1 ring-[#E7C45B]/35">
            <MessageSquareQuote aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <HeadingTag className="font-sans text-xl font-bold text-[#F8F5F2] sm:text-2xl">
              Kirim Aspirasi Mahasiswa
            </HeadingTag>
            <p className="text-xs text-[#D4C9C4]">
              Identitas pengirim dapat disamarkan menggunakan Mode Anonim.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Toggle Mode Anonim */}
          <label
            htmlFor={`${idPrefix}-anon`}
            className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-2xl border border-[#E7C45B]/20 bg-[#160207]/75 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <EyeOff aria-hidden="true" className="h-5 w-5 shrink-0 text-[#E7C45B]" />
              <div>
                <span className="block text-sm font-semibold text-[#F8F5F2]">
                  Kirim sebagai Anonim
                </span>
                <span className="block text-xs text-[#D4C9C4]">
                  Nama dan NIM tidak akan dicatat dalam tiket aspirasi.
                </span>
              </div>
            </div>
            <input
              id={`${idPrefix}-anon`}
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-5 w-5 accent-[#E7C45B]"
            />
          </label>

          {!isAnonymous && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`${idPrefix}-name`}
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
                >
                  Nama Lengkap (Opsional)
                </label>
                <input
                  id={`${idPrefix}-name`}
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Nama lengkap mahasiswa"
                  className="min-h-11 w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-4 py-2.5 text-sm text-[#F8F5F2] placeholder-[#C7B8B3] focus:border-[#E7C45B]"
                />
              </div>

              <div>
                <label
                  htmlFor={`${idPrefix}-nim`}
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
                >
                  NIM (Opsional)
                </label>
                <input
                  id={`${idPrefix}-nim`}
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="Nomor Induk Mahasiswa"
                  className="min-h-11 w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-4 py-2.5 text-sm text-[#F8F5F2] placeholder-[#C7B8B3] focus:border-[#E7C45B]"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor={`${idPrefix}-major`}
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              Program Studi / Jurusan *
            </label>
            <select
              id={`${idPrefix}-major`}
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
              className="min-h-11 w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-4 py-2.5 text-sm text-[#F8F5F2] focus:border-[#E7C45B]"
            >
              {FSH_MAJORS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-topic`}
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              Topik / Perihal Aspirasi *
            </label>
            <input
              id={`${idPrefix}-topic`}
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              placeholder="Contoh: Fasilitas Ruang Baca, Layanan Akademik, Banding UKT"
              className="min-h-11 w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-4 py-2.5 text-sm text-[#F8F5F2] placeholder-[#C7B8B3] focus:border-[#E7C45B]"
            />
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-message`}
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              Uraian Aspirasi / Keluhan *
            </label>
            <textarea
              id={`${idPrefix}-message`}
              rows={compact ? 3 : 5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              minLength={10}
              placeholder="Tuliskan aspirasi, kronologi, atau usulan solusi secara jelas (minimal 10 karakter)..."
              className="w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-4 py-3 text-sm text-[#F8F5F2] placeholder-[#C7B8B3] focus:border-[#E7C45B]"
            />
          </div>

          {submitError && (
            <div
              role="alert"
              className="rounded-xl border border-red-400/40 bg-red-950/60 px-4 py-3 text-sm text-red-200"
            >
              {submitError}
            </div>
          )}

          {createdTicket && (
            <div className="rounded-2xl border border-emerald-500/45 bg-[#1B6B3A]/25 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#F8F5F2]">
                    Aspirasi Anda Berhasil Terkirim!
                  </p>
                  <p className="mt-1 text-xs text-[#D4C9C4]">
                    Simpan kode tiket berikut untuk memantau status kajian dan
                    tanggapan resmi DEMA FSH:
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-lg border border-[#E7C45B]/50 bg-[#160207] px-4 py-2 font-mono text-base font-extrabold tracking-widest text-[#E7C45B]">
                      {createdTicket}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyTicketCode(createdTicket)}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#E7C45B]/35 bg-[#2A050E] px-3.5 py-2 text-xs font-semibold text-[#F8F5F2] hover:border-[#E7C45B]"
                    >
                      {copiedTicket ? (
                        <>
                          <Check aria-hidden="true" className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy aria-hidden="true" className="h-3.5 w-3.5 text-[#E7C45B]" />
                          <span>Salin Kode</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTrack(createdTicket)}
                      className="min-h-11 rounded-lg bg-[#E7C45B] px-3.5 py-2 text-xs font-bold text-[#160207] hover:bg-[#C9A227]"
                    >
                      Lacak Tiket Ini
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#E7C45B] px-6 py-3 text-sm font-bold text-[#160207] transition-colors hover:bg-[#C9A227] disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                <span>Mengirim Aspirasi...</span>
              </>
            ) : (
              <>
                <Send aria-hidden="true" className="h-4 w-4" />
                <span>Kirim ke Ruang Aspirasi</span>
              </>
            )}
          </button>
        </form>
      </section>

      {/* Bagian 2: Widget Lacak Status Tiket */}
      <aside
        className={`${
          compact && mobileTab !== "track" ? "hidden lg:block" : ""
        } rounded-2xl border border-[#E7C45B]/20 bg-[#2A050E]/85 sm:rounded-3xl ${
          compact ? "p-4 sm:p-6" : "p-6 sm:p-8"
        } lg:col-span-5`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4A0B1B] text-[#E7C45B] ring-1 ring-[#E7C45B]/35">
            <Search aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <HeadingTag className="font-sans text-xl font-bold text-[#F8F5F2] sm:text-2xl">
              Lacak Status Tiket
            </HeadingTag>
            <p className="text-xs text-[#D4C9C4]">
              Pantau progres advokasi dan tanggapan resmi DEMA FSH.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTrack();
          }}
          className="mt-5 flex gap-2"
        >
          <label htmlFor={`${idPrefix}-ticket`} className="sr-only">
            Kode tiket aspirasi
          </label>
          <input
            id={`${idPrefix}-ticket`}
            type="text"
            value={ticketInput}
            onChange={(e) => setTicketInput(e.target.value.toUpperCase())}
            placeholder="ASP-XXXXXX"
            className="min-h-11 min-w-0 flex-1 rounded-xl border border-[#E7C45B]/30 bg-[#160207] px-4 py-2.5 font-mono text-sm uppercase tracking-wider text-[#F8F5F2] placeholder-[#C7B8B3] focus:border-[#E7C45B]"
          />
          <button
            type="submit"
            disabled={tracking}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[#1B6B3A] px-4 py-2.5 text-sm font-bold text-[#F8F5F2] transition-colors hover:bg-[#15572F] disabled:opacity-60"
          >
            {tracking ? (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : (
              <Search aria-hidden="true" className="h-4 w-4" />
            )}
            <span>Lacak</span>
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#D4C9C4]">
          <span>Contoh tiket:</span>
          {SAMPLE_TICKETS.map((sampleCode) => (
            <button
              key={sampleCode}
              type="button"
              onClick={() => handleTrack(sampleCode)}
              className="min-h-11 rounded-md border border-[#E7C45B]/30 bg-[#160207] px-3 py-1.5 font-mono text-xs text-[#E7C45B] transition-colors hover:border-[#E7C45B]"
            >
              {sampleCode}
            </button>
          ))}
        </div>

        {trackError && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-400/40 bg-red-950/60 px-4 py-3 text-sm text-red-200"
          >
            {trackError}
          </div>
        )}

        {trackedData && (
          <div className="mt-5 space-y-4 rounded-2xl border border-[#E7C45B]/25 bg-[#160207]/90 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7C45B]/15 pb-3">
              <span className="font-mono text-sm font-extrabold tracking-widest text-[#E7C45B]">
                {trackedData.ticket_code}
              </span>
              <span
                className={`rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${
                  STATUS_BADGE_MAP[trackedData.status]
                }`}
              >
                {trackedData.status}
              </span>
            </div>

            {/* Stepper Progress */}
            <div className="grid grid-cols-4 gap-1.5">
              {STATUS_STEPS.map((step, index) => {
                const passed = index <= activeStepIndex;
                return (
                  <div key={step.key} className="text-center">
                    <div
                      className={`h-1.5 rounded-full ${
                        passed ? "bg-[#E7C45B]" : "bg-[#4A0B1B]"
                      }`}
                    />
                    <span
                      className={`mt-1.5 block text-[10px] font-semibold ${
                        passed ? "text-[#E7C45B]" : "text-[#C7B8B3]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-sans text-base font-bold text-[#F8F5F2]">
                {trackedData.topic}
              </p>
              <p className="text-xs text-[#D4C9C4]">
                Pengirim: {trackedData.sender_name} · {trackedData.major} ·{" "}
                {formatDateID(trackedData.created_at)}
              </p>
              <p className="rounded-xl bg-[#2A050E]/75 p-3.5 text-xs leading-relaxed text-[#F8F5F2]">
                {trackedData.message}
              </p>
            </div>

            <div className="rounded-xl border border-[#E7C45B]/30 bg-[#4A0B1B]/45 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E7C45B]">
                <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                <span>Tanggapan Resmi DEMA FSH</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#F8F5F2]">
                {trackedData.admin_response ||
                  "Aspirasi telah tercatat dan sedang dalam antrean peninjauan Departemen Advokasi & Kajian Strategis."}
              </p>
            </div>
          </div>
        )}
      </aside>
      </div>
    </div>
  );
}
