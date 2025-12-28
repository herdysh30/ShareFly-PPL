<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    protected $with = ['users', 'comments'];

    protected $withCount = ['likes', 'comments'];

    public function users()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'postId');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'entityId');
    }
}
