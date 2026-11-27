<?php

namespace App\Http\Controllers\Api;

use App\Models\Achievement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AchievementController extends ApiController
{
    public function index(): JsonResponse
    {
        $achievements = Achievement::query()
            ->where('is_published', true)
            ->latest()
            ->get();

        $data = $achievements->map(function (Achievement $achievement): array {
            return [
                'id' => $achievement->id,
                'student_name' => $achievement->student_name,
                'nim' => $achievement->nim,
                'major' => $achievement->major,
                'event_name' => $achievement->event_name,
                'rank' => $achievement->rank,
                'level' => $achievement->level,
                'photo' => $achievement->photo,
                'photo_url' => $this->storageUrl($achievement->photo),
                'certificate_file' => $achievement->certificate_file,
                'certificate_url' => $this->storageUrl($achievement->certificate_file),
                'created_at' => $achievement->created_at?->toIso8601String(),
            ];
        })->values();

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'student_name' => ['required', 'string', 'max:255'],
            'nim' => ['nullable', 'string', 'max:50'],
            'major' => ['required', 'string', 'max:255'],
            'event_name' => ['required', 'string', 'max:255'],
            'rank' => ['required', 'string', 'max:255'],
            'level' => ['required', 'string', 'max:100'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'certificate_file' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $photoPath = $request->hasFile('photo')
            ? $request->file('photo')->store('achievements/photos', 'public')
            : null;

        $certificatePath = $request->hasFile('certificate_file')
            ? $request->file('certificate_file')->store('achievements/certificates', 'public')
            : null;

        $achievement = Achievement::create([
            'student_name' => $validated['student_name'],
            'nim' => $validated['nim'] ?? null,
            'major' => $validated['major'],
            'event_name' => $validated['event_name'],
            'rank' => $validated['rank'],
            'level' => $validated['level'],
            'photo' => $photoPath,
            'certificate_file' => $certificatePath,
            'is_published' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengajuan prestasi berhasil dikirim dan menunggu verifikasi admin DEMA FSH.',
            'data' => [
                'id' => $achievement->id,
                'student_name' => $achievement->student_name,
                'event_name' => $achievement->event_name,
                'rank' => $achievement->rank,
                'level' => $achievement->level,
                'is_published' => $achievement->is_published,
            ],
        ], 201);
    }
}
