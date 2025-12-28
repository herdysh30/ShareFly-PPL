<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    /** @use HasFactory<\Database\Factories\LikeFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    protected $with = ['users'];

    public function users()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function entity()
    {
        return $this->morphTo(null, 'entity_type', 'entityId');
    }
}
