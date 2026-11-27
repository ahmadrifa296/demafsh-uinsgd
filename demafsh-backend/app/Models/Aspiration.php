<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aspiration extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_code',
        'sender_name',
        'nim',
        'major',
        'topic',
        'message',
        'status',
        'admin_response',
    ];
}
