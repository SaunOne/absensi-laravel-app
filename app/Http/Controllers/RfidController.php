<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Events\ReadRfidEvent;
class RfidController extends Controller
{
    public function readEfid(Request $request){
        if(User::where('uid', $request->uid)->exists()){
            event(new ReadRfidEvent($request->uid, 'RFID Already Exists', 'EXIST'));
            
            return response()->json([
                'uid'=> $request->uid,
                'message' => 'RFID Already Exists',
                'code'=> 'EXIST'
            ]);
        }else{
            event(new ReadRfidEvent($request->uid, 'RFID read successfully', 'SUCCESS'));
            
            return response()->json([
                'uid'=> $request->uid,
                'message' => 'RFID read successfully',
                'code'=> 'SUCCESS',
            ]);

        }
    }
}
