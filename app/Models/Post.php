<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id','title', 'body'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }
    public function likes()
    {
        //return $this->hasMany(Like::class);
        return $this->belongsToMany(User::class, 'likes')->withTimestamps();
    }
 
    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class)->with('user');
    }
    public function likedBy($id)
    {
        return $this->likes->contains('user_id', auth()->id());
    }
}
