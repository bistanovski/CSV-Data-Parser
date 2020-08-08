<?php

namespace App\Http\Controllers;

use DateTime;
use App\User;
use App\Call;
use App\Client;
use Carbon\Carbon;
use Illuminate\Http\Request;

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

    public function userStatistics($id, $timePeriod)
    {
        $currentDate = Carbon::now();

        if('weekly' == $timePeriod)
        {
            $dateRange = $currentDate->subWeek()->toDateTimeString();
        }
        else if('monthly' == $timePeriod)
        {
            $dateRange = $currentDate->subMonth()->toDateTimeString();
        }

        $result = [];

        $callsList = Call::getStatisticsForUserAndDate($id, $dateRange);
        $datesList = $callsList->unique('date')->pluck('date');

        foreach($datesList as $date)
        {
            $callsByDate = $callsList->where('date', $date);
            $averageScore = $callsByDate->average('call_score');
            $totalCallDuration = $callsByDate->sum('duration');

            $formattedDate = new DateTime($date);

            $result[] = [
                'date' => $formattedDate->format('m-d'),
                'average_score' => $averageScore,
                'total_call_duration' => $totalCallDuration / 60 / 60 //Return duration in hours
            ];
        }

        return response()->json($result);
    }
}
