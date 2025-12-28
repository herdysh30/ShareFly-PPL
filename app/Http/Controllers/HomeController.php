<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Story;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index()
    {
        $stories = Story::orderBy('created_at','desc')->with('users')->paginate(10);
        
        return \Inertia\Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'hasHome' => Route::has('home'),
        ]);
    }
}
