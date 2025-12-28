<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
class BookController extends Controller
{
    public function index(){
        $buku = Http::get('https://developers.google.com/books');
        response()->json([
            "data" => $buku,
            "status_code" => 200
          ], 200);

          return \Inertia\Inertia::render('Book/index');
    }
}
