<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FederatedNode extends Model
{
    use HasFactory;

    protected $table = 'federated_nodes';

    protected $fillable = [
        'device_id',
        'patient_id',
        'status',
        'last_sync_at',
        'local_accuracy'
    ];

    protected $casts = [
        'last_sync_at' => 'datetime',
        'local_accuracy' => 'float'
    ];

    public function patient()
    {
        return $this->belongsTo(PatientProfile::class, 'patient_id');
    }
}