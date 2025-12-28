<?php

use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\StoryController;
use Illuminate\Support\Facades\Route;

Route::controller(PostController::class)
    ->group(
        function () {
            Route::get("posts", "index")->name('get.posts');
        }
    );

Route::controller(StoryController::class)
    ->group(
        function () {
            Route::get('stories', 'index')->name('get.stories');
        }
    );

Route::controller(LikeController::class)
    ->group(
        function () {
            Route::get('/likes', 'index')->name('get.likes');
        }
    );
