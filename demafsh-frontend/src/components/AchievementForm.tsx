"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Trophy, Upload } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import {
  ACHIEVEMENT_LEVELS,
  extractApiError,
  FSH_MAJORS,
} from "@/lib/constants";

const INPUT_CLASS =
  "min-h-11 w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-4 py-2.5 text-sm text-[#F8F5F2] placeholder-[#C7B8B3] focus:border-[#E7C45B]";

const FILE_CLASS =
  "min-h-11 w-full rounded-xl border border-[#E7C45B]/25 bg-[#160207] px-3 py-2 text-xs text-[#D4C9C4] file:mr-3 file:rounded-lg file:border-0 file:bg-[#4A0B1B] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#E7C45B]";

export default function AchievementForm() {
  const [studentName, setStudentName] = useState("");
  const [nim, setNim] = useState("");
  const [major, setMajor] = useState<string>(FSH_MAJORS[0]);
  const [eventName, setEventName] = useState("");
  const [rank, setRank] = useState("");
  const [level, setLevel] = useState<string>(ACHIEVEMENT_LEVELS[3]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

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
      formData.append("student_name", studentName.trim());
      if (nim.trim()) formData.append("nim", nim.trim());
      formData.append("major", major);
      formData.append("event_name", eventName.trim());
      formData.append("rank", rank.trim());
      formData.append("level", level);
      if (photoFile) formData.append("photo", photoFile);
      if (certificateFile) formData.append("certificate_file", certificateFile);

      const response = await fetch(`${API_BASE_URL}/achievements`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        setErrorMsg(
          extractApiError(payload, "Gagal mengirim data prestasi mahasiswa.")
        );
        return;
      }

      setSuccessMsg(
        payload.message ||
          "Prestasi berhasil diajukan dan sedang menunggu verifikasi admin untuk tampil di Hall of Fame."
      );
      setStudentName("");
      setNim("");
      setEventName("");
      setRank("");
      setPhotoFile(null);
      setCertificateFile(null);
      formEl.reset();
    } catch {
      setErrorMsg("Tidak dapat terhubung ke server API DEMA FSH.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="achievement-form-heading"
      className="rounded-3xl border border-[#E7C45B]/20 bg-[#2A050E] p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4A0B1B] text-[#E7C45B] ring-1 ring-[#E7C45B]/35">
          <Trophy aria-hidden="true" className="h-5 w-5" />
        </div>
        <div>
          <h2
            id="achievement-form-heading"
            className="font-sans text-2xl font-bold text-[#F8F5F2]"
          >
            Ajukan Prestasi Mahasiswa
          </h2>
          <p className="text-xs text-[#D4C9C4]">
            Data akan diverifikasi tim DEMA sebelum tampil di galeri publik.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="ach-student-name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
          >
            Nama Lengkap Mahasiswa *
          </label>
          <input
            id="ach-student-name"
            type="text"
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Contoh: Zakiya Ramadhani"
            className={INPUT_CLASS}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="ach-nim"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              NIM (Opsional)
            </label>
            <input
              id="ach-nim"
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="1233050042"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label
              htmlFor="ach-level"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
            >
              Tingkat Kompetisi *
            </label>
            <select
              id="ach-level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              className={INPUT_CLASS}
            >
              {ACHIEVEMENT_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="ach-major"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
          >
            Program Studi / Jurusan *
          </label>
          <select
            id="ach-major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
            className={INPUT_CLASS}
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
            htmlFor="ach-event-name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
          >
            Nama Kompetisi / Ajang *
          </label>
          <input
            id="ach-event-name"
            type="text"
            required
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Contoh: Kompetisi Debat Hukum Nasional 2026"
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="ach-rank"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
          >
            Peringkat / Gelar *
          </label>
          <input
            id="ach-rank"
            type="text"
            required
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="Contoh: Juara 1 / Best Speaker / Medali Emas"
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="ach-photo"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
          >
            Foto Dokumentasi / Mahasiswa (JPG/PNG, maks. 2MB)
          </label>
          <input
            id="ach-photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
            className={FILE_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="ach-certificate"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E7C45B]"
          >
            Bukti Sertifikat / Piagam (PDF/JPG/PNG, maks. 5MB)
          </label>
          <input
            id="ach-certificate"
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
            onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
            className={FILE_CLASS}
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
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#E7C45B] px-6 py-3 text-sm font-bold text-[#160207] transition-colors hover:bg-[#C9A227] disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              <span>Mengunggah Data...</span>
            </>
          ) : (
            <>
              <Upload aria-hidden="true" className="h-4 w-4" />
              <span>Kirim Data Prestasi</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}
