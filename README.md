# Portal Resmi & Layanan Mahasiswa — DEMA FSH UIN SGD Bandung (2026–2027)

Workspace fullstack Headless CMS untuk website Company Profile, Layanan Mahasiswa, dan Portal Berita resmi **Dewan Eksekutif Mahasiswa Fakultas Syariah dan Hukum (DEMA FSH) UIN Sunan Gunung Djati Bandung** periode **2026–2027** (`@demafshuinbdg`).

---

## Arsitektur Workspace

- `demafsh-backend` — Backend API & CMS Admin Panel (**Laravel 11 + FilamentPHP v3 + REST API v1 + MySQL/MariaDB**)
- `demafsh-frontend` — Aplikasi Web Publik (**Next.js App Router + TypeScript + Tailwind CSS**)

---

## Cara Menjalankan Backend (`demafsh-backend`)

1. Pastikan layanan MySQL / MariaDB aktif dan database `db_demafsh` sudah dibuat.
2. Masuk ke folder backend dan sesuaikan konfigurasi `.env` (host `127.0.0.1`, database `db_demafsh`, `FILESYSTEM_DISK=public`, `APP_TIMEZONE=Asia/Jakarta`).
3. Jalankan migrasi dan seeder data awal serta buat symlink storage:
   ```bash
   cd demafsh-backend
   php artisan migrate:fresh --seed
   php artisan storage:link
   ```
4. Jalankan server lokal pada port `8000` (pastikan ekstensi PHP `intl` aktif dan menggunakan `server.php` agar route Livewire/Filament berfungsi normal):
   ```powershell
   # Menggunakan PHP XAMPP dengan ekstensi intl aktif:
   cd demafsh-backend\public
   C:\xampp\php\php.exe -d extension=intl -S 127.0.0.1:8000 ..\vendor\laravel\framework\src\Illuminate\Foundation\resources\server.php
   # Atau jika php.ini sudah mengaktifkan extension=intl:
   cd demafsh-backend
   php artisan serve --host=127.0.0.1 --port=8000
   ```
5. Akses CMS Admin Panel di: `http://127.0.0.1:8000/admin` (route `/` otomatis redirect ke `/admin`).

### Akun Admin Default CMS Filament
- **Email**: `admin@demafsh.test`
- **Password**: `password`

---

## Cara Menjalankan Frontend (`demafsh-frontend`)

1. Pastikan `.env.local` mengarah ke backend lokal:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
   NEXT_PUBLIC_STORAGE_URL=http://127.0.0.1:8000/storage
   ```
2. Install dependensi dan jalankan Next.js pada port `3000`:
   ```bash
   cd demafsh-frontend
   npm install
   npm run dev
   ```
3. Akses website di `http://localhost:3000`:
   - `/` — Beranda
   - `/kabinet` — Visi Misi & Struktur Kabinet
   - `/berita` — Portal Berita, Filter Rubrik, Pencarian, & Pagination
   - `/berita/[slug]` — Detail Artikel (SEO dinamis, view counter, Share WhatsApp, Berita Terkait)
   - `/aspirasi` — Form Ruang Aspirasi (mendukung Mode Anonim) & Lacak Kode Tiket (`ASP-XXXXXX`)
   - `/prestasi` — Form Unggah Prestasi & Galeri Hall of Fame
   - `/layanan` — Program DEMA FSH Peduli (Donasi/QRIS) & Form Pengajuan Media Partner

---

## Daftar Endpoint REST API v1 (`/api/v1`)

| Method | Endpoint | Rate Limit | Deskripsi |
| --- | --- | --- | --- |
| `GET` | `/api/v1/settings` | - | Mengambil informasi organisasi (`SiteSetting`) |
| `GET` | `/api/v1/posts` | - | Daftar berita `published` (`?category=`, `?search=`, `?limit=`, `?page=`), daftar kategori, & 1 artikel `featured` |
| `GET` | `/api/v1/posts/{slug}` | - | Detail artikel, menaikkan `views`, dan mengembalikan 3 artikel `related` |
| `GET` | `/api/v1/cabinet` | - | Daftar departemen beserta pengurusnya terurut berdasarkan `sort_order` |
| `GET` | `/api/v1/donations` | - | Daftar program DEMA FSH Peduli yang aktif (`is_active = true`) |
| `POST` | `/api/v1/aspirations` | `throttle:15,1` | Mengirim aspirasi mahasiswa dan menghasilkan kode tiket unik `ASP-XXXXXX` |
| `GET` | `/api/v1/aspirations/{ticketCode}` | - | Melacak status dan tanggapan resmi DEMA berdasarkan kode tiket |
| `GET` | `/api/v1/achievements` | - | Daftar prestasi mahasiswa yang telah diverifikasi (`is_published = true`) |
| `POST` | `/api/v1/achievements` | `throttle:10,1` | Mengunggah prestasi mahasiswa (`multipart/form-data`: `photo` & `certificate_file`), tersimpan dengan `is_published = false` |
| `POST` | `/api/v1/media-partners` | `throttle:10,1` | Mengajukan media partner (`multipart/form-data`: `poster_file`), tersimpan dengan status `menunggu` |
