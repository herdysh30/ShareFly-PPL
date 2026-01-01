<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\Story;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;


class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stats = [
            'totalUsers' => User::count(),
            'totalPosts' => Post::count(),
            'totalLikes' => Like::count(),
            'totalComments' => Comment::count(),
            'totalStories' => Story::count(),
        ];

        // Posts per day (last 7 days) for Area Chart
        $postsPerDay = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $postsPerDay[] = [
                'date' => $date->format('M d'),
                'posts' => Post::whereDate('created_at', $date->toDateString())->count(),
                'likes' => Like::whereDate('created_at', $date->toDateString())->count(),
            ];
        }

        // Top 5 users with most posts for Bar Chart
        $topUsers = User::withCount('post')
            ->orderBy('post_count', 'desc')
            ->take(5)
            ->get()
            ->map(fn($user) => [
                'name' => $user->username,
                'posts' => $user->post_count,
            ]);

        // Role distribution for Pie Chart
        $roleDistribution = User::selectRaw('roleId, count(*) as total')
            ->groupBy('roleId')
            ->with('role')
            ->get()
            ->map(fn($item) => [
                'role' => $item->role->name ?? 'Unknown',
                'value' => $item->total,
            ]);

        return \Inertia\Inertia::render('auth/dashboard/index', [
            'stats' => $stats,
            'postsPerDay' => $postsPerDay,
            'topUsers' => $topUsers,
            'roleDistribution' => $roleDistribution,
        ]);
    }

    public function posts()
    {
        $posts = Post::orderBy('created_at', 'desc')->paginate(10);
        return \Inertia\Inertia::render('auth/dashboard/posts/index', [
            'posts' => $posts
        ]);
    }

    public function users()
    {
        $users = User::orderBy('created_at', 'desc')->paginate(10);
        return \Inertia\Inertia::render('auth/dashboard/users/index', [
            'users' => $users
        ]);
    }

    // ==================== POST CRUD ====================

    /**
     * Show the form for creating a new post.
     */
    public function createPost()
    {
        return \Inertia\Inertia::render('auth/dashboard/posts/create');
    }

    /**
     * Store a newly created post in storage.
     */
    public function storePost(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|min:1',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = $request->file('image')->store('posts', 'public');

        Post::create([
            'userId' => Auth::id(),
            'description' => $validated['description'],
            'image' => $imagePath,
        ]);

        return redirect()->route('dashboard.posts')->with('success', 'Post created successfully');
    }

    /**
     * Display the specified post.
     */
    public function showPost(Post $post)
    {
        return \Inertia\Inertia::render('auth/dashboard/posts/show', [
            'post' => $post->load('users', 'comments', 'likes')
        ]);
    }

    /**
     * Show the form for editing the specified post.
     */
    public function editPost(Post $post)
    {
        return \Inertia\Inertia::render('auth/dashboard/posts/edit', [
            'post' => $post
        ]);
    }

    /**
     * Update the specified post in storage.
     */
    public function updatePost(Request $request, Post $post)
    {
        $validated = $request->validate([
            'description' => 'required|string|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = ['description' => $validated['description']];

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
            $data['image'] = $imagePath;
        }

        $post->update($data);

        return redirect()->route('dashboard.posts')->with('success', 'Post updated successfully');
    }

    /**
     * Remove the specified post from storage.
     */
    public function deletePost(string $id)
    {
        Post::destroy($id);

        return redirect()->route('dashboard.posts')->with('success', 'Delete Post Success');
    }

    // ==================== USER CRUD ====================

    /**
     * Show the form for creating a new user.
     */
    public function createUser()
    {
        return \Inertia\Inertia::render('auth/dashboard/users/create');
    }

    /**
     * Store a newly created user in storage.
     */
    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'roleId' => 'required|exists:roles,id',
        ]);

        User::create([
            'firstname' => $validated['firstname'],
            'lastname' => $validated['lastname'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'roleId' => $validated['roleId'],
        ]);

        return redirect()->route('dashboard.users')->with('success', 'User created successfully');
    }

    /**
     * Display the specified user.
     */
    public function showUser(User $user)
    {
        return \Inertia\Inertia::render('auth/dashboard/users/show', [
            'user' => $user->load('role', 'post')
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function editUser(User $user)
    {
        return \Inertia\Inertia::render('auth/dashboard/users/edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'roleId' => 'required|exists:roles,id',
        ]);

        $data = [
            'firstname' => $validated['firstname'],
            'lastname' => $validated['lastname'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'roleId' => $validated['roleId'],
        ];

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $user->update($data);

        return redirect()->route('dashboard.users')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified user from storage.
     */
    public function deleteUser(string $id)
    {
        User::destroy($id);

        return redirect()->route('dashboard.users')->with('success', 'Delete User Success');
    }
}
