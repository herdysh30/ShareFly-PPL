<?php

namespace App\Http\Controllers;

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
}
