<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Delivery;

class DeliveriesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function addDelivery(Request $request)
    {
        $newDelivery = new Delivery;
        $newDelivery->user_id = auth()->user()->id;
        $newDelivery->recepient_name = $request->input('recepient_name');
        $newDelivery->phone = $request->input('phone');
        $newDelivery->address = $request->input('address');
        $newDelivery->save();
        return response()->json($newDelivery->id);
    }

    public function showDeliveries()
    {
        return view('delivery')->with('deliveries', auth()->user()->deliveries);
    }

    public function editDelivery($id, Request $request)
    {
        $delivery = Delivery::find($id);
        $delivery->recepient_name = $request->recepient_name;
        $delivery->phone = $request->phone;
        $delivery->address = $request->address;
        $delivery->save();
        return response()->json("Modified");
    }

    public function deleteDelivery($id)
    {
        $delivery = Delivery::find($id);
        $delivery->delete();
        return response()->json("Deleted");
    }
}
