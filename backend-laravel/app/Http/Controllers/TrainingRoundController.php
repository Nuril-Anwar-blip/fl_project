<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainingRound;
use App\Models\FederatedNode;
use App\Models\ActivityLog;
use App\Http\Controllers\Traits\TokenAuthTrait;
use Illuminate\Support\Facades\DB;

class TrainingRoundController extends Controller
{
    use TokenAuthTrait;

    public function index(Request $request)
    {
        $rounds = TrainingRound::orderBy('round_number', 'desc')->paginate(15);
        return response()->json($rounds);
    }

    public function store(Request $request)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $data = $request->validate([
            'round_number' => 'required|integer|min:1',
            'num_participants' => 'nullable|integer|min:0',
            'started_at' => 'nullable|date',
            'finished_at' => 'nullable|date|after_or_equal:started_at'
        ]);

        $data['started_at'] = $data['started_at'] ?? now();
        $round = TrainingRound::create($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'create_training_round',
            'description' => 'Inisialisasi training round #' . $round->round_number,
            'ip' => $request->ip()
        ]);

        return response()->json($round, 201);
    }

    public function show($id)
    {
        $round = TrainingRound::findOrFail($id);
        return response()->json($round);
    }

    public function update(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $round = TrainingRound::findOrFail($id);
        $data = $request->validate([
            'round_number' => 'sometimes|required|integer|min:1',
            'num_participants' => 'nullable|integer|min:0',
            'started_at' => 'nullable|date',
            'finished_at' => 'nullable|date|after_or_equal:started_at'
        ]);

        $round->update($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'update_training_round',
            'description' => 'Update training round #' . $round->round_number,
            'ip' => $request->ip()
        ]);

        return response()->json($round);
    }

    public function destroy(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $round = TrainingRound::findOrFail($id);
        $round->delete();

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'delete_training_round',
            'description' => 'Delete training round #' . $round->round_number,
            'ip' => $request->ip()
        ]);

        return response()->json(null, 204);
    }

    // Aggregate: hitung global accuracy dari federated_nodes aktif (rata-rata sederhana)
    public function aggregate(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $round = TrainingRound::findOrFail($id);

        $participants = FederatedNode::where('status', 'aktif')
            ->whereNotNull('local_accuracy')
            ->get();

        if ($participants->isEmpty()) {
            return response()->json(['message' => 'No participants with local_accuracy'], 400);
        }

        DB::beginTransaction();
        try {
            $num = $participants->count();
            $sum = $participants->sum('local_accuracy');
            $globalAccuracy = $sum / $num;
            $globalLoss = max(0, 1 - $globalAccuracy / 100);

            $round->update([
                'global_accuracy' => round($globalAccuracy, 4),
                'global_loss' => round($globalLoss, 4),
                'num_participants' => $num,
                'finished_at' => now()
            ]);

            foreach ($participants as $p) {
                $p->last_sync_at = now();
                $p->save();
            }

            ActivityLog::create([
                'user_id' => $user->id,
                'action' => 'aggregate_training_round',
                'description' => 'Aggregate round #' . $round->round_number . ' -> acc: ' . $round->global_accuracy,
                'ip' => $request->ip()
            ]);

            DB::commit();

            return response()->json(['round' => $round]);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Aggregation failed', 'error' => $e->getMessage()], 500);
        }
    }
}
