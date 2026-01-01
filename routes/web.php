<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\StoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'check.password'])
    ->group(
        function () {
            Route::controller(HomeController::class)
                ->group(
                    function () {
                        Route::get('/', 'index')->name('home');
                        Route::get('/user/{username}', 'showUserProfile')->name('user.profile');
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
            // Story routes
            Route::post('/stories', [StoryController::class, 'store'])->name('store.story');

            Route::middleware(['verified', 'admin'])
                ->group(
                    function () {
                        Route::controller(DashboardController::class)
                            ->group(
                                function () {
                                    // Dashboard home
                                    Route::get('dashboard', 'index')->name('dashboard');

                                    // Posts CRUD
                                    Route::get('dashboard/posts', 'posts')->name('dashboard.posts');
                                    Route::get('dashboard/posts/create', 'createPost')->name('dashboard.posts.create');
                                    Route::post('dashboard/posts', 'storePost')->name('dashboard.posts.store');
                                    Route::get('dashboard/posts/{post}', 'showPost')->name('dashboard.posts.show');
                                    Route::get('dashboard/posts/{post}/edit', 'editPost')->name('dashboard.posts.edit');
                                    Route::put('dashboard/posts/{post}', 'updatePost')->name('dashboard.posts.update');
                                    Route::delete('dashboard/posts/{post}', 'deletePost')->name('dashboard.posts.delete');

                                    // Users CRUD
                                    Route::get('dashboard/users', 'users')->name('dashboard.users');
                                    Route::get('dashboard/users/create', 'createUser')->name('dashboard.users.create');
                                    Route::post('dashboard/users', 'storeUser')->name('dashboard.users.store');
                                    Route::get('dashboard/users/{user}', 'showUser')->name('dashboard.users.show');
                                    Route::get('dashboard/users/{user}/edit', 'editUser')->name('dashboard.users.edit');
                                    Route::put('dashboard/users/{user}', 'updateUser')->name('dashboard.users.update');
                                    Route::delete('dashboard/users/{user}', 'deleteUser')->name('dashboard.users.delete');
                                }
                            );
                    }
                );

            Route::controller(LikeController::class)
                ->group(
                    function () {
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
