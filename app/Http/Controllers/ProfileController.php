<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $posts = Post::where('userId', $request->user()->id)
            ->with(['users', 'comments.users'])
            ->withCount(['likes', 'comments'])
            ->latest()
            ->get();

        $savedPosts = $request->user()->savedPosts()
            ->with(['post.users', 'post.comments.users'])
            ->latest()
            ->get()
            ->pluck('post'); // Extract posts from saved posts relation

        $likedPosts = Post::whereHas('likes', function ($q) use ($request) {
            $q->where('userId', $request->user()->id)
                ->where('entity_type', 'post');
        })
            ->with(['users', 'comments.users'])
            ->withCount(['likes', 'comments'])
            ->latest()
            ->get();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'posts' => $posts,
            'savedPosts' => $savedPosts,
            'likedPosts' => $likedPosts,
        ]);
    }

    public function editBio(Request $request)
    {
        $validatedData = $request->validate([
            'bio' => ['required', 'string', 'min:1']
        ]);

        User::where('id', Auth::user()->id)
            ->update([
                'bio' => $validatedData['bio'],
            ]);
    }

    public function deleteBio()
    {
        User::where('id', Auth::user()->id)
            ->update([
                'bio' => null
            ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->connectedAccounts->each->delete();
        $user->delete();

        Session::invalidate();
        Session::regenerateToken();

        return Redirect::to('/');
    }
}
