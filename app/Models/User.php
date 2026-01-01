<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use JoelButcher\Socialstream\HasConnectedAccounts;

class User extends Authenticatable
{
    use HasFactory;
    use HasConnectedAccounts;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'], $with = ['role'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get profile picture with fallback to generated avatar
     */
    public function getProfilePictureAttribute($value): string
    {
        if ($value) {
            return str_starts_with($value, 'http') ? $value : '/storage/' . $value;
        }

        // Generate fallback avatar with user initials
        $name = $this->username ?? $this->firstname ?? 'User';
        return "https://ui-avatars.com/api/?name=" . urlencode($name) . "&background=random&color=fff&bold=true";
    }

    /**
     * Update the user's profile photo.
     *
     * @param  \Illuminate\Http\UploadedFile  $photo
     * @return void
     */
    public function updateProfilePicture($photo)
    {
        tap($this->profile_picture, function ($previous) use ($photo) {
            $this->forceFill([
                'profile_picture' => $photo->storePublicly(
                    'images/users',
                    ['disk' => 'public']
                ),
            ])->save();

            if ($previous && !str_starts_with($previous, 'http')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($previous);
            }
        });
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'roleId');
    }

    public function post()
    {
        return $this->hasMany(Post::class, 'userId');
    }

    public function story()
    {
        return $this->hasMany(Story::class, 'userId');
    }

    public function savedPosts()
    {
        return $this->hasMany(SavedPost::class, 'userId');
    }
}
