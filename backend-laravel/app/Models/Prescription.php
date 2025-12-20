<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'medical_record_id',
        'medication_name',
        'dosage',
        'frequency',
        'duration_days',
        'instructions',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class)->with('user');
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class)->with('user');
    }

    public function medicalRecord()
    {
        return $this->belongsTo(MedicalRecord::class);
    }

    public function isActive()
    {
        return $this->end_date >= today();
    }
}
