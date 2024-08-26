<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);
        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    public function create(){
        return Inertia::render('User/Create');
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required',
            'role'=> 'required|in:admin,user'
        ]);

        if($request->role == 'admin'){
            $request->validate([
                'password' => [Password::min(8)->uncompromised()->mixedCase()->letters()->numbers()->symbols()],
            ]);
        }

        
        User::create($request->all());

        return redirect()->route('users');
    }
}
