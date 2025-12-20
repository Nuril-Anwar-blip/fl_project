<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'appointment_id',
        'symptoms',
        'diagnosis',
        'treatment',
        'notes',
        'vital_signs',
    ];

    protected $casts = [
        'vital_signs' => 'array',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class)->with('user');
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class)->with('user');
    }

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }
}
