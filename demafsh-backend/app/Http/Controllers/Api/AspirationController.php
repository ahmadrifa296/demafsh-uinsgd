<?php

namespace App\Http\Controllers\Api;

use App\Models\Aspiration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AspirationController extends ApiController
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'sender_name' => ['nullable', 'string', 'max:255'],
            'nim' => ['nullable', 'string', 'max:50'],
            'major' => ['required', 'string', 'max:255'],
            'topic' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ]);

        do {
            $ticketCode = 'ASP-' . Str::upper(Str::random(6));
        } while (Aspiration::where('ticket_code', $ticketCode)->exists());

        $aspiration = Aspiration::create([
            'ticket_code' => $ticketCode,
            'sender_name' => $validated['sender_name'] ?? null,
            'nim' => $validated['nim'] ?? null,
            'major' => $validated['major'],
            'topic' => $validated['topic'],
            'message' => $validated['message'],
            'status' => 'diterima',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Aspirasi berhasil dikirim. Simpan kode tiket Anda untuk memantau tindak lanjut.',
            'data' => [
                'ticket_code' => $aspiration->ticket_code,
                'sender_name' => $aspiration->sender_name ?: 'Anonim',
                'major' => $aspiration->major,
                'topic' => $aspiration->topic,
                'status' => $aspiration->status,
                'created_at' => $aspiration->created_at?->toIso8601String(),
            ],
        ], 201);
    }

    public function show(string $ticketCode): JsonResponse
    {
        $normalizedCode = Str::upper(trim($ticketCode));

        $aspiration = Aspiration::where('ticket_code', $normalizedCode)->first();

        if (! $aspiration) {
            return response()->json([
                'success' => false,
                'message' => 'Tiket aspirasi tidak ditemukan. Periksa kembali kode tiket Anda.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'ticket_code' => $aspiration->ticket_code,
                'sender_name' => $aspiration->sender_name ?: 'Anonim',
                'major' => $aspiration->major,
                'topic' => $aspiration->topic,
                'message' => $aspiration->message,
                'status' => $aspiration->status,
                'admin_response' => $aspiration->admin_response,
                'created_at' => $aspiration->created_at?->toIso8601String(),
                'updated_at' => $aspiration->updated_at?->toIso8601String(),
            ],
        ]);
    }
}
