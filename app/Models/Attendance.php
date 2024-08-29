<?php

namespace App\Models;

use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Attendance extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'user_id',
        'latitude',
        'longitude',
        'address',
        'status',
        'description'
    ];

    public function newUniqueID()
    {
        return (string) Uuid::uuid4();
    }
}
