<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\PersonalAccessToken;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthController extends Controller
{
    // Register user baru
    public function register(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'nullable|in:admin,doctor,patient'
        ]);

        $user = User::create([
            'nama' => $data['nama'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $data['role'] ?? 'patient'
        ]);

        return response()->json(['user' => $user], 201);
    }

    // Login: membuat personal access token manual (plain dikembalikan sekali)
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'device_name' => 'nullable|string'
        ]);

        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Email atau password salah'], 422);
        }

        $plain = bin2hex(random_bytes(32));
        $hashed = hash('sha256', $plain);

        $token = PersonalAccessToken::create([
            'user_id' => $user->id,
            'nama_token' => $data['device_name'] ?? 'device-' . Str::random(6),
            'token' => $hashed,
            'abilities' => json_encode(['*']),
            'last_used_at' => Carbon::now(),
            'expires_at' => null,
        ]);

        return response()->json([
            'user' => $user,
            'token' => $plain,
            'token_id' => $token->id
        ]);
    }

    // Logout: gunakan bearer token plain untuk revoke
    public function logout(Request $request)
    {
        $authHeader = $request->header('Authorization');
        if (!$authHeader) return response()->json(['message' => 'Authorization header missing'], 400);
        $parts = explode(' ', $authHeader);
        if (count($parts) !== 2) return response()->json(['message' => 'Invalid Authorization format'], 400);
        $plain = $parts[1];
        $hashed = hash('sha256', $plain);

        $pat = PersonalAccessToken::where('token', $hashed)->first();
        if ($pat) $pat->delete();

        return response()->json(['message' => 'Logout berhasil']);
    }

    // Profile: mengambil user berdasarkan bearer token
    public function profile(Request $request)
    {
        $authHeader = $request->header('Authorization');
        if (!$authHeader) return response()->json(['message' => 'Unauthorized'], 401);
        $parts = explode(' ', $authHeader);
        if (count($parts) !== 2) return response()->json(['message' => 'Unauthorized'], 401);
        $plain = $parts[1];
        $hashed = hash('sha256', $plain);
        $pat = PersonalAccessToken::where('token', $hashed)->first();
        if (!$pat) return response()->json(['message' => 'Unauthorized'], 401);
        $user = $pat->user;
        return response()->json(['user' => $user]);
    }
}
