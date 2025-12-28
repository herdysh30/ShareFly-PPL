<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'check.password'])
    ->group(
        function () {
            Route::controller(HomeController::class)
                ->group(
                    function () {
                        Route::get('/', 'index')->name('home');
                    }
                );

            Route::controller(PostController::class)
                ->group(
                    function () {
                        Route::post('/', 'store')->name('create.post');
                    }
                );

            Route::controller(AnimeController::class)
                ->group(
                    function () {
                        Route::get('/anime', 'index')->name('anime');
                    }
                );

            Route::controller(BookController::class)
                ->group(
                    function () {
                        Route::get('book', 'index')->name('book');
                    }
                );
        }
    );

Route::middleware('auth')
    ->group(
        function () {
            Route::middleware(['verified', 'admin'])
                ->group(
                    function () {
                        Route::controller(DashboardController::class)
                            ->group(
                                function () {
                                    Route::get('dashboard', 'index')->name('dashboard');
                                    Route::get('dashboard/posts', 'posts')->name('dashboard.posts');
                                    Route::post('dashboard/post/{id}', 'deletePost')->name('dashboard.delete.post');
                                    Route::get('dashboard/users', 'users')->name('dashboard.users');
                                    Route::post('dashboard/user/{id}', 'deleteUser')->name('dashboard.delete.user');
                                }
                            );
                    }
                );
            
            Route::controller(LikeController::class)
                ->group(
                    function(){
                        Route::post('like/{post}', 'likePost')->name('like.post');
                        Route::post('like/{comment}', 'likeComment')->name('like.comment');
                    }
                );
        }
    );

Route::get('/pdfs/{filename}', 'PdfReportPost@show')->middleware('auth');

Route::get("/Profile", function () {
    return Inertia\Inertia::render("Profile/Profile");
})->name('profile');

Route::get("/DetailProfile", function () {
    return Inertia\Inertia::render("profile/DetailProfile");
});

require __DIR__ . '/auth.php';
require __DIR__ . '/socialstream.php';
