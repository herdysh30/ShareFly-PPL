<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoryCreateRequest;
use App\Http\Requests\StoryUpdateRequest;
use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoryController extends Controller
{
    public function index(Request $request)
    {
        // Only get stories from the last 24 hours
        $story = Story::where('created_at', '>=', now()->subHours(24))->get();

        if (!$story || $story->isEmpty()) {
            return response()->json([
                "data" => [],
                "status_code" => 200
            ], 200);
        }

        return response()->json([
            "data" => $story,
            "status_code" => 200
        ], 200);
    }

    public function store(StoryCreateRequest $request)
    {
        $validated = $request->validated();
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('stories', 'public');
        }

        $story = Story::create([
            'caption' => $validated['caption'],
            'image' => $imagePath ? '/storage/' . $imagePath : null,
            'userId' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Story created successfully',
            'story' => $story
        ], 201);
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
