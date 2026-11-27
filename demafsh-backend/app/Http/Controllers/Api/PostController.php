<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        $limit = max(1, min((int) $request->query('limit', 9), 50));
        $categorySlug = $request->query('category');
        $search = trim((string) $request->query('search', ''));

        $query = Post::query()
            ->published()
            ->with(['category:id,name,slug,color', 'author:id,name'])
            ->latest('published_at');

        if (filled($categorySlug)) {
            $query->whereHas('category', function (Builder $q) use ($categorySlug): void {
                $q->where('slug', $categorySlug);
            });
        }

        if ($search !== '') {
            $query->where(function (Builder $q) use ($search): void {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $paginator = $query->paginate($limit);

        $categories = PostCategory::query()
            ->withCount(['posts' => fn (Builder $q): Builder => $q->published()])
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'color']);

        $featured = Post::query()
            ->published()
            ->with(['category:id,name,slug,color', 'author:id,name'])
            ->where('is_featured', true)
            ->latest('published_at')
            ->first();

        return response()->json([
            'success' => true,
            'data' => collect($paginator->items())->map(fn (Post $post): array => $this->formatPost($post, false))->values(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
            'categories' => $categories,
            'featured' => $featured ? $this->formatPost($featured, false) : null,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $post = Post::query()
            ->published()
            ->with(['category:id,name,slug,color', 'author:id,name'])
            ->where('slug', $slug)
            ->first();

        if (! $post) {
            return response()->json([
                'success' => false,
                'message' => 'Artikel tidak ditemukan.',
            ], 404);
        }

        $post->increment('views');
        $post->refresh();

        $related = Post::query()
            ->published()
            ->with(['category:id,name,slug,color', 'author:id,name'])
            ->where('id', '!=', $post->id)
            ->where('category_id', $post->category_id)
            ->latest('published_at')
            ->limit(3)
            ->get();

        if ($related->count() < 3) {
            $excludedIds = $related->pluck('id')->push($post->id)->all();
            $fallback = Post::query()
                ->published()
                ->with(['category:id,name,slug,color', 'author:id,name'])
                ->whereNotIn('id', $excludedIds)
                ->latest('published_at')
                ->limit(3 - $related->count())
                ->get();

            $related = $related->concat($fallback);
        }

        return response()->json([
            'success' => true,
            'data' => $this->formatPost($post, true),
            'related' => $related->map(fn (Post $item): array => $this->formatPost($item, false))->values(),
        ]);
    }

    /**
     * Format a Post model consistently for list and detail endpoints.
     */
    protected function formatPost(Post $post, bool $includeContent): array
    {
        $data = [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'thumbnail' => $post->thumbnail,
            'thumbnail_url' => $this->storageUrl($post->thumbnail),
            'status' => $post->status,
            'is_featured' => $post->is_featured,
            'views' => $post->views,
            'published_at' => $post->published_at?->toIso8601String(),
            'category' => $post->category ? [
                'id' => $post->category->id,
                'name' => $post->category->name,
                'slug' => $post->category->slug,
                'color' => $post->category->color,
            ] : null,
            'author' => $post->author ? [
                'id' => $post->author->id,
                'name' => $post->author->name,
            ] : null,
        ];

        if ($includeContent) {
            $data['content'] = $post->content;
        }

        return $data;
    }
}
