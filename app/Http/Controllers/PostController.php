<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Post;
use Inertia\Inertia;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreatePostRequest;
use Illuminate\Support\Facades\Redirect;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();
        return Inertia::render('Projects', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $tags = Tag::all();
        return Inertia::render('Front/Post/CreatePost', ['tags' => $tags]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request/* CreatePostRequest $request */)
    {
        /* dd($request); */
        $post = Post::create(['title' => $request->PostContent['title'], 'body' => $request->body, 'user_id' => auth()->id()]);
        $post->tags()->attach($request->PostContent['tags']);
        return Redirect::route('home');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $comments = Comment::with('user')->where('post_id', $post->id)->latest()->get();
        $post->load('user')->load('tags')->load('likes'); //->load('comments')
        return Inertia::render('Front/Post/Show', ['post' => $post, 'comments' => $comments]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        $allTags = Tag::all();
        $post->load('tags');
        return Inertia::render('Front/Post/EditPost', ['post' => $post, 'allTags' => $allTags]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $post->update(['title' => $request->PostContent['title'], 'body' => $request->body]);
        $post->tags()->sync($request->PostContent['tags']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        if (Auth::check() && auth()->id() === $post->user_id) {
            $x = Post::find($post->id);
            $x->delete();
            return redirect()->back();
        } else {
            abort(403, 'Unauthorized action.');
        }
    }
}
