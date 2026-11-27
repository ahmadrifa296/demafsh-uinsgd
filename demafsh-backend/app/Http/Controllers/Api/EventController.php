<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        $category = trim((string) $request->query('category', ''));
        $search = trim((string) $request->query('search', ''));

        $query = Event::query()
            ->published()
            ->orderByRaw('event_date IS NULL')
            ->orderBy('event_date')
            ->latest('id');

        if ($category !== '') {
            $query->where('category', $category);
        }

        if ($search !== '') {
            $query->where(function ($q) use ($search): void {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('organizer', 'like', "%{$search}%");
            });
        }

        $events = $query->get()->map(fn (Event $event): array => $this->transform($event))->values();

        $categories = Event::query()
            ->published()
            ->select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->values();

        return response()->json([
            'success' => true,
            'data' => $events,
            'categories' => $categories,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $event = Event::query()
            ->published()
            ->where('slug', $slug)
            ->first();

        if (! $event) {
            return response()->json([
                'success' => false,
                'message' => 'Event atau kegiatan tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->transform($event),
        ]);
    }

    private function transform(Event $event): array
    {
        return [
            'id' => $event->id,
            'title' => $event->title,
            'slug' => $event->slug,
            'category' => $event->category,
            'description' => $event->description,
            'event_date' => $event->event_date?->toIso8601String(),
            'location' => $event->location,
            'organizer' => $event->organizer,
            'poster' => $event->poster,
            'poster_url' => $this->storageUrl($event->poster),
            'registration_url' => $event->registration_url,
            'is_registration_open' => $event->is_registration_open,
            'is_published' => $event->is_published,
            'created_at' => $event->created_at?->toIso8601String(),
        ];
    }
}
