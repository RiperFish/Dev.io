<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Notifications\PostLiked;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        //dd(Post::find($request->id)->likes()->where('user_id', $request->user()->id)->get());
        //dd(Post::find($request->id)->likedBy($request->user()->id));
        $currentPost = Post::find($request->id);
        $userId = $request->user()->id;

        $res = $currentPost->likes()->toggle(auth()->id());
        dd($res);
        if ($res['attached']) {
            $currentPost->user->notify(new PostLiked($currentPost, auth()->user()));
        }
        /* if ($currentPost->likedBy($userId)) {
            //Like::where('user_id', $userId)->where('post_id', $request->id)->delete();
            $currentPost->likes()->detach(auth()->id());
        } else {
            // $res = Like::create([
            //     'user_id' => $userId,
            //     'post_id' => $request->id
            // ]);
            $currentPost->likes()->attach(auth()->id());
           
            // if ($res['attached']) {
            //     $currentPost->user->notify(new PostLiked($currentPost, auth()->user()));
            // }
        } */

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
