<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Like::factory(100)->create([
        //     'entityId' => fn() => Post::inRandomOrder()->first()->id,
        //     'entity_type' => 'post'
        // ]);

        // Like::factory(100)->create([
        //     'entityId' => fn() => Comment::inRandomOrder()->first()->id,
        //     'entity_type' => 'comment'
        // ]);
    }
}
