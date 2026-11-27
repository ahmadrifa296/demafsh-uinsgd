<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'qris_image',
        'bank_info',
        'target_amount',
        'collected_amount',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'target_amount' => 'integer',
            'collected_amount' => 'integer',
            'is_active' => 'boolean',
        ];
    }
}
