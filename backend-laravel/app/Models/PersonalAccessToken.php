<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalAccessToken extends Model
{
    use HasFactory;

    protected $table = 'personal_access_tokens';

    protected $fillable = [
        'user_id',
        'nama_token',
        'token',
        'abilities',
        'last_used_at',
        'expires_at'
    ];

    protected $casts = [
        'last_used_at' => 'datetime',
        'expires_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
