<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoryUpdateRequest;
use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoryController extends Controller
{
    public function index(Request $request)
    {
        $story = Story::all();

        if (!$story) {
            return response()->json([
                "error" => [
                    "message" => "Data All User in Database Not Found !",
                    "status_code" => 404
                ]
            ], 404);
        }

        return response()->json([
            "data" => $story,
            "status_code" => 200
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validated();

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
        }

        $post = Story::create([
            'caption' => $request->caption,
            'image' => $imageName,
            'user_id' => Auth::user()->id,
        ]);

        return response()->json(['message' => 'Post created successfully'], 201);
    }
    public function show(Request $request)
    {
        $story = Story::findOrFail($request->id);

        if (!$story) {
            return response([
                "error" => [
                    "message" => "Data User by Id in Database Not Found!",
                    "status_code" => 404
                ]
            ], 404);
        }

        return response()->json([
            'data' => $story,
            'status_code' => 200
        ], 200);
    }

    public function update(StoryUpdateRequest $request, Story $story)
    {
        $data = $story->findOrFail($request->id);
        $data->update($request->validated());

        return response()->json([
            "data" => $data,
            "status_code" => 201
        ], 201);
    }

    public function destroy(Story $story)
    {
        $story->findOrFail(request()->id)->delete();

        return response()->noContent();
    }
}
