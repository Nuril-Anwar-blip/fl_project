<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientProfile extends Model
{
    use HasFactory;

    protected $table = 'patient_profiles';

    protected $fillable = [
        'user_id',
        'no_rekam_medis',
        'tanggal_lahir',
        'jenis_kelamin',
        'berat_badan',
        'tinggi_badan',
        'riwayat_keluarga_diabetes'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'riwayat_keluarga_diabetes' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function healthRecords()
    {
        return $this->hasMany(HealthRecord::class, 'patient_id');
    }

    public function predictions()
    {
        return $this->hasMany(Prediction::class, 'patient_id');
    }

    public function federatedNodes()
    {
        return $this->hasMany(FederatedNode::class, 'patient_id');
    }
}
