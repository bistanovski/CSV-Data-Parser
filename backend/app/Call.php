<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Call extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    static public function getInteractionsForUser($id)
    {
        return Call::where('user_id', $id)->orderBy('date', 'desc')->take(5)->with('client')->get();
    }
}
