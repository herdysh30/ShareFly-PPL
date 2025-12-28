<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class DetailProfilController extends Controller
{
    /**
     * Display the user profile.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        // Fetch the user by ID
        $user = User::findOrFail($id);

        // Return the view with user data
        return view('profile.detail', compact('user'));
    }

    /**
     * Show the form for editing the user profile.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function edit($id)
    {
        // Fetch the user by ID
        $user = User::findOrFail($id);

        // Return the edit form view
        return view('profile.edit', compact('user'));
    }

    /**
     * Update the user profile in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'full_name' => 'required|string|max:255',
            'nick_name' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:10',
            'country' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:50',
            'timezone' => 'nullable|string|max:50',
            'email' => 'required|email|max:255',
        ]);

        // Fetch the user by ID
        $user = User::findOrFail($id);

        // Update the user data
        $user->update($validatedData);

        // Redirect back with a success message
        return redirect()->route('profile.show', $id)
                         ->with('success', 'Profile updated successfully.');
    }
}
