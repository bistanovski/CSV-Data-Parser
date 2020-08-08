<?php

namespace App\Http\Controllers;

use App\User;
use App\Call;
use App\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FileUploadController extends Controller
{
    public function uploadFile(Request $request)
    {
        $uploadedFile = $request->file('csv-file');

        if (!$uploadedFile->isValid() || $uploadedFile->getClientOriginalExtension() != 'csv') {
            Log::error('Invalid File Content');
            return response()->json(['error' => 'Uploaded file is not valid!'], 409);
        }

        $fileArray = array_slice(file($uploadedFile), 1); //Read file content in array, and remove the first line (headers)
        $parsedData = array_map('str_getcsv', $fileArray); //Invoke 'str_getcsv' method on each row in fileArray

        $users = array();
        $clients = array();

        $start = microtime(true);
        foreach($parsedData as $row) {
            $userName = $row[0];

            if(!array_key_exists($userName, $users)) {
                $user = new User();
                $user->user_name = $userName;
                $user->save();
                $users[$userName] = $user->id;
            }

            $userId = $users[$userName];

            $clientName = $row[1];
            $clientType = $row[2];

            if(!array_key_exists($clientName, $clients)) {
                $client = new Client();
                $client->client_name = $clientName;
                $client->client_type = $clientType;
                $client->save();
                $clients[$clientName] = $client->id;
            }

            $clientId = $clients[$clientName];

            $callDate = $row[3];
            $callDuration = $row[4];
            $callType = $row[5];
            $callScore = $row[6];

            $call = new Call();
            $call->date = $callDate;
            $call->duration = $callDuration;
            $call->type_of_call = $callType;
            $call->call_score = $callScore;
            $call->user_id = $userId;
            $call->client_id = $clientId;
            $call->save();
        }

        Log::info('Parsing and saving CSV File took: ' . (string) (microtime(true) - $start));
        return response()->json(['data' => 'Success!'], 200);
    }
}
