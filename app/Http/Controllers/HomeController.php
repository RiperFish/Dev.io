<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function show()
    {
        $myTagsPosts = null;
        $myTags = array();
        if (Auth::check()) {
            //$myTags = User::where('id', auth()->id())->with('tags')->get()->pluck('id');
            $myTags = Auth::user()->tags->pluck('id')->toArray();
        
            $posts = Post::whereHas('tags', function ($query) use ($myTags) {
                $query->whereIn('tags.id', $myTags);
            })->with('user', 'tags', 'bookmarks', 'likes')
                ->withCount('comments', 'likes', 'bookmarks')
                ->latest()
                ->get();
            //dd($posts);

            /*   $posts = Post::with('user', 'tags', 'bookmarks', 'likes')
                ->withCount('comments', 'likes', 'bookmarks')
                ->latest()
                ->get(); */
            return Inertia::render('Front/Index.js', ['posts' => $posts]);
        } else {
            $posts = Post::with('user', 'tags')->withCount('comments', 'likes', 'bookmarks')->latest()->get();
            return Inertia::render('Front/Index.js', ['posts' => $posts]);
        }
        //$posts->load('user');


    }
}
