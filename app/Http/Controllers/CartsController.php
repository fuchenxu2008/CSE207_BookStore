<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;
use App\ShoppingCart;
use App\Http\Controllers\Controller;

class CartsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function addToShoppingCart(Request $request)
    {
        Book::updateOrCreate([
            'id' => $request->book_id,
        ],[
            'thumbnail' => $request->book_thumbnail,
            'title' => $request->book_title,
            'author' => json_encode($request->book_author),
            'link' => $request->book_preview,
            'price' => floatval($request->price)
        ]);

        $newCart = ShoppingCart::firstOrNew([
            'book_id' => $request->book_id,
            'user_id' => auth()->user()->id
        ]);
        $newCart->quantity = $newCart->quantity + 1;
        $newCart->price = $newCart->quantity * $request->price; // To be changed
        $newCart->save();

        return response()->json('Book Added to Shopping Cart');
    }

    public function showShoppingCart()
    {
        $shoppingCart = array();
        foreach (auth()->user()->shoppingcarts as $key => $cartItem) {
            $book = Book::find($cartItem['book_id']);
            array_push($shoppingCart, array(
                'id' => $cartItem['id'],
                'book_id' => $cartItem['book_id'],
                'book_thumbnail' => $book->thumbnail,
                'book_title' => $book->title,
                'book_author' => $book->author,
                'book_link' => $book->link,
                'quantity' => $cartItem['quantity'],
                'price' => $book->price
            ));
        }

        return view('shoppingcart')->with('items', $shoppingCart);
    }

    public function getCartSum()
    {
        return response()->json(count(auth()->user()->shoppingcarts));
    }

    public function removeItem(Request $request)
    {
        $item = ShoppingCart::find($request->id);
        $item->delete();
        return response()->json('Deleted.');
    }

    public function updateQuantity(Request $request)
    {
        $item = ShoppingCart::find($request->id);
        $item->quantity = $request->newQuantity;
        $item->save();
        return response()->json('Updated.');
    }
}
