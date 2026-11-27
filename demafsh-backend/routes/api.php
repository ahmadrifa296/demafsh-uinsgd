<?php

use App\Http\Controllers\Api\AchievementController;
use App\Http\Controllers\Api\AspirationController;
use App\Http\Controllers\Api\CabinetController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\MediaPartnerController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::get('/settings', [SettingController::class, 'index']);

    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{slug}', [PostController::class, 'show']);

    Route::get('/cabinet', [CabinetController::class, 'index']);
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{slug}', [EventController::class, 'show']);
    Route::get('/donations', [DonationController::class, 'index']);

    Route::post('/aspirations', [AspirationController::class, 'store'])
        ->middleware('throttle:15,1');
    Route::get('/aspirations/{ticketCode}', [AspirationController::class, 'show']);

    Route::get('/achievements', [AchievementController::class, 'index']);
    Route::post('/achievements', [AchievementController::class, 'store'])
        ->middleware('throttle:10,1');

    Route::post('/media-partners', [MediaPartnerController::class, 'store'])
        ->middleware('throttle:10,1');
});
