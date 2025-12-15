<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActivityLog;
use App\Http\Controllers\Traits\TokenAuthTrait;

class ActivityLogController extends Controller
{
    use TokenAuthTrait;

    public function index(Request $request)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        // hanya admin bisa melihat semua logs
        if ($user->role !== 'admin') return response()->json(['message' => 'Forbidden'], 403);

        $logs = ActivityLog::with('user')->orderBy('created_at', 'desc')->paginate(50);
        return response()->json($logs);
    }
}
