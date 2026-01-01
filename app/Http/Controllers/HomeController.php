<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'hasHome' => Route::has('home'),
        ]);
    }

    public function showUserProfile($username)
    {
        $user = User::where('username', $username)
            ->with('role')
            ->firstOrFail();

        $posts = \App\Models\Post::where('userId', $user->id)
            ->with(['users', 'comments.users'])
            ->withCount(['likes', 'comments'])
            ->latest()
            ->get();

        return \Inertia\Inertia::render('UserProfile', [
            'user' => $user,
            'posts' => $posts,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'hasHome' => Route::has('home'),
        ]);
    }
}
