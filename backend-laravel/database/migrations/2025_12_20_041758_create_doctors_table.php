<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('specialization');
            $table->string('license_number')->unique();
            $table->integer('experience_years')->default(0);
            $table->decimal('consultation_fee', 10, 2)->default(0);
            $table->json('available_days')->nullable();
            $table->json('available_hours')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('specialization');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
