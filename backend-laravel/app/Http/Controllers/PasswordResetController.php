<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\PasswordReset;
use App\Notifications\PasswordResetNotification;
use Carbon\Carbon;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    // Request reset: generate token & kirim email (notif)
    public function requestReset(Request $request)
    {
        $data = $request->validate(['email' => 'required|email']);
        $user = User::where('email', $data['email'])->first();
        if (!$user) {
            return response()->json(['message' => 'Jika email terdaftar, instruksi reset akan dikirim.']);
        }

        $plain = Str::random(64);
        $hashed = hash('sha256', $plain);

        PasswordReset::create([
            'user_id' => $user->id,
            'email' => $user->email,
            'token' => $hashed,
            'created_at' => Carbon::now()
        ]);

        // Kirim email (jika konfigurasi mail tersedia)
        try {
            $user->notify(new PasswordResetNotification($plain));
        } catch (\Throwable $e) {
            // Jika mail belum konfigurasi (dev), kita tidak gagal total. Log saja.
        }

        return response()->json(['message' => 'Jika email terdaftar, instruksi reset akan dikirim.']);
    }

    // Reset password
    public function reset(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::where('email', $data['email'])->first();
        if (!$user) return response()->json(['message' => 'Email tidak ditemukan'], 400);

        $hashed = hash('sha256', $data['token']);
        $pr = PasswordReset::where('email', $data['email'])->where('token', $hashed)->first();
        if (!$pr) return response()->json(['message' => 'Token tidak valid atau sudah kadaluarsa'], 400);

        $created = Carbon::parse($pr->created_at);
        if (Carbon::now()->diffInMinutes($created) > 60) {
            $pr->delete();
            return response()->json(['message' => 'Token telah kadaluarsa'], 400);
        }

        $user->password = $data['password'];
        $user->save();

        PasswordReset::where('email', $data['email'])->delete();

        return response()->json(['message' => 'Password berhasil direset']);
    }
}
