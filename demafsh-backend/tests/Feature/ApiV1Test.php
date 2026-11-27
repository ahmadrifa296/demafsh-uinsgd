<?php

namespace Tests\Feature;

use App\Models\Achievement;
use App\Models\Aspiration;
use App\Models\MediaPartner;
use App\Models\Post;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ApiV1Test extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_settings_endpoint_returns_site_settings(): void
    {
        $response = $this->getJson('/api/v1/settings');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.period', '2026–2027')
            ->assertJsonPath('data.instagram_handle', '@demafshuinbdg');
    }

    public function test_posts_endpoint_supports_filtering_search_and_returns_categories_and_featured(): void
    {
        $response = $this->getJson('/api/v1/posts?limit=2&page=1');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data')
            ->assertJsonCount(5, 'categories')
            ->assertJsonPath('meta.total', 6)
            ->assertJsonPath('featured.is_featured', true);

        $filtered = $this->getJson('/api/v1/posts?category=kajian-opini&search=Pidana');

        $filtered->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.category.slug', 'kajian-opini');
    }

    public function test_post_detail_increments_views_and_returns_three_related_posts(): void
    {
        $post = Post::published()->firstOrFail();
        $initialViews = $post->views;

        $response = $this->getJson("/api/v1/posts/{$post->slug}");

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.slug', $post->slug)
            ->assertJsonPath('data.views', $initialViews + 1)
            ->assertJsonCount(3, 'related');
    }

    public function test_cabinet_endpoint_returns_ordered_departments_and_members(): void
    {
        $response = $this->getJson('/api/v1/cabinet');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(4, 'data')
            ->assertJsonPath('data.0.slug', 'bph')
            ->assertJsonPath('data.0.members.0.instagram_handle', '@mhmd_syamsul_mrf')
            ->assertJsonPath('data.0.members.1.instagram_handle', '@salla_azhra');
    }

    public function test_donations_endpoint_returns_active_campaigns(): void
    {
        $response = $this->getJson('/api/v1/donations');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.is_active', true);
    }

    public function test_aspirations_can_be_submitted_and_tracked(): void
    {
        $trackExisting = $this->getJson('/api/v1/aspirations/ASP-FSH001');
        $trackExisting->assertOk()
            ->assertJsonPath('data.ticket_code', 'ASP-FSH001')
            ->assertJsonPath('data.status', 'dikaji');

        $create = $this->postJson('/api/v1/aspirations', [
            'sender_name' => 'Mahasiswa Uji',
            'nim' => '1243050099',
            'major' => 'Ilmu Hukum',
            'topic' => 'Layanan Akademik',
            'message' => 'Mohon informasi jadwal bimbingan skripsi diperbarui secara berkala.',
        ]);

        $create->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.status', 'diterima');

        $ticketCode = $create->json('data.ticket_code');
        $this->assertMatchesRegularExpression('/^ASP-[A-Z0-9]{6}$/', $ticketCode);
        $this->assertDatabaseHas('aspirations', ['ticket_code' => $ticketCode]);

        $this->getJson("/api/v1/aspirations/{$ticketCode}")
            ->assertOk()
            ->assertJsonPath('data.ticket_code', $ticketCode);
    }

    public function test_achievements_list_published_and_store_unverified_with_uploads(): void
    {
        Storage::fake('public');

        $this->getJson('/api/v1/achievements')
            ->assertOk()
            ->assertJsonCount(6, 'data');

        $response = $this->post('/api/v1/achievements', [
            'student_name' => 'Rafi Akbar',
            'nim' => '1233020010',
            'major' => 'Hukum Ekonomi Syariah',
            'event_name' => 'Lomba Karya Tulis Ilmiah Nasional 2026',
            'rank' => 'Juara 2',
            'level' => 'Nasional',
            'photo' => UploadedFile::fake()->image('photo.jpg'),
            'certificate_file' => UploadedFile::fake()->create('sertifikat.pdf', 100, 'application/pdf'),
        ], ['Accept' => 'application/json']);

        $response->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.is_published', false);

        $achievement = Achievement::where('student_name', 'Rafi Akbar')->firstOrFail();
        $this->assertFalse($achievement->is_published);
        Storage::disk('public')->assertExists($achievement->photo);
        Storage::disk('public')->assertExists($achievement->certificate_file);

        $this->getJson('/api/v1/achievements')
            ->assertOk()
            ->assertJsonCount(6, 'data');
    }

    public function test_media_partner_submission_uploads_poster_and_sets_menunggu_status(): void
    {
        Storage::fake('public');

        $response = $this->post('/api/v1/media-partners', [
            'organization_name' => 'HMJ Ilmu Hukum UIN SGD',
            'event_name' => 'Legal Fair 2026',
            'contact_wa' => '081298765432',
            'package_type' => 'kolaborasi',
            'event_date' => '2026-12-15',
            'poster_file' => UploadedFile::fake()->image('poster.png'),
            'notes' => 'Mohon publikasi feed dan story Instagram.',
        ], ['Accept' => 'application/json']);

        $response->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.status', 'menunggu');

        $partner = MediaPartner::where('event_name', 'Legal Fair 2026')->firstOrFail();
        $this->assertSame('menunggu', $partner->status);
        Storage::disk('public')->assertExists($partner->poster_file);
    }

    public function test_events_endpoint_returns_published_events_with_registration_links(): void
    {
        $response = $this->getJson('/api/v1/events');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(4, 'data')
            ->assertJsonPath('data.0.is_registration_open', true);

        $filtered = $this->getJson('/api/v1/events?category=Seminar');
        $filtered->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.category', 'Seminar');

        $slug = $response->json('data.0.slug');
        $this->getJson("/api/v1/events/{$slug}")
            ->assertOk()
            ->assertJsonPath('data.slug', $slug)
            ->assertJsonStructure(['data' => ['id', 'title', 'registration_url']]);
    }
}
