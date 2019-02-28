<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function books()
    {
        return App\Book::find('book_id');
    }

    public $timestamps = false;

    protected $guarded = [];
}
