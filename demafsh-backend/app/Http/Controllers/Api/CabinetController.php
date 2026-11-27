<?php

namespace App\Http\Controllers\Api;

use App\Models\Department;
use App\Models\Member;
use Illuminate\Http\JsonResponse;

class CabinetController extends ApiController
{
    public function index(): JsonResponse
    {
        $departments = Department::query()
            ->with(['members' => fn ($query) => $query->orderBy('sort_order')])
            ->orderBy('sort_order')
            ->get();

        $data = $departments->map(function (Department $department): array {
            return [
                'id' => $department->id,
                'name' => $department->name,
                'slug' => $department->slug,
                'description' => $department->description,
                'sort_order' => $department->sort_order,
                'members' => $department->members->map(function (Member $member): array {
                    return [
                        'id' => $member->id,
                        'name' => $member->name,
                        'position' => $member->position,
                        'instagram_handle' => $member->instagram_handle,
                        'photo' => $member->photo,
                        'photo_url' => $this->storageUrl($member->photo),
                        'sort_order' => $member->sort_order,
                    ];
                })->values(),
            ];
        })->values();

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
