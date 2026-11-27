<?php

namespace App\Http\Controllers\Api;

use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SettingController extends ApiController
{
    public function index(): JsonResponse
    {
        $setting = SiteSetting::first();

        if (! $setting) {
            return response()->json([
                'success' => true,
                'data' => null,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $setting->id,
                'organization_name' => $setting->organization_name,
                'cabinet_name' => $setting->cabinet_name,
                'period' => $setting->period,
                'hero_title' => $setting->hero_title,
                'hero_subtitle' => $setting->hero_subtitle,
                'vision' => $setting->vision,
                'mission' => $setting->mission,
                'instagram_handle' => $setting->instagram_handle,
                'email' => $setting->email,
                'whatsapp' => $setting->whatsapp,
                'address' => $setting->address,
                'logo' => $setting->logo,
                'logo_url' => $this->storageUrl($setting->logo),
                'updated_at' => $setting->updated_at,
            ],
        ]);
    }
}
