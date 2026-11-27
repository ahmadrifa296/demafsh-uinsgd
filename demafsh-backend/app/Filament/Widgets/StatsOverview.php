<?php

namespace App\Filament\Widgets;

use App\Models\Achievement;
use App\Models\Aspiration;
use App\Models\MediaPartner;
use App\Models\Post;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $publishedPosts = Post::published()->count();
        $draftPosts = Post::where('status', 'draft')->count();

        $totalAspirations = Aspiration::count();
        $waitingAspirations = Aspiration::where('status', 'diterima')->count();
        $reviewingAspirations = Aspiration::where('status', 'dikaji')->count();

        $totalAchievements = Achievement::count();
        $unverifiedAchievements = Achievement::where('is_published', false)->count();

        $pendingMediaPartners = MediaPartner::where('status', 'menunggu')->count();
        $totalMediaPartners = MediaPartner::count();

        return [
            Stat::make('Berita Tayang', $publishedPosts)
                ->description("{$draftPosts} artikel masih berstatus draft")
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('primary'),

            Stat::make('Aspirasi Masuk', $totalAspirations)
                ->description("{$waitingAspirations} menunggu kajian · {$reviewingAspirations} dikaji")
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color($waitingAspirations > 0 ? 'warning' : 'success'),

            Stat::make('Prestasi Mahasiswa', $totalAchievements)
                ->description("{$unverifiedAchievements} belum diverifikasi")
                ->descriptionIcon('heroicon-m-trophy')
                ->color($unverifiedAchievements > 0 ? 'amber' : 'success'),

            Stat::make('Pengajuan Media Partner', $pendingMediaPartners)
                ->description("Menunggu persetujuan (dari {$totalMediaPartners} pengajuan)")
                ->descriptionIcon('heroicon-m-megaphone')
                ->color($pendingMediaPartners > 0 ? 'warning' : 'success'),
        ];
    }
}
