<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Delivery;
use App\Order;
use App\Book;
use App\ShoppingCart;

class OrdersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function showOrderPage()
    {
        $deliveries = auth()->user()->deliveries;
        return view('checkout')->with('deliveries', $deliveries);
    }

    public function createOrder(Request $order)
    {
        $newOrder = new Order;
        $newOrder->user_id = auth()->user()->id;
        $newOrder->books = json_encode($order->input('books'));
        $newOrder->price = $order->input('price');
        $delivery = Delivery::find($order->input('delivery'));
        $newOrder->delivery	= json_encode($delivery);
        $newOrder->status = "paid";
        $newOrder->save();

        foreach ($order->carts as $cart_id) {
            $cart = ShoppingCart::find($cart_id);
            $cart->delete();
        }

        return response()->json("Created");
    }

    public function showOrder($id)
    {
        $order = Order::find($id);
        if (!$order || $order->user_id != auth()->user()->id) {
            return redirect('/home');
        }

        $orderedBookDetails = array();
        foreach (json_decode($order->books) as $orderedBook) {
            $book = Book::find($orderedBook->book_id);
            $book->quantity = $orderedBook->quantity;
            array_push($orderedBookDetails, $book);
        }
        $order->books = $orderedBookDetails;
        $order->delivery = json_decode($order->delivery);
        // return $order;
        return view('showOrder')->with('order', $order);
    }

    public function cancelOrder($id)
    {
        $order = Order::find($id);
        $order->status = "canceled";
        $order->save();
        return response()->json("Canceled");
    }

    public function completeOrder($id)
    {
        $order = Order::find($id);
        $order->status = "completed";
        $order->save();
        return response()->json("Completed");
    }

    public function deleteOrder($id)
    {
        $order = Order::find($id);
        $order->delete();
        return response()->json("Deleted");
    }
}
