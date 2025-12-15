<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'password_resets';
    protected $fillable = ['user_id', 'email', 'token', 'created_at'];

    protected $casts = [
        'created_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
