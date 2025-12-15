<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PatientProfile;
use App\Models\User;
use App\Models\ActivityLog;
use App\Http\Controllers\Traits\TokenAuthTrait;

class PatientProfileController extends Controller
{
    use TokenAuthTrait;

    public function index(Request $request)
    {
        $this->authorizeList($request);
        $profiles = PatientProfile::with('user')->paginate(15);
        return response()->json($profiles);
    }

    public function store(Request $request)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $data = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'no_rekam_medis' => 'required|string|unique:patient_profiles,no_rekam_medis',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|in:laki-laki,perempuan',
            'berat_badan' => 'nullable|numeric',
            'tinggi_badan' => 'nullable|numeric',
            'riwayat_keluarga_diabetes' => 'nullable|boolean'
        ]);

        $profile = PatientProfile::create($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'create_patient_profile',
            'description' => 'Membuat profile pasien: ' . $profile->no_rekam_medis,
            'ip' => $request->ip()
        ]);

        return response()->json($profile, 201);
    }

    public function show($id)
    {
        $profile = PatientProfile::with('healthRecords', 'predictions', 'federatedNodes')->findOrFail($id);
        return response()->json($profile);
    }

    public function update(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $profile = PatientProfile::findOrFail($id);

        $data = $request->validate([
            'no_rekam_medis' => 'sometimes|required|string|unique:patient_profiles,no_rekam_medis,' . $profile->id,
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|in:laki-laki,perempuan',
            'berat_badan' => 'nullable|numeric',
            'tinggi_badan' => 'nullable|numeric',
            'riwayat_keluarga_diabetes' => 'nullable|boolean'
        ]);

        $profile->update($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'update_patient_profile',
            'description' => 'Update profile pasien: ' . $profile->no_rekam_medis,
            'ip' => $request->ip()
        ]);

        return response()->json($profile);
    }

    public function destroy(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $profile = PatientProfile::findOrFail($id);
        $profile->delete();

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'delete_patient_profile',
            'description' => 'Hapus profile pasien: ' . $profile->no_rekam_medis,
            'ip' => $request->ip()
        ]);

        return response()->json(null, 204);
    }

    // helper: only users with role doctor/admin can list (simple example)
    protected function authorizeList(Request $request)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) abort(401);
        if (!in_array($user->role, ['admin', 'doctor'])) abort(403);
    }
}
