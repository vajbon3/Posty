<?php

namespace App\Http\Controllers;

use App\Mail\PostLiked;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PostLikeController extends Controller
{
    public function store(Post $post, Request $request)
    {
        if(!$post->likedBy($request->user()))
            $post->likes()->create([
            "user_id" => $request->user()->id
            ]);

        Mail::to($post->user)->send(new PostLiked(auth()->user(), $post));

        return response()->json("ok");
    }

    public function destroy(Post $post, Request $request)
    {
        if($post->likedBy($request->user()))
            $post->likes()->
            where("user_id",$request->user()->id)->
            delete();

        return response()->json("ok");
    }
}
