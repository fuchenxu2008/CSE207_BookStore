<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    public function order()
    {
        return $this->belongsTo('App\Order');
    }

    public $incrementing = false;

    // public $timestamps = false;

    // Make all attributes Mass Assignable
    protected $guarded = [];
}
