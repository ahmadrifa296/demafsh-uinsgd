<?php

namespace App\Http\Controllers\Api;

use App\Models\MediaPartner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MediaPartnerController extends ApiController
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'organization_name' => ['required', 'string', 'max:255'],
            'event_name' => ['required', 'string', 'max:255'],
            'contact_wa' => ['required', 'string', 'max:50'],
            'package_type' => ['required', 'in:gratis,berbayar,kolaborasi'],
            'event_date' => ['nullable', 'date'],
            'poster_file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:5120'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $posterPath = $request->hasFile('poster_file')
            ? $request->file('poster_file')->store('media-partners', 'public')
            : null;

        $mediaPartner = MediaPartner::create([
            'organization_name' => $validated['organization_name'],
            'event_name' => $validated['event_name'],
            'contact_wa' => $validated['contact_wa'],
            'package_type' => $validated['package_type'],
            'event_date' => $validated['event_date'] ?? null,
            'poster_file' => $posterPath,
            'notes' => $validated['notes'] ?? null,
            'status' => 'menunggu',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengajuan media partner berhasil dikirim dan sedang menunggu persetujuan Departemen Kominfo.',
            'data' => [
                'id' => $mediaPartner->id,
                'organization_name' => $mediaPartner->organization_name,
                'event_name' => $mediaPartner->event_name,
                'package_type' => $mediaPartner->package_type,
                'status' => $mediaPartner->status,
                'poster_url' => $this->storageUrl($mediaPartner->poster_file),
            ],
        ], 201);
    }
}
