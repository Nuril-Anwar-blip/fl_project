<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationArticle extends Model
{
    use HasFactory;

    protected $table = 'education_articles';

    protected $fillable = [
        'author_id',
        'title',
        'content',
        'image',
        'category',
        'tags',
        'is_published',
        'published_at'
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
