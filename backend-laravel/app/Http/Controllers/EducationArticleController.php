<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EducationArticle;
use App\Models\ActivityLog;
use App\Http\Controllers\Traits\TokenAuthTrait;
use Illuminate\Support\Facades\Storage;

class EducationArticleController extends Controller
{
    use TokenAuthTrait;

    public function index()
    {
        $articles = EducationArticle::with('author')->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $user = $this->authenticateByToken($request);
        if (!$user || !in_array($user->role, ['admin', 'doctor'])) return response()->json(['message' => 'Unauthorized'], 401);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
            $data['image'] = $path;
        }

        $data['author_id'] = $user->id;
        $article = EducationArticle::create($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'create_article',
            'description' => 'Buat artikel: ' . $article->title,
            'ip' => $request->ip()
        ]);

        return response()->json($article, 201);
    }

    public function show($id)
    {
        $article = EducationArticle::with('author')->findOrFail($id);
        return response()->json($article);
    }

    public function update(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user || !in_array($user->role, ['admin', 'doctor'])) return response()->json(['message' => 'Unauthorized'], 401);

        $article = EducationArticle::findOrFail($id);
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpg,jpeg,png'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
            $data['image'] = $path;
        }

        $article->update($data);

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'update_article',
            'description' => 'Update artikel: ' . $article->title,
            'ip' => $request->ip()
        ]);

        return response()->json($article);
    }

    public function destroy(Request $request, $id)
    {
        $user = $this->authenticateByToken($request);
        if (!$user || !in_array($user->role, ['admin', 'doctor'])) return response()->json(['message' => 'Unauthorized'], 401);

        $article = EducationArticle::findOrFail($id);
        $article->delete();

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'delete_article',
            'description' => 'Hapus artikel: ' . $article->title,
            'ip' => $request->ip()
        ]);

        return response()->json(null, 204);
    }
}
