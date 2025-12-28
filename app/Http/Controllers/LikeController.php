<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function index()
    {
        $likes = Like::orderBy('id', 'desc')->paginate(10);

        if (!$likes) {
            return response()->json([
                "error" => [
                    "message" => "Data All Like in Database Not Found !",
                    "status_code" => 404
                ]
            ], 404);
        }

        return response()->json($likes, 200);
    }

    public function likePost(Post $post)
    {
        $existingLike = Like::where('userId', Auth::id())
            ->where('entityId', $post->id)
            ->where('entity_type', 'post')
            ->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            Like::create([
                "userId" => Auth::id(),
                'entityId' => $post->id,
                'entity_type' => 'post'
            ]);
        }

        return redirect()->intended(route('home'));
    }

    public function likeComment(Comment $comment)
    {
        $existingLike = Like::where('userId', Auth::id())
            ->where('entityId', $comment->id)
            ->where('entity_type', 'comment')
            ->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            Like::create([
                "userId" => Auth::id(),
                'entityId' => $comment->id,
                'entity_type' => 'comment'
            ]);
        }

        return redirect()->intended(route('home'));
    }
}
