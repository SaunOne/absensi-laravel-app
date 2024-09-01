<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class RfidController extends Controller
{
    public function readEfid(Request $request){
        if(User::where('uid', $request->uid)->exists()){
            return response()->json([
                'message' => 'RFID Already Exists',
                'data'=> [
                    'uid' => $request->uid
                ]
            ]);
        }
        return response()->json([
            'message' => 'RFID Not Exists',
            'data'=> [
                'uid' => $request->uid
            ]
        ]);
    }
}
