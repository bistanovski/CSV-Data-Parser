<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Call;
use App\Client;

class UsersController extends Controller
{
    public function getUsers(Request $request)
    {
        return response()->json(User::all());
    }

    public function lastUserInteractions($id)
    {
        return response()->json(Call::getInteractionsForUser($id));
    }
}
