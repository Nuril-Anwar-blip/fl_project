<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prediction;
use App\Models\PatientProfile;
use App\Models\HealthRecord;
use App\Models\ActivityLog;
use App\Http\Controllers\Traits\TokenAuthTrait;
use Carbon\Carbon;

class PredictionController extends Controller
{
    use TokenAuthTrait;

    public function index(Request $request)
    {
        $q = Prediction::with('patient', 'healthRecord')->orderBy('predicted_at', 'desc');
        if ($request->patient_id) $q->where('patient_id', $request->patient_id);
        $preds = $q->paginate(15);
        return response()->json($preds);
    }

    public function store(Request $request)
    {
        // Simulasi pembuatan prediction (Anda tidak meminta ML)
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $data = $request->validate([
            'patient_id' => 'required|exists:patient_profiles,id',
            'health_record_id' => 'required|exists:health_records,id',
            'risk_score' => 'required|numeric',
            'risk_level' => 'required|in:rendah,sedang,tinggi',
            'model_version' => 'nullable|string'
        ]);

        $data['predicted_at'] = Carbon::now();

        $pred = Prediction::create($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'create_prediction',
            'description' => 'Create prediction for patient_id ' . $pred->patient_id,
            'ip' => $request->ip()
        ]);

        return response()->json($pred, 201);
    }

    public function show($id)
    {
        $pred = Prediction::with('patient', 'healthRecord')->findOrFail($id);
        return response()->json($pred);
    }

    public function destroy(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $pred = Prediction::findOrFail($id);
        $pred->delete();

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'delete_prediction',
            'description' => 'Delete prediction id ' . $id,
            'ip' => $request->ip()
        ]);

        return response()->json(null, 204);
    }
}
