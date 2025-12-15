<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HealthRecord;
use App\Models\PatientProfile;
use App\Models\ActivityLog;
use App\Http\Controllers\Traits\TokenAuthTrait;
use Illuminate\Support\Facades\Storage;

class HealthRecordController extends Controller
{
    use TokenAuthTrait;

    public function index(Request $request)
    {
        $q = HealthRecord::with('patient');
        if ($request->patient_id) $q->where('patient_id', $request->patient_id);
        $records = $q->orderBy('tanggal_pencatatan', 'desc')->paginate(15);
        return response()->json($records);
    }

    public function store(Request $request)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $data = $request->validate([
            'patient_id' => 'required|exists:patient_profiles,id',
            'tanggal_pencatatan' => 'required|date',
            'kadar_gula_darah' => 'nullable|numeric',
            'tekanan_darah_sistolik' => 'nullable|integer',
            'tekanan_darah_diastolik' => 'nullable|integer',
            'bmi' => 'nullable|numeric',
            'aktivitas_fisik' => 'nullable|in:rendah,sedang,tinggi',
            'catatan_tambahan' => 'nullable|string',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf'
        ]);

        // support file upload jika ada
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('health_records', 'public');
            $data['catatan_tambahan'] = ($data['catatan_tambahan'] ?? '') . "\n(attachment: $path)";
        }

        $record = HealthRecord::create($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'create_health_record',
            'description' => 'Menambahkan health record pasien_id: ' . $record->patient_id,
            'ip' => $request->ip()
        ]);

        return response()->json($record, 201);
    }

    public function show($id)
    {
        $record = HealthRecord::with('patient', 'prediction')->findOrFail($id);
        return response()->json($record);
    }

    public function update(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $record = HealthRecord::findOrFail($id);

        $data = $request->validate([
            'tanggal_pencatatan' => 'sometimes|date',
            'kadar_gula_darah' => 'nullable|numeric',
            'tekanan_darah_sistolik' => 'nullable|integer',
            'tekanan_darah_diastolik' => 'nullable|integer',
            'bmi' => 'nullable|numeric',
            'aktivitas_fisik' => 'nullable|in:rendah,sedang,tinggi',
            'catatan_tambahan' => 'nullable|string',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf'
        ]);

        if ($request->hasFile('file')) {
            // optionally delete existing file: but we stored path in catatan, so skip for now
            $path = $request->file('file')->store('health_records', 'public');
            $data['catatan_tambahan'] = ($data['catatan_tambahan'] ?? '') . "\n(attachment: $path)";
        }

        $record->update($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'update_health_record',
            'description' => 'Update health record id: ' . $record->id,
            'ip' => $request->ip()
        ]);

        return response()->json($record);
    }

    public function destroy(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $record = HealthRecord::findOrFail($id);
        $record->delete();

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'delete_health_record',
            'description' => 'Hapus health record id: ' . $record->id,
            'ip' => $request->ip()
        ]);

        return response()->json(null, 204);
    }
}
