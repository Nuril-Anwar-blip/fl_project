<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'nama',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified' => 'datetime',
    ];

    // Mutator untuk bcrypt password
    public function setPasswordAttribute($value)
    {
        if ($value) $this->attributes['password'] = bcrypt($value);
    }

    public function patientProfile()
    {
        return $this->hasOne(PatientProfile::class, 'user_id');
    }

    public function personalAccessTokens()
    {
        return $this->hasMany(PersonalAccessToken::class, 'user_id');
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class, 'user_id');
    }

    public function educationArticles()
    {
        return $this->hasMany(EducationArticle::class, 'author_id');
    }
}
