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
            ->with(['post', 'role'])
            ->firstOrFail();

        return \Inertia\Inertia::render('UserProfile', [
            'user' => $user,
            'posts' => $user->post,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'hasHome' => Route::has('home'),
        ]);
    }
}
