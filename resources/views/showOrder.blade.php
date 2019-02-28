@extends('layouts.app')

@section('content')
    <div class="container order" id="order_{{$order->id}}">
        <a href="/home" class="back"><< Back to Order Center</a>
        <br>
        <br>
        <h4>{{$order->created_at}}</h4><br>
        @foreach ($order->books as $book)
            <div class="row container">
                <img class="col-xs-4" src="{{$book->thumbnail}}" alt="thumbnail" onclick="location.href='/bookinfo/{{$book->id}}'">
                <div class="col-xs-5">
                    <h4><a href="/bookinfo/{{$book->id}}">{{$book->title}}</a></h4>
                    <small>
                        @foreach (json_decode($book->author) as $author)
                            {{$author}}
                        @endforeach
                    </small>
                </div>
                <small class="col-xs-3">x{{$book->quantity}}&nbsp;&nbsp;&nbsp;&nbsp;${{($book->price)*($book->quantity)}}</small>
            </div>
            <hr>
        @endforeach
        <div class="container">
            <h3 style="margin-top:0;">SubTotal: $ {{$order->price}}</h3>
            <hr>
            <p>
                Name: &nbsp;&nbsp; {{$order->delivery->recepient_name}}<br>
                Phone: &nbsp;&nbsp; {{$order->delivery->phone}}<br>
                Address: &nbsp;&nbsp; {{$order->delivery->address}}<br>
            </p>
            @if ($order->status == 'paid')
                <button type="button" class="pull-left" id="cancelOrderBtn">Cancel Order</button>
                <button type="button" class="pull-right" id="confirmOrderBtn">Confirm Recipient</button>
            @elseif ($order->status == 'canceled')
                    <label style="font-size: 40px; color: red;border: 3px red solid; position: absolute; top:40%; left: 20%; transform: translate(-50%, -50%);
                    padding: 5px 15px 5px 15px; background-color: transparent; transform: rotate(-20deg);">Canceled</label>
            @endif
            <button type="button" class="col-xs-12" id="deleteOrderBtn" style="display: none;">Delete Order</button>
        </div>
    </div>
@endsection
