<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;
use App\Delivery;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Orginal Order
        $processedOrders = array();
        foreach (auth()->user()->orders->sortByDesc('created_at') as $order) {
            // Get ordered books
            $orderedBookDetails = array();
            foreach (json_decode($order->books) as $orderedBook) {
                $book = Book::find($orderedBook->book_id);
                $book->quantity = $orderedBook->quantity;
                array_push($orderedBookDetails, $book);
            }
            $order->books = $orderedBookDetails;
            // Get order delivery
            $delivery = Delivery::find($order->delivery);
            $order->delivery = $delivery;
            array_push($processedOrders, $order);
        }
        return view('home')->with([
            'orders' => (object)$processedOrders,
            'deliveries' => auth()->user()->deliveries
        ]);
    }
}
