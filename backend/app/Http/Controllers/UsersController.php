<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{
    public function getUsers(Request $request)
    {
        return response()->json(User::all());
    }
}
