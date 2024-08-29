<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
class AttendanceController extends Controller
{
    public function submit(Request $request){
        $request->validate([
            'status' => 'required',
            'description' => 'required_if:status,sick,leave,permit,bussiness_trip,remote',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        Attendance::create([
            'user_id' => auth()->user()->id,
            'status' => $request->status,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);
    }
}
