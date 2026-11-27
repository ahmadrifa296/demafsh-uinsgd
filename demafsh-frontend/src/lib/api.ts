export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
  "http://127.0.0.1:8000/api/v1";

export const STORAGE_BASE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL?.replace(/\/+$/, "") ||
  "http://127.0.0.1:8000/storage";

export interface SiteSetting {
  id: number;
  organization_name: string;
  cabinet_name?: string | null;
  period: string;
  hero_title: string;
  hero_subtitle: string | null;
  vision: string | null;
  mission: string | null;
  instagram_handle: string | null;
  email: string | null;
  whatsapp: string | null;
  address: string | null;
  logo: string | null;
  logo_url: string | null;
  updated_at?: string | null;
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
  color: string;
  posts_count?: number;
}

export interface PostAuthor {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: string | null;
  thumbnail: string | null;
  thumbnail_url: string | null;
  status: "draft" | "published";
  is_featured: boolean;
  views: number;
  published_at: string | null;
  category: PostCategory | null;
  author: PostAuthor | null;
}

export interface PostsMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PostsResponse {
  data: Post[];
  meta: PostsMeta;
  categories: PostCategory[];
  featured: Post | null;
}

export interface PostDetailResponse {
  post: Post | null;
  related: Post[];
}

export interface Member {
  id: number;
  name: string;
  position: string;
  instagram_handle: string | null;
  photo: string | null;
  photo_url: string | null;
  sort_order: number;
}

export interface Department {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  members: Member[];
}

export interface Achievement {
  id: number;
  student_name: string;
  nim: string | null;
  major: string;
  event_name: string;
  rank: string;
  level: string;
  photo: string | null;
  photo_url: string | null;
  certificate_file: string | null;
  certificate_url: string | null;
  created_at: string | null;
}

export interface Donation {
  id: number;
  title: string;
  description: string;
  qris_image: string | null;
  qris_image_url: string | null;
  bank_info: string | null;
  target_amount: number;
  collected_amount: number;
  progress_percentage: number;
  is_active: boolean;
  created_at: string | null;
}

export interface AspirationTicket {
  ticket_code: string;
  sender_name: string;
  major: string;
  topic: string;
  message: string;
  status: "diterima" | "dikaji" | "ditindaklanjuti" | "selesai";
  admin_response: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  event_date: string | null;
  location: string | null;
  organizer: string | null;
  poster: string | null;
  poster_url: string | null;
  registration_url: string | null;
  is_registration_open: boolean;
  is_published: boolean;
  created_at: string | null;
}

export interface EventsResponse {
  data: EventItem[];
  categories: string[];
}

export const FALLBACK_SITE_SETTINGS: SiteSetting = {
  id: 1,
  organization_name:
    "DEMA Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung",
  cabinet_name: "Kabinet Andalusia",
  period: "2026–2027",
  hero_title: "Dewan Eksekutif Mahasiswa Fakultas Syariah dan Hukum",
  hero_subtitle:
    "Wadah eksekutif mahasiswa FSH UIN Sunan Gunung Djati Bandung periode 2026–2027 yang progresif, aspiratif, dan berintegritas dalam mengawal keadilan hukum dan nilai kesyariahan.",
  vision:
    "Mewujudkan DEMA Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung yang responsif, inklusif, progresif, dan berdaya saing sebagai katalisator gerakan intelektual serta pengabdian mahasiswa.",
  mission:
    "1. Mengoptimalkan tata kelola organisasi yang profesional, transparan, dan akuntabel.\n2. Menguatkan fungsi advokasi dan pelayanan mahasiswa yang cepat tanggap serta berbasis solusi.\n3. Mendorong tradisi kajian ilmiah hukum dan syariah yang kritis serta solutif terhadap isu publik.\n4. Membangun sinergi strategis bersama HMJ, UKM, alumni, dan jejaring eksternal lintas kampus.",
  instagram_handle: "@demafshuinbdg",
  email: "demafsh@uinsgd.ac.id",
  whatsapp: "6281234567890",
  address:
    "Gedung Student Center Lt. 2, Fakultas Syariah dan Hukum, UIN Sunan Gunung Djati Bandung, Jl. A.H. Nasution No. 105, Cibiru, Kota Bandung 40614",
  logo: null,
  logo_url: null,
};

