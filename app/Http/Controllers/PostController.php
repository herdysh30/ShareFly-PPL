<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $post = Post::orderBy("created_at","desc")->paginate(10);

        if (!$post) {
            return response()->json([
                "error" => [
                    "message" => "Data All User in Database Not Found !",
                    "status_code" => 404
                ]
            ], 404);
        }


        return response()->json($post, 200);
    }

    public function store(PostCreateRequest $request)
    {
        // dd($request);
        $validatedData = $request->validated();

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $validatedData['image'] = $request->file('image')->store('post-images', 'public');
        }

        Post::create([
            'image' => $validatedData['image'],
            'description' => $validatedData['description'],
            'userId' => Auth::id(),
        ]);

        return redirect()->intended(route('home'))->with(['message' => 'Post created successfully'], 201);
    }

    public function show(Request $request)
    {
        $post = Post::findOrFail($request->id);

        if (!$post) {
            return response([
                "error" => [
                    "message" => "Data User by Id in Database Not Found!",
                    "status_code" => 404
                ]
            ], 404);
        }

        return response()->json([
            'data' => $post,
            'status_code' => 200
        ], 200);
    }


    public function update(PostUpdateRequest $request, Post $post)
    {
        $data = $post->findOrFail($request->id);
        $data->update($request->validated());

        return response()->json([
            "data" => $data,
            "status_code" => 201
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->findOrFail(request()->id)->delete();

        return response()->noContent();
    }
}
