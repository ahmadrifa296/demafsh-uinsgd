export const FSH_MAJORS = [
  "Hukum Keluarga (Ahwal Syakhshiyyah)",
  "Hukum Ekonomi Syariah (Muamalah)",
  "Hukum Tata Negara (Siyasah)",
  "Perbandingan Mazhab dan Hukum",
  "Ilmu Hukum",
  "Hukum Pidana Islam (Jinayah)",
] as const;

export const ACHIEVEMENT_LEVELS = [
  "Fakultas",
  "Universitas",
  "Regional",
  "Nasional",
  "Internasional",
] as const;

export function extractApiError(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const record = payload as {
    message?: string;
    errors?: Record<string, string[]>;
  };

  if (record.errors) {
    const firstKey = Object.keys(record.errors)[0];
    if (firstKey && record.errors[firstKey]?.[0]) {
      return record.errors[firstKey][0];
    }
  }

  return record.message || fallback;
}
