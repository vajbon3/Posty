<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware("guest");
    }

    public function index() {
        return view("auth.login");
    }

    public function store(Request $request) {
        $this->validate($request,[
            "email" => "required|email|max:255",
            "password" => "required",
        ]);

        if(!auth()->attempt($request->only("email", "password"),$request->remember)) {
            return back()->with("status", "Invalid login credentials")->withInput();
        }

        return redirect()->route("dashboard");
    }
}