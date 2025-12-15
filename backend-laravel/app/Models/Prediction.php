<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prediction extends Model
{
    use HasFactory;

    protected $table = 'predictions';

    protected $fillable = [
        'patient_id',
        'health_record_id',
        'risk_score',
        'risk_level',
        'model_version',
        'predicted_at'
    ];

    protected $casts = [
        'risk_score' => 'float',
        'predicted_at' => 'datetime'
    ];

    public function patient()
    {
        return $this->belongsTo(PatientProfile::class, 'patient_id');
    }

    public function healthRecord()
    {
        return $this->belongsTo(HealthRecord::class, 'health_record_id');
    }
}
