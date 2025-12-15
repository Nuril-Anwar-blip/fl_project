<?php

namespace App\Http\Controllers\Traits;

use App\Models\PersonalAccessToken;
use Illuminate\Http\Request;

/**
 * Trait untuk autentikasi menggunakan token personal access
 * Digunakan untuk memverifikasi token yang dikirim dalam request
 */
trait TokenAuthTrait
{
    /**
     * Autentikasi pengguna berdasarkan token personal access
     *
     * @param Request $request
     * @return \App\Models\User|null
     */
    protected function authenticateByToken(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return null;
        }

        $personalAccessToken = PersonalAccessToken::where('token', hash('sha256', $token))
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->first();

        if (!$personalAccessToken) {
            return null;
        }

        // Update last_used_at
        $personalAccessToken->update(['last_used_at' => now()]);

        return $personalAccessToken->user;
    }
}
