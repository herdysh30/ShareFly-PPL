<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    protected $with = ['users'];

    public function users()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function posts()
    {
        return $this->belongsTo(Post::class, 'postId');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'entityId');
    }
}
