<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

abstract class ApiController extends Controller
{
    /**
     * Resolve a public storage path into an absolute URL.
     */
    protected function storageUrl(?string $path): ?string
    {
        if (blank($path)) {
            return null;
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        return url('storage/' . ltrim($path, '/'));
    }
}
