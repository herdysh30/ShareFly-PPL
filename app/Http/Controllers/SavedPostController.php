<?php

namespace App\Http\Controllers;

use App\Models\SavedPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavedPostController extends Controller
{
    public function toggle($postId)
    {
        $userId = Auth::id();

        $savedPost = SavedPost::where('userId', $userId)
            ->where('postId', $postId)
            ->first();

        if ($savedPost) {
            $savedPost->delete();
            return back()->with('message', 'Post unsaved');
        }

        SavedPost::create([
            'userId' => $userId,
            'postId' => $postId,
        ]);

        return back()->with('message', 'Post saved');
    }

    public function index()
    {
        $savedPosts = SavedPost::where('userId', Auth::id())
            ->with('post.users')
            ->latest()
            ->get()
            ->pluck('post');

        return response()->json($savedPosts);
    }
}
