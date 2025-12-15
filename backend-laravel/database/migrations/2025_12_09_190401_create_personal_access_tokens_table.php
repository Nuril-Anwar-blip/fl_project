<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * CreatePersonalAccessTokensTable Migration
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            // Hubungkan langsung ke users (karena token hanya untuk users dalam skema ini)
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nama_token', 191)->comment('label token, mis. "mobile-app", "postman"');
            $table->string('token', 64)->unique()->comment('token (sebaiknya disimpan hashed)');
            $table->text('abilities')->nullable()->comment('kemampuan/akses token (JSON)');
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            // index cepat untuk lookup token
            $table->index('token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('personal_access_tokens');
    }
};
