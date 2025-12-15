<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingRound extends Model
{
    use HasFactory;

    protected $table = 'training_rounds';

    protected $fillable = [
        'round_number',
        'global_accuracy',
        'global_loss',
        'num_participants',
        'started_at',
        'finished_at'
    ];

    protected $casts = [
        'global_accuracy' => 'float',
        'global_loss' => 'float',
        'num_participants' => 'integer',
        'started_at' => 'datetime',
        'finished_at' => 'datetime'
    ];
}
