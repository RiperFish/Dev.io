<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function show()
    {
        $posts = Post::with('user','tags','bookmarks')->withCount('comments','likes')->latest()->get();
        //$posts->load('user');
     
        return Inertia::render('Front/Index.js', ['posts' => $posts]);
    }
}
