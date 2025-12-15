<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PersonalAccessToken;
use App\Models\User;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Http\Controllers\Traits\TokenAuthTrait;

class PersonalAccessTokenController extends Controller
{
    use TokenAuthTrait;

    // List tokens milik user
    public function index(Request $request)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $tokens = $user->personalAccessTokens()->orderBy('created_at', 'desc')->get();
        return response()->json(['tokens' => $tokens]);
    }

    // Buat token baru
    public function store(Request $request)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $data = $request->validate([
            'nama_token' => 'nullable|string|max:191',
            'abilities' => 'nullable|array',
            'expires_at' => 'nullable|date'
        ]);

        $plain = bin2hex(random_bytes(32));
        $hashed = hash('sha256', $plain);

        $token = PersonalAccessToken::create([
            'user_id' => $user->id,
            'nama_token' => $data['nama_token'] ?? 'token-' . Str::random(6),
            'token' => $hashed,
            'abilities' => isset($data['abilities']) ? json_encode($data['abilities']) : json_encode(['*']),
            'last_used_at' => Carbon::now(),
            'expires_at' => isset($data['expires_at']) ? Carbon::parse($data['expires_at']) : null,
        ]);

        return response()->json([
            'token_id' => $token->id,
            'token' => $plain
        ], 201);
    }

    // Revoke token milik user
    public function revoke(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $token = PersonalAccessToken::where('id', $id)->where('user_id', $user->id)->first();
        if (!$token) return response()->json(['message' => 'Token tidak ditemukan'], 404);
        $token->delete();
        return response()->json(['message' => 'Token dicabut']);
    }
}
