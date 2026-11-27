<?php

namespace Tests\Feature;

use App\Filament\Widgets\StatsOverview;
use App\Models\Achievement;
use App\Models\Aspiration;
use App\Models\Department;
use App\Models\Donation;
use App\Models\Event;
use App\Models\Member;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\SiteSetting;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class FilamentPanelTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_root_redirects_to_admin(): void
    {
        $this->get('/')->assertRedirect('/admin');
    }

    public function test_admin_can_access_dashboard_stats_and_all_resources(): void
    {
        $admin = User::where('email', 'admin@demafsh.test')->firstOrFail();

        $this->actingAs($admin);

        $this->get('/admin')->assertOk()->assertSee('CMS DEMA FSH UIN SGD');

        Livewire::test(StatsOverview::class)
            ->assertOk()
            ->assertSee('Berita Tayang')
            ->assertSee('Aspirasi Masuk')
            ->assertSee('Prestasi Mahasiswa')
            ->assertSee('Pengajuan Media Partner');

        $urls = [
            '/admin/site-settings',
            '/admin/site-settings/create',
            '/admin/site-settings/' . SiteSetting::firstOrFail()->id . '/edit',
            '/admin/departments',
            '/admin/departments/create',
            '/admin/departments/' . Department::firstOrFail()->id . '/edit',
            '/admin/members',
            '/admin/members/create',
            '/admin/members/' . Member::firstOrFail()->id . '/edit',
            '/admin/post-categories',
            '/admin/post-categories/create',
            '/admin/post-categories/' . PostCategory::firstOrFail()->id . '/edit',
            '/admin/posts',
            '/admin/posts/create',
            '/admin/posts/' . Post::firstOrFail()->id . '/edit',
            '/admin/aspirations',
            '/admin/aspirations/create',
            '/admin/aspirations/' . Aspiration::firstOrFail()->id . '/edit',
            '/admin/achievements',
            '/admin/achievements/create',
            '/admin/achievements/' . Achievement::firstOrFail()->id . '/edit',
            '/admin/media-partners',
            '/admin/media-partners/create',
            '/admin/donations',
            '/admin/donations/create',
            '/admin/donations/' . Donation::firstOrFail()->id . '/edit',
            '/admin/events',
            '/admin/events/create',
            '/admin/events/' . Event::firstOrFail()->id . '/edit',
        ];

        foreach ($urls as $url) {
            $this->get($url)->assertOk();
        }
    }
}
