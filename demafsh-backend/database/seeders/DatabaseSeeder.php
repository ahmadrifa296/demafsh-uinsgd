<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\Aspiration;
use App\Models\Department;
use App\Models\Donation;
use App\Models\Event;
use App\Models\MediaPartner;
use App\Models\Member;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@demafsh.test'],
            [
                'name' => 'Admin DEMA FSH',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        SiteSetting::updateOrCreate(
            ['period' => '2026–2027'],
            [
                'organization_name' => 'DEMA Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung',
                'cabinet_name' => 'Kabinet Andalusia',
                'hero_title' => 'Dewan Eksekutif Mahasiswa Fakultas Syariah dan Hukum',
                'hero_subtitle' => 'Wadah eksekutif mahasiswa FSH UIN Sunan Gunung Djati Bandung periode 2026–2027 yang progresif, aspiratif, dan berintegritas dalam mengawal keadilan hukum dan nilai kesyariahan.',
                'vision' => 'Mewujudkan DEMA Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung yang responsif, inklusif, progresif, dan berdaya saing sebagai katalisator gerakan intelektual serta pengabdian mahasiswa.',
                'mission' => "1. Mengoptimalkan tata kelola organisasi yang profesional, transparan, dan akuntabel.\n2. Menguatkan fungsi advokasi dan pelayanan mahasiswa yang cepat tanggap serta berbasis solusi.\n3. Mendorong tradisi kajian ilmiah hukum dan syariah yang kritis serta solutif terhadap isu publik.\n4. Membangun sinergi strategis bersama HMJ, UKM, alumni, dan jejaring eksternal lintas kampus.",
                'instagram_handle' => '@demafshuinbdg',
                'email' => 'demafsh@uinsgd.ac.id',
                'whatsapp' => '6281234567890',
                'address' => 'Gedung Student Center Lt. 2, Fakultas Syariah dan Hukum, UIN Sunan Gunung Djati Bandung, Jl. A.H. Nasution No. 105, Cibiru, Kota Bandung 40614',
                'logo' => 'settings/logo-demafsh.png',
            ]
        );

        $categoriesData = [
            ['name' => 'Berita Kegiatan', 'slug' => 'berita-kegiatan', 'color' => '#9F1239'],
            ['name' => 'Kajian & Opini', 'slug' => 'kajian-opini', 'color' => '#D97706'],
            ['name' => 'Aksi & Konsolidasi', 'slug' => 'aksi-konsolidasi', 'color' => '#DC2626'],
            ['name' => 'OpRec & Pengumuman', 'slug' => 'oprec-pengumuman', 'color' => '#059669'],
            ['name' => 'DEMA Peduli', 'slug' => 'dema-peduli', 'color' => '#2563EB'],
        ];

        $categories = [];
        foreach ($categoriesData as $cat) {
            $categories[$cat['slug']] = PostCategory::updateOrCreate(
                ['slug' => $cat['slug']],
                $cat
            );
        }

        $postsData = [
            [
                'category_id' => $categories['berita-kegiatan']->id,
                'author_id' => $admin->id,
                'title' => 'Pelantikan dan Rapat Kerja DEMA FSH UIN SGD Bandung Periode 2026–2027 Resmi Digelar',
                'slug' => 'raker-pelantikan-dema-fsh-2026-2027',
                'excerpt' => 'Pengurus DEMA Fakultas Syariah dan Hukum periode 2026–2027 resmi dilantik dan merumuskan arah gerak strategis melalui Rapat Kerja Fakultas di Bandung.',
                'content' => '<p>Bandung, Dewan Eksekutif Mahasiswa (DEMA) Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung periode 2026–2027 secara resmi menyelenggarakan prosesi pelantikan sekaligus Rapat Kerja (Raker) pada awal kepengurusan. Kegiatan ini dihadiri oleh jajaran pimpinan fakultas, perwakilan Senat Mahasiswa, seluruh Himpunan Mahasiswa Jurusan (HMJ), serta delegasi unit kegiatan mahasiswa di lingkungan FSH.</p><p>Dalam sambutannya, Ketua Umum DEMA FSH Muhammad Syamsul Ma\'arif menegaskan komitmen kabinet baru untuk menghadirkan pelayanan advokasi yang terstruktur, portal informasi yang transparan, serta ruang dialektika hukum dan syariah yang berdampak nyata bagi mahasiswa.</p><p>Melalui Rapat Kerja ini, setiap departemen memaparkan program kerja unggulan selama satu tahun kepengurusan, mulai dari penguatan Ruang Aspirasi Mahasiswa, pendataan prestasi akademik-nonakademik, hingga kolaborasi sosial kemasyarakatan bersama DEMA FSH Peduli.</p>',
                'thumbnail' => 'posts/thumbnails/post-1-raker.jpg',
                'status' => 'published',
                'is_featured' => true,
                'views' => 245,
                'published_at' => now()->subDays(5),
            ],
            [
                'category_id' => $categories['kajian-opini']->id,
                'author_id' => $admin->id,
                'title' => 'Diskusi Kolaborasi Nasional: Menimbang Arah Pembaruan Hukum Pidana dan Etika Publik',
                'slug' => 'diskusi-kolaborasi-nasional-pembaruan-hukum-pidana-dan-etika-publik',
                'excerpt' => 'Departemen Advokasi dan Kajian Strategis menggelar diskusi kolaborasi nasional lintas fakultas hukum membahas implementasi KUHP baru dan integritas penegakan hukum.',
                'content' => '<p>Departemen Advokasi dan Kajian Strategis DEMA FSH UIN SGD Bandung sukses menggelar Forum Diskusi Kolaborasi Nasional secara hibrida yang melibatkan akademisi, praktisi hukum, serta perwakilan mahasiswa fakultas syariah dan hukum dari berbagai perguruan tinggi di Indonesia.</p><p>Forum ini mengulas tantangan implementasi pembaruan hukum pidana nasional serta urgensi menjaga etika publik dalam proses legislasi dan penegakan keadilan. Mahasiswa FSH didorong tidak hanya memahami norma hukum secara tekstual, tetapi juga peka terhadap keadilan substantif di tengah masyarakat.</p><p>Hasil kajian dari diskusi ini dirangkum menjadi dokumen rekomendasi kebijakan (policy brief) yang dipublikasikan secara terbuka bagi sivitas akademika.</p>',
                'thumbnail' => 'posts/thumbnails/post-2-diskusi.jpg',
                'status' => 'published',
                'is_featured' => false,
                'views' => 178,
                'published_at' => now()->subDays(4),
            ],
            [
                'category_id' => $categories['aksi-konsolidasi']->id,
                'author_id' => $admin->id,
                'title' => 'Seruan Konsolidasi Mahasiswa FSH dan Aksi Simbolik Mengawal Transparansi Kebijakan Kampus',
                'slug' => 'seruan-konsolidasi-dan-aksi-simbolik-mengawal-transparansi-kebijakan',
                'excerpt' => 'DEMA FSH mengajak seluruh elemen mahasiswa FSH UIN SGD Bandung menghadiri konsolidasi terbuka dan aksi simbolik penegakan hak-hak akademik mahasiswa.',
                'content' => '<p>Menindaklanjuti berbagai masukan mahasiswa yang masuk melalui Ruang Aspirasi DEMA FSH, aliansi organisasi mahasiswa Fakultas Syariah dan Hukum menggelar konsolidasi akbar dan aksi simbolik di pelataran gedung fakultas.</p><p>Konsolidasi ini membawa sejumlah tuntutan strategis terkait keterbukaan informasi layanan akademik, perbaikan fasilitas ruang kuliah dan ruang baca, serta mekanisme banding Uang Kuliah Tunggal (UKT) yang lebih ramah bagi mahasiswa terdampak kondisi ekonomi.</p><p>DEMA FSH memastikan seluruh proses pengawalan kebijakan berjalan secara konstruktif, berbasis data kajian yang valid, dan mengedepankan dialog terbuka bersama pihak dekanat.</p>',
                'thumbnail' => 'posts/thumbnails/post-3-konsolidasi.jpg',
                'status' => 'published',
                'is_featured' => false,
                'views' => 312,
                'published_at' => now()->subDays(3),
            ],
            [
                'category_id' => $categories['oprec-pengumuman']->id,
                'author_id' => $admin->id,
                'title' => 'Open Recruitment Panitia Seminar Profesi Hukum Nasional FSH 2026',
                'slug' => 'open-recruitment-panitia-seminar-profesi-hukum-nasional-fsh-2026',
                'excerpt' => 'Kesempatan terbuka bagi mahasiswa aktif Fakultas Syariah dan Hukum UIN SGD Bandung untuk bergabung menjadi panitia Seminar Profesi Hukum Nasional 2026.',
                'content' => '<p>DEMA Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung membuka pendaftaran panitia pelaksana kegiatan <strong>Seminar Profesi Hukum Nasional 2026</strong> yang mengusung tema persiapan karier advokat, hakim, jaksa, dan konsultan hukum syariah di era transformasi digital.</p><p>Divisi yang dibuka meliputi Acara, Kesekretariatan, Hubungan Masyarakat & Media Partner, Publikasi Dekorasi Dokumentasi (PDD), serta Logistik & Konsumsi. Pendaftaran terbuka bagi mahasiswa aktif FSH angkatan 2023, 2024, dan 2025.</p><p>Segera daftarkan diri Anda dan jadilah bagian dari agenda akademik terbesar di Fakultas Syariah dan Hukum tahun ini!</p>',
                'thumbnail' => 'posts/thumbnails/post-4-oprec.jpg',
                'status' => 'published',
                'is_featured' => false,
                'views' => 420,
                'published_at' => now()->subDays(2),
            ],
            [
                'category_id' => $categories['dema-peduli']->id,
                'author_id' => $admin->id,
                'title' => 'DEMA FSH Peduli Salurkan Paket Bantuan Tanggap Bencana dan Buku Pendidikan di Jawa Barat',
                'slug' => 'aksi-kemanusiaan-dema-fsh-peduli-salurkan-bantuan-pendidikan-jabar',
                'excerpt' => 'Departemen Sosial Masyarakat bersama relawan mahasiswa FSH turun langsung menyalurkan bantuan logistik pangan, perlengkapan sekolah, dan santunan pendidikan.',
                'content' => '<p>Melalui gerakan solidaritas <strong>DEMA FSH Peduli</strong>, puluhan relawan mahasiswa Fakultas Syariah dan Hukum UIN Sunan Gunung Djati Bandung menyalurkan paket sembako, perlengkapan belajar, serta santunan darurat pendidikan kepada warga terdampak bencana banjir dan tanah longsor di sejumlah titik di Jawa Barat.</p><p>Dana kemanusiaan ini terhimpun dari partisipasi mahasiswa, dosen, alumni, serta masyarakat umum yang menyalurkan donasi melalui kanal resmi BSI dan QRIS DEMA FSH Peduli.</p><p>Kepala Departemen Sosial Masyarakat menyampaikan terima kasih kepada seluruh donatur serta mengajak mahasiswa terus menghidupkan kepedulian sosial di tengah masyarakat.</p>',
                'thumbnail' => 'posts/thumbnails/post-5-peduli.jpg',
                'status' => 'published',
                'is_featured' => false,
                'views' => 195,
                'published_at' => now()->subDay(),
            ],
            [
                'category_id' => $categories['kajian-opini']->id,
                'author_id' => $admin->id,
                'title' => 'Klinik Riset & Literasi Hukum Ekonomi Syariah Mahasiswa FSH: Merespons Regulasi Fintech Syariah',
                'slug' => 'klinik-literasi-digital-hukum-ekonomi-syariah-fsh-2026',
                'excerpt' => 'Menelaah kepatuhan akad muamalah dan perlindungan konsumen pada platform keuangan digital syariah melalui forum bedah regulasi dan penulisan artikel ilmiah.',
                'content' => '<p>Kabinet Andalusia DEMA FSH kembali menghadirkan Klinik Riset Hukum Ekonomi Syariah bagi mahasiswa yang ingin mendalami penulisan karya tulis ilmiah dan opini hukum kontemporer. Fokus pembahasan kali ini menyoroti perlindungan konsumen pada layanan pembiayaan digital syariah di Indonesia.</p><p>Peserta dibimbing membedah fatwa DSN-MUI, Peraturan Otoritas Jasa Keuangan (POJK), serta teknik argumentasi yuridis yang tajam agar karya mahasiswa FSH siap dipublikasikan di jurnal terakreditasi maupun kompetisi ilmiah nasional.</p>',
                'thumbnail' => 'posts/thumbnails/post-6-kajian.jpg',
                'status' => 'published',
                'is_featured' => false,
                'views' => 164,
                'published_at' => now()->subHours(12),
            ],
        ];

        foreach ($postsData as $post) {
            Post::updateOrCreate(
                ['slug' => $post['slug']],
                $post
            );
        }

        $departmentsData = [
            [
                'name' => 'Badan Pengurus Harian (BPH)',
                'slug' => 'bph',
                'description' => 'Pimpinan inti eksekutif mahasiswa yang mengoordinasikan kebijakan strategis, administrasi kesekretariatan, dan tata kelola keuangan DEMA FSH UIN SGD Bandung.',
                'sort_order' => 1,
                'members' => [
                    [
                        'name' => "Muhammad Syamsul Ma'arif",
                        'position' => 'Ketua Umum',
                        'instagram_handle' => '@mhmd_syamsul_mrf',
                        'photo' => 'members/member-1-syamsul.jpg',
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Salla Azhra',
                        'position' => 'Wakil Ketua Umum',
                        'instagram_handle' => '@salla_azhra',
                        'photo' => 'members/member-2-salla.jpg',
                        'sort_order' => 2,
                    ],
                ],
            ],
            [
                'name' => 'Departemen Komunikasi dan Informasi',
                'slug' => 'kominfo',
                'description' => 'Mengelola publikasi media sosial @demafshuinbdg, portal berita mahasiswa, desain kreatif, serta kemitraan media partner eksternal.',
                'sort_order' => 2,
                'members' => [
                    [
                        'name' => 'Fajar Sidik',
                        'position' => 'Kepala Departemen Kominfo',
                        'instagram_handle' => '@fajarsidik_id',
                        'photo' => 'members/member-5-fajar.jpg',
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Aulia Khairunnisa',
                        'position' => 'Sekretaris Departemen Kominfo',
                        'instagram_handle' => '@auliakhairun',
                        'photo' => 'members/member-6-aulia.jpg',
                        'sort_order' => 2,
                    ],
                ],
            ],
            [
                'name' => 'Departemen Advokasi dan Kajian Strategis',
                'slug' => 'advokasi-kajian-strategis',
                'description' => 'Menghimpun serta menindaklanjuti aspirasi mahasiswa FSH, mengawal kebijakan akademik-kemahasiswaan, serta memproduksi kajian isu hukum dan sosial.',
                'sort_order' => 3,
                'members' => [
                    [
                        'name' => 'Bagus Prasetyo',
                        'position' => 'Kepala Departemen Advokasi & Kastrat',
                        'instagram_handle' => '@bagusprasetyo.id',
                        'photo' => 'members/member-9-bagus.jpg',
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Rizky Maulana',
                        'position' => 'Koordinator Ruang Aspirasi & Kajian Hukum',
                        'instagram_handle' => '@rizkymaulana_fsh',
                        'photo' => 'members/member-7-dimas.jpg',
                        'sort_order' => 2,
                    ],
                ],
            ],
            [
                'name' => 'Departemen Sosial Masyarakat',
                'slug' => 'sosial-masyarakat',
                'description' => 'Menggerakkan program pengabdian masyarakat, solidaritas kemanusiaan, dan aksi tanggap bencana melalui program DEMA FSH Peduli.',
                'sort_order' => 4,
                'members' => [
                    [
                        'name' => 'Hendra Wijaya',
                        'position' => 'Kepala Departemen Sosial Masyarakat',
                        'instagram_handle' => '@hendrawjy_',
                        'photo' => 'members/member-13-hendra.jpg',
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Siti Nurhaliza',
                        'position' => 'Koordinator Program DEMA Peduli',
                        'instagram_handle' => '@sitinurhaliza.fsh',
                        'photo' => 'members/member-14-siti.jpg',
                        'sort_order' => 2,
                    ],
                ],
            ],
        ];

        foreach ($departmentsData as $deptData) {
            $members = $deptData['members'];
            unset($deptData['members']);

            $department = Department::updateOrCreate(
                ['slug' => $deptData['slug']],
                $deptData
            );

            Member::where('department_id', $department->id)
                ->whereNotIn('name', array_column($members, 'name'))
                ->delete();

            foreach ($members as $memberData) {
                Member::updateOrCreate(
                    [
                        'department_id' => $department->id,
                        'name' => $memberData['name'],
                    ],
                    $memberData
                );
            }
        }

        $achievementsData = [
            [
                'student_name' => 'Zakiya Ramadhani',
                'event_name' => 'Kompetisi Debat Hukum Nasional Piala Mahkamah Konstitusi 2026',
                'nim' => '1233050042',
                'major' => 'Ilmu Hukum',
                'rank' => 'Juara 1 & Best Speaker',
                'level' => 'Nasional',
                'photo' => 'achievements/photos/ach-1-zakiya.jpg',
                'certificate_file' => 'achievements/certificates/cert-zakiya-ramadhani.png',
                'is_published' => true,
            ],
            [
                'student_name' => 'Muhammad Farhan Hidayat',
                'event_name' => "Musabaqah Karya Tulis Ilmiah Al-Qur'an & Ekonomi Syariah Nasional 2026",
                'nim' => '1233020088',
                'major' => 'Hukum Ekonomi Syariah',
                'rank' => 'Juara 1 Karya Tulis Ilmiah',
                'level' => 'Nasional',
                'photo' => 'achievements/photos/ach-2-farhan.jpg',
                'certificate_file' => 'achievements/certificates/cert-farhan-hidayat.png',
                'is_published' => true,
            ],
            [
                'student_name' => 'Siti Rahma Aulia',
                'event_name' => 'Kompetisi Peradilan Semu & Orasi Konstitusi Mahasiswa Indonesia 2026',
                'nim' => '1243010035',
                'major' => 'Hukum Keluarga',
                'rank' => 'Medali Emas Orasi Hukum',
                'level' => 'Nasional',
                'photo' => 'achievements/photos/ach-3-siti.jpg',
                'certificate_file' => 'achievements/certificates/cert-siti-rahma.png',
                'is_published' => true,
            ],
            [
                'student_name' => 'Aldi Firmansyah',
                'event_name' => 'ASEAN Youth Legal & Sharia Innovation Symposium 2026',
                'nim' => '1233050114',
                'major' => 'Ilmu Hukum',
                'rank' => 'Best Delegate & Best Paper',
                'level' => 'Internasional',
                'photo' => 'achievements/photos/ach-4-aldi.jpg',
                'certificate_file' => 'achievements/certificates/cert-aldi-firmansyah.png',
                'is_published' => true,
            ],
            [
                'student_name' => 'Nabila Khoirunnisa',
                'event_name' => 'Festival Hukum & Tata Negara Mahasiswa Jawa Barat 2026',
                'nim' => '1243030051',
                'major' => 'Hukum Tata Negara',
                'rank' => 'Juara 2 Legal Opinion',
                'level' => 'Regional',
                'photo' => 'achievements/photos/ach-5-nabila.jpg',
                'certificate_file' => 'achievements/certificates/cert-nabila-khoirunnisa.png',
                'is_published' => true,
            ],
            [
                'student_name' => 'Rizki Maulana Putra',
                'event_name' => 'Pekan Ilmiah Mahasiswa Fakultas Syariah dan Hukum UIN SGD 2026',
                'nim' => '1243040029',
                'major' => 'Hukum Pidana Islam',
                'rank' => 'Juara 1 Esai Keadilan',
                'level' => 'Fakultas',
                'photo' => 'achievements/photos/ach-6-rizki.jpg',
                'certificate_file' => 'achievements/certificates/cert-rizki-maulana.png',
                'is_published' => true,
            ],
        ];

        foreach ($achievementsData as $ach) {
            Achievement::updateOrCreate(
                [
                    'student_name' => $ach['student_name'],
                    'event_name' => $ach['event_name'],
                ],
                $ach
            );
        }

        $donationsData = [
            [
                'title' => 'DEMA FSH Peduli: Bantuan Pendidikan & Darurat Bencana Jawa Barat',
                'description' => 'Program penghimpunan donasi kemanusiaan dan subsidi darurat pendidikan bagi mahasiswa Fakultas Syariah dan Hukum serta masyarakat terdampak bencana alam di wilayah Jawa Barat.',
                'qris_image' => 'donations/qris-peduli-jabar.png',
                'bank_info' => "Bank Syariah Indonesia (BSI)\nNo. Rekening: 7265001122\na.n. DEMA FSH UIN SGD Bandung",
                'target_amount' => 25000000,
                'collected_amount' => 11750000,
                'is_active' => true,
            ],
            [
                'title' => 'Dompet Beasiswa & Advokasi UKT Mahasiswa FSH Berdaya',
                'description' => 'Inisiatif solidaritas mahasiswa untuk meringankan biaya Uang Kuliah Tunggal (UKT), biaya tugas akhir, dan kebutuhan penunjang riset mahasiswa FSH yang mengalami kendala ekonomi.',
                'qris_image' => 'donations/qris-beasiswa-fsh.png',
                'bank_info' => "Bank Syariah Indonesia (BSI)\nNo. Rekening: 7265003344\na.n. Dompet Beasiswa DEMA FSH",
                'target_amount' => 30000000,
                'collected_amount' => 18400000,
                'is_active' => true,
            ],
        ];

        foreach ($donationsData as $don) {
            Donation::updateOrCreate(
                ['title' => $don['title']],
                $don
            );
        }

        $aspirationsData = [
            [
                'ticket_code' => 'ASP-FSH001',
                'sender_name' => 'Ahmad Fauzan',
                'nim' => '1243010018',
                'major' => 'Hukum Keluarga (Ahwal Syakhshiyyah)',
                'topic' => 'Fasilitas Ruang Baca dan Akses Jurnal Hukum Fakultas',
                'message' => 'Mohon perpanjangan jam operasional ruang baca Fakultas Syariah dan Hukum hingga pukul 18.00 WIB serta peningkatan stabilitas jaringan Wi-Fi untuk menunjang penyelesaian tugas akhir mahasiswa.',
                'status' => 'dikaji',
                'admin_response' => 'Aspirasi telah diterima oleh Departemen Advokasi & Kajian Strategis dan saat ini sedang disusun dalam nota kajian untuk audiensi bersama Wakil Dekan II FSH UIN SGD Bandung.',
            ],
            [
                'ticket_code' => 'ASP-FSH002',
                'sender_name' => 'Siti Maryam',
                'nim' => '1233050064',
                'major' => 'Ilmu Hukum',
                'topic' => 'Perbaikan Pendingin Ruangan dan Proyektor Gedung Kuliah FSH',
                'message' => 'Beberapa ruang perkuliahan di lantai 3 Gedung B mengalami gangguan pendingin ruangan dan konektor proyektor HDMI yang kurang stabil saat perkuliahan siang hari.',
                'status' => 'ditindaklanjuti',
                'admin_response' => 'Daftar ruang kelas terdampak telah disampaikan kepada Subbagian Perlengkapan FSH dan dijadwalkan untuk pengecekan teknisi minggu ini.',
            ],
            [
                'ticket_code' => 'ASP-FSH003',
                'sender_name' => 'Dafa Ramadhan',
                'nim' => '1243020091',
                'major' => 'Hukum Ekonomi Syariah (Muamalah)',
                'topic' => 'Publikasi Transparan Alur Surat Keterangan Aktif & Beasiswa',
                'message' => 'Usul penyediaan infografis alur pengajuan surat keterangan aktif kuliah serta rekap syarat berkas beasiswa fakultas agar mahasiswa baru mudah memahami prosedurnya.',
                'status' => 'selesai',
                'admin_response' => 'Infografis panduan layanan administrasi akademik telah diterbitkan bersama Departemen Kominfo di kanal resmi DEMA FSH dan papan pengumuman fakultas.',
            ],
            [
                'ticket_code' => 'ASP-FSH004',
                'sender_name' => null,
                'nim' => null,
                'major' => 'Hukum Tata Negara (Siyasah)',
                'topic' => 'Penambahan Kuota Bantuan Riset Skripsi Mahasiswa Tingkat Akhir',
                'message' => 'Berharap DEMA FSH mengusulkan skema subsidi penunjang penelitian lapangan atau publikasi jurnal bagi mahasiswa semester akhir yang terkendala biaya riset.',
                'status' => 'diterima',
                'admin_response' => null,
            ],
        ];

        foreach ($aspirationsData as $asp) {
            Aspiration::updateOrCreate(
                ['ticket_code' => $asp['ticket_code']],
                $asp
            );
        }

        $eventsData = [
            [
                'title' => 'Seminar Nasional Hukum & Transformasi Peradilan Syariah 2026',
                'slug' => 'seminar-nasional-hukum-transformasi-peradilan-syariah-2026',
                'category' => 'Seminar',
                'organizer' => 'DEMA FSH & Departemen Kajian Strategis',
                'event_date' => now()->addDays(10)->setTime(9, 0),
                'location' => 'Aula Fakultas Syariah dan Hukum Lt. 4, UIN SGD Bandung',
                'description' => 'Seminar nasional membahas dinamika pembaruan hukum positif dan peran peradilan agama di era digital bersama akademisi, hakim tinggi, dan praktisi hukum.',
                'poster' => 'events/event-1-seminar.jpg',
                'registration_url' => 'https://forms.gle/SeminarNasionalDemaFSH2026',
                'is_registration_open' => true,
                'is_published' => true,
            ],
            [
                'title' => 'Sekolah Advokasi & Teknik Persidangan Mahasiswa FSH',
                'slug' => 'sekolah-advokasi-teknik-persidangan-mahasiswa-fsh',
                'category' => 'Workshop & Pelatihan',
                'organizer' => 'Departemen Advokasi DEMA FSH',
                'event_date' => now()->addDays(18)->setTime(13, 30),
                'location' => 'Ruang Moot Court Fakultas Syariah dan Hukum',
                'description' => 'Pelatihan intensif penyusunan legal opinion, teknik persidangan semu, dan pendampingan advokasi mahasiswa bersama instruktur praktisi hukum.',
                'poster' => 'events/event-2-advokasi.jpg',
                'registration_url' => 'https://forms.gle/SekolahAdvokasiDemaFSH2026',
                'is_registration_open' => true,
                'is_published' => true,
            ],
            [
                'title' => 'Forum Diskusi Publik: Menimbang Etika Legislasi & Konstitusi',
                'slug' => 'forum-diskusi-publik-etika-legislasi-konstitusi',
                'category' => 'Diskusi Publik',
                'organizer' => 'Kabinet Andalusia DEMA FSH',
                'event_date' => now()->addDays(25)->setTime(15, 0),
                'location' => 'Student Center Lt. 2 / Live Streaming Zoom',
                'description' => 'Diskusi terbuka lintas himpunan jurusan mengkritisi isu tata negara mutakhir, kebijakan pendidikan tinggi, dan pengawalan konstitusi.',
                'poster' => 'events/event-3-diskusi.jpg',
                'registration_url' => 'https://forms.gle/DiskusiPublikDemaFSH2026',
                'is_registration_open' => true,
                'is_published' => true,
            ],
            [
                'title' => 'Kompetisi Debat Konstitusi & Karya Tulis Ilmiah Syariah FSH Cup 2026',
                'slug' => 'kompetisi-debat-hukum-syariah-fsh-cup-2026',
                'category' => 'Kompetisi',
                'organizer' => 'DEMA FSH UIN Sunan Gunung Djati Bandung',
                'event_date' => now()->addDays(32)->setTime(8, 30),
                'location' => 'Aula Utama & Ruang Moot Court FSH UIN SGD Bandung',
                'description' => 'Ajang perlombaan debat konstitusi dan karya tulis ilmiah syariah tingkat mahasiswa untuk menjaring delegasi unggulan Fakultas Syariah dan Hukum menuju kompetisi nasional.',
                'poster' => 'events/event-4-kompetisi.jpg',
                'registration_url' => 'https://forms.gle/KompetisiFSHCup2026',
                'is_registration_open' => true,
                'is_published' => true,
            ],
        ];

        foreach ($eventsData as $eventData) {
            Event::updateOrCreate(
                ['slug' => $eventData['slug']],
                $eventData
            );
        }

        $mediaPartnersData = [
            [
                'organization_name' => 'HMJ Ilmu Hukum UIN SGD Bandung',
                'event_name' => 'Legal Fair & Career Expo FSH 2026',
                'contact_wa' => '6281222334455',
                'package_type' => 'kolaborasi',
                'event_date' => now()->addDays(20)->toDateString(),
                'poster_file' => 'media-partners/mp-1-legalfair.jpg',
                'notes' => 'Mohon dukungan publikasi Instagram feed, story, dan pencantuman logo DEMA FSH pada backdrop panggung.',
                'status' => 'disetujui',
            ],
            [
                'organization_name' => 'KSEI Sharia Economics Club UIN SGD',
                'event_name' => 'Festival Ekonomi Syariah & Muamalah Fair 2026',
                'contact_wa' => '6281333445566',
                'package_type' => 'gratis',
                'event_date' => now()->addDays(28)->toDateString(),
                'poster_file' => 'media-partners/mp-2-festsyariah.jpg',
                'notes' => 'Publikasi poster rangkaian seminar nasional dan bazar kewirausahaan mahasiswa syariah.',
                'status' => 'menunggu',
            ],
            [
                'organization_name' => 'Lembaga Konsultasi & Bantuan Hukum Mahasiswa',
                'event_name' => 'Simposium Akses Keadilan dan Literasi Hukum Masyarakat',
                'contact_wa' => '6281444556677',
                'package_type' => 'berbayar',
                'event_date' => now()->addDays(35)->toDateString(),
                'poster_file' => 'media-partners/mp-3-dialog-kebangsaan.jpg',
                'notes' => 'Paket media partner prioritas termasuk liputan portal berita DEMA FSH pasca-acara.',
                'status' => 'disetujui',
            ],
        ];

        foreach ($mediaPartnersData as $mpData) {
            MediaPartner::updateOrCreate(
                [
                    'organization_name' => $mpData['organization_name'],
                    'event_name' => $mpData['event_name'],
                ],
                $mpData
            );
        }
    }
}
