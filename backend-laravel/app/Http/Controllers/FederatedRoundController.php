<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FederatedNode;
use App\Models\ActivityLog;
use App\Http\Controllers\Traits\TokenAuthTrait;

class FederatedRoundController extends Controller
{
    use TokenAuthTrait;

    public function index(Request $request)
    {
        $q = FederatedNode::with('patient');
        if ($request->patient_id) $q->where('patient_id', $request->patient_id);
        $nodes = $q->paginate(15);
        return response()->json($nodes);
    }

    public function store(Request $request)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $data = $request->validate([
            'device_id' => 'required|string|unique:federated_nodes,device_id',
            'patient_id' => 'nullable|exists:patient_profiles,id',
            'status' => 'nullable|in:aktif,nonaktif',
            'last_sync_at' => 'nullable|date',
            'local_accuracy' => 'nullable|numeric'
        ]);

        $node = FederatedNode::create($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'create_federated_node',
            'description' => 'Tambah federated node device_id: ' . $node->device_id,
            'ip' => $request->ip()
        ]);

        return response()->json($node, 201);
    }

    public function show($id)
    {
        $node = FederatedNode::with('patient')->findOrFail($id);
        return response()->json($node);
    }

    public function update(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $node = FederatedNode::findOrFail($id);
        $data = $request->validate([
            'device_id' => 'sometimes|required|string|unique:federated_rounds,device_id,' . $node->id,
            'patient_id' => 'nullable|exists:patient_profiles,id',
            'status' => 'nullable|in:aktif,nonaktif',
            'last_sync_at' => 'nullable|date',
            'local_accuracy' => 'nullable|numeric'
        ]);

        $node->update($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'update_federated_node',
            'description' => 'Update federated node id: ' . $node->id,
            'ip' => $request->ip()
        ]);

        return response()->json($node);
    }

    public function destroy(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user) return response()->json(['message' => 'Unauthenticated'], 401);

        $node = FederatedNode::findOrFail($id);
        $node->delete();

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'delete_federated_node',
            'description' => 'Delete federated node id: ' . $id,
            'ip' => $request->ip()
        ]);

        return response()->json(null, 204);
    }
}