export function getImageUrl(path?: string | null): string | null {
  if (!path) {
    return null;
  }

  const trimmed = path.trim();
  if (!trimmed) {
    return null;
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return `${STORAGE_BASE_URL}/${trimmed.replace(/^\/+/, "")}`;
}

export function estimateReadingTime(content?: string | null): number {
  if (!content) {
    return 1;
  }

  const plainText = content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plainText) {
    return 1;
  }

  const wordCount = plainText.split(" ").length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function formatDateID(dateStr?: string | null): string {
  if (!dateStr) {
    return "-";
  }

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateTimeID(dateStr?: string | null): string {
  if (!dateStr) {
    return "Jadwal menyusul";
  }

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return "Jadwal menyusul";
  }

  return (
    new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(date) + " WIB"
  );
}

export function formatCurrencyIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

async function safeGetJson<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchSiteSettings(): Promise<SiteSetting> {
  const payload = await safeGetJson<{ success: boolean; data: SiteSetting | null }>(
    "/settings"
  );

  return payload?.data ?? FALLBACK_SITE_SETTINGS;
}

export async function fetchPosts(params?: {
  category?: string;
  search?: string;
  limit?: number;
  page?: number;
}): Promise<PostsResponse> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.search) query.set("search", params.search);
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.page) query.set("page", String(params.page));

  const qs = query.toString();
  const payload = await safeGetJson<{
    success: boolean;
    data: Post[];
    meta: PostsMeta;
    categories: PostCategory[];
    featured: Post | null;
  }>(`/posts${qs ? `?${qs}` : ""}`);

  if (!payload) {
    return {
      data: [],
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: params?.limit ?? 9,
        total: 0,
      },
      categories: [],
      featured: null,
    };
  }

  return {
    data: payload.data ?? [],
    meta: payload.meta ?? {
      current_page: 1,
      last_page: 1,
      per_page: params?.limit ?? 9,
      total: payload.data?.length ?? 0,
    },
    categories: payload.categories ?? [],
    featured: payload.featured ?? null,
  };
}

export async function fetchPostBySlug(
  slug: string
): Promise<PostDetailResponse> {
  const payload = await safeGetJson<{
    success: boolean;
    data: Post;
    related: Post[];
  }>(`/posts/${encodeURIComponent(slug)}`);

  if (!payload?.data) {
    return { post: null, related: [] };
  }

  return {
    post: payload.data,
    related: payload.related ?? [],
  };
}

export async function fetchCabinet(): Promise<Department[]> {
  const payload = await safeGetJson<{ success: boolean; data: Department[] }>(
    "/cabinet"
  );

  return payload?.data ?? [];
}

export async function fetchAchievements(): Promise<Achievement[]> {
  const payload = await safeGetJson<{ success: boolean; data: Achievement[] }>(
    "/achievements"
  );

  return payload?.data ?? [];
}

export async function fetchDonations(): Promise<Donation[]> {
  const payload = await safeGetJson<{ success: boolean; data: Donation[] }>(
    "/donations"
  );

  return payload?.data ?? [];
}

export async function fetchEvents(params?: {
  category?: string;
  search?: string;
}): Promise<EventsResponse> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.search) query.set("search", params.search);
  const qs = query.toString();

  const payload = await safeGetJson<{
    success: boolean;
    data: EventItem[];
    categories: string[];
  }>(qs ? `/events?${qs}` : "/events");

  return {
    data: payload?.data ?? [],
    categories: payload?.categories ?? [],
  };
}

export async function fetchEventBySlug(
  slug: string
): Promise<EventItem | null> {
  const payload = await safeGetJson<{
    success: boolean;
    data: EventItem;
  }>(`/events/${encodeURIComponent(slug)}`);

  return payload?.data ?? null;
}

export async function trackAspiration(
  ticketCode: string
): Promise<{ found: boolean; data: AspirationTicket | null; message?: string }> {
  const cleaned = ticketCode.trim().toUpperCase();
  if (!cleaned) {
    return { found: false, data: null, message: "Masukkan kode tiket." };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/aspirations/${encodeURIComponent(cleaned)}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const payload = await response.json();
    if (!response.ok || !payload?.data) {
      return {
        found: false,
        data: null,
        message:
          payload?.message || "Tiket aspirasi tidak ditemukan di sistem.",
      };
    }

    return {
      found: true,
      data: payload.data as AspirationTicket,
    };
  } catch {
    return {
      found: false,
      data: null,
      message: "Tidak dapat terhubung ke server API DEMA FSH.",
    };
  }
}
