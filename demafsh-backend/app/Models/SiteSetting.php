<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_name',
        'cabinet_name',
        'period',
        'hero_title',
        'hero_subtitle',
        'vision',
        'mission',
        'instagram_handle',
        'email',
        'whatsapp',
        'address',
        'logo',
    ];
}
