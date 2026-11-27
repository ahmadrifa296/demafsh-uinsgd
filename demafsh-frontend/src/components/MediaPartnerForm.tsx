"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Megaphone, Send } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { extractApiError } from "@/lib/constants";

const INPUT_CLASS =
  "min-h-11 w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-4 py-2.5 text-sm text-[#F8F5F2] placeholder-[#C7B8B3] focus:border-[#E7C45B]";

const FILE_CLASS =
  "min-h-11 w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-3 py-2 text-xs text-[#D4C9C4] file:mr-3 file:rounded-lg file:border-0 file:bg-[#4A0B1B] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#E7C45B]";

export default function MediaPartnerForm() {
  const [organizationName, setOrganizationName] = useState("");
  const [eventName, setEventName] = useState("");
  const [contactWa, setContactWa] = useState("");
  const [packageType, setPackageType] = useState<
    "gratis" | "berbayar" | "kolaborasi"
  >("kolaborasi");
  const [eventDate, setEventDate] = useState("");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      formData.append("organization_name", organizationName.trim());
      formData.append("event_name", eventName.trim());
      formData.append("contact_wa", contactWa.trim());
      formData.append("package_type", packageType);
      if (eventDate) formData.append("event_date", eventDate);
      if (posterFile) formData.append("poster_file", posterFile);
      if (notes.trim()) formData.append("notes", notes.trim());

      const response = await fetch(`${API_BASE_URL}/media-partners`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        setErrorMsg(
          extractApiError(
            payload,
            "Gagal mengirim pengajuan media partner. Periksa data Anda."
          )
        );
        return;
      }

      setSuccessMsg(
        payload.message ||
          "Pengajuan media partner berhasil dikirim dan sedang menunggu peninjauan Departemen Kominfo."
      );
      setOrganizationName("");
      setEventName("");
      setContactWa("");
      setEventDate("");
      setPosterFile(null);
      setNotes("");
      formEl.reset();
    } catch {
      setErrorMsg("Tidak dapat terhubung ke server API DEMA FSH.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="mp-form-heading"
      className="rounded-3xl border border-[#E7C45B]/20 bg-[#2A050E] p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4A0B1B] text-[#E7C45B] ring-1 ring-[#E7C45B]/35">
          <Megaphone aria-hidden="true" className="h-5 w-5" />
        </div>
        <div>
          <h2
            id="mp-form-heading"
            className="font-sans text-2xl font-bold text-[#F8F5F2]"
          >
            Form Pengajuan Media Partner
          </h2>
          <p className="text-xs text-[#D4C9C4]">
            Kolaborasi publikasi acara melalui kanal resmi @demafshuinbdg.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="mp-organization"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              Nama Organisasi / Instansi *
            </label>
            <input
              id="mp-organization"
              type="text"
              required
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              placeholder="Contoh: HMJ Ilmu Hukum UIN SGD"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label
              htmlFor="mp-event"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              Nama Acara / Kegiatan *
            </label>
            <input
              id="mp-event"
              type="text"
              required
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Contoh: Seminar Nasional Hukum 2026"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="mp-whatsapp"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              WhatsApp Narahubung *
            </label>
            <input
              id="mp-whatsapp"
              type="text"
              required
              value={contactWa}
              onChange={(e) => setContactWa(e.target.value)}
              placeholder="0812xxxxxxxx"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label
              htmlFor="mp-package"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              Paket Kerja Sama *
            </label>
            <select
              id="mp-package"
              value={packageType}
              onChange={(e) =>
                setPackageType(
                  e.target.value as "gratis" | "berbayar" | "kolaborasi"
                )
              }
              required
              className={INPUT_CLASS}
            >
              <option value="gratis">Gratis (Syarat Follow &amp; Tag)</option>
              <option value="kolaborasi">Kolaborasi Lintas Lembaga</option>
              <option value="berbayar">Berbayar (Paket Publikasi Khusus)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="mp-date"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              Tanggal Pelaksanaan
            </label>
            <input
              id="mp-date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="mp-poster"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
          >
            Upload Poster / Pamflet Acara (JPG/PNG/PDF, maks. 5MB)
          </label>
          <input
            id="mp-poster"
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
            className={FILE_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="mp-notes"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
          >
            Catatan / Caption Tambahan
          </label>
          <textarea
            id="mp-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tuliskan jadwal unggah yang diinginkan atau informasi akun Instagram penyelenggara..."
            className="w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-4 py-3 text-sm text-[#F8F5F2] placeholder-[#C7B8B3] focus:border-[#E7C45B]"
          />
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="rounded-xl border border-[#E7C45B]/55 bg-[#4A0B1B] px-4 py-3 text-sm text-[#F8F5F2]"
          >
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-2.5 rounded-xl border border-[#E7C45B]/45 bg-[#1B6B3A] px-4 py-3 text-sm text-[#F8F5F2]"
          >
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-[#F8F5F2]"
            />
            <span>{successMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1B6B3A] px-6 py-3 text-sm font-bold text-[#F8F5F2] transition-colors hover:bg-[#15572F] disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              <span>Mengirim Pengajuan...</span>
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-4 w-4" />
              <span>Ajukan Media Partner</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}
