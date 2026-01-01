<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, $postId)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:1000',
        ]);

        Comment::create([
            'description' => $validated['description'],
            'postId' => $postId,
            'userId' => Auth::id(),
        ]);

        return back();
    }
}
