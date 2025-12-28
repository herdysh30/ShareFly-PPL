<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
class AnimeController extends Controller
{
    public function index(){
        $animes = Http::get('https://api.jikan.moe/v4/top/anime')->json();
        
        return \Inertia\Inertia::render("anime/index", [
            "animes" => $animes
        ]);
    }
}
