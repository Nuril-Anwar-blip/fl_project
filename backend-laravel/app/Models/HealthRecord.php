<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthRecord extends Model
{
    use HasFactory;

    protected $table = 'health_records';

    protected $fillable = [
        'patient_id',
        'tanggal_pencatatan',
        'kadar_gula_darah',
        'tekanan_darah_sistolik',
        'tekanan_darah_diastolik',
        'bmi',
        'aktivitas_fisik',
        'catatan_tambahan'
    ];

    protected $casts = [
        'tanggal_pencatatan' => 'date',
        'kadar_gula_darah' => 'float',
        'tekanan_darah_sistolik' => 'integer',
        'tekanan_darah_diastolik' => 'integer',
        'bmi' => 'float'
    ];

    public function patient()
    {
        return $this->belongsTo(PatientProfile::class, 'patient_id');
    }

    public function prediction()
    {
        return $this->hasOne(Prediction::class, 'health_record_id');
    }
}
