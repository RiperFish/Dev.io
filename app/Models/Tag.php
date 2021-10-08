<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description'
    ];

    public function posts()
    {
        return $this->belongsToMany(Post::class)
        ->with('user', 'tags', 'bookmarks', 'likes')
        ->withCount('comments', 'likes', 'bookmarks');
    }

     
    public function users()
    {
        return $this->belongsToMany(User::class);
    }


}
