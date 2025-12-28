<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PdfController extends Controller
{
    public function show($filename)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
        $path = storage_path('app/private/pdfs/' . $filename);
        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found.'], Response::HTTP_NOT_FOUND);
        }
        // Implement additional security checks here as needed
        return response()->file($path);
    }
}
