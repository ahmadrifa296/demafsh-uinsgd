<?php

namespace App\Http\Controllers\Api;

use App\Models\Donation;
use Illuminate\Http\JsonResponse;

class DonationController extends ApiController
{
    public function index(): JsonResponse
    {
        $donations = Donation::query()
            ->where('is_active', true)
            ->latest()
            ->get();

        $data = $donations->map(function (Donation $donation): array {
            $progress = $donation->target_amount > 0
                ? min(100, round(($donation->collected_amount / $donation->target_amount) * 100, 1))
                : 0;

            return [
                'id' => $donation->id,
                'title' => $donation->title,
                'description' => $donation->description,
                'qris_image' => $donation->qris_image,
                'qris_image_url' => $this->storageUrl($donation->qris_image),
                'bank_info' => $donation->bank_info,
                'target_amount' => $donation->target_amount,
                'collected_amount' => $donation->collected_amount,
                'progress_percentage' => $progress,
                'is_active' => $donation->is_active,
                'created_at' => $donation->created_at?->toIso8601String(),
            ];
        })->values();

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
