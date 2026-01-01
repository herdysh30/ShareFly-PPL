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
        $user = $request->user();
        $validatedData = $request->validated();

        // Handle Profile Picture
        if ($request->hasFile('profile_picture')) {
            $user->updateProfilePicture($request->file('profile_picture'));
        }

        // Handle Profile Background
        if ($request->hasFile('profile_background')) {
            // Delete old background if exists except if it's default
            if ($user->profile_background && !str_starts_with($user->profile_background, 'http')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($user->profile_background);
            }

            $path = $request->file('profile_background')->store('images/users', 'public');
            $user->profile_background = $path; // Store relative path
        }

        $user->fill([
            'firstname' => $validatedData['firstname'] ?? $user->firstname,
            'lastname' => $validatedData['lastname'] ?? $user->lastname,
            'username' => $validatedData['username'],
            'bio' => $validatedData['bio'] ?? null,
            'no_telepon' => $validatedData['no_telepon'] ?? null,
        ]);

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
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
