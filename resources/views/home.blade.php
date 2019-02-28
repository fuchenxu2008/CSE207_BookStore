@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Order Center</h1>
        <hr>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <a href='/delivery'>Manage Delivery Methods >></a>
                    </div>
                </div>
                @if (count($orders))
                    <div class="panel panel-default">
                        <div class="panel-heading"><span class="glyphicon glyphicon-flash" aria-hidden="true"></span>&nbsp;In-process Orders</div>
                        <div class="panel-body container">
                            @foreach ($orders as $order)
                                @if ($order->status == "paid")
                                    @php $recentFound = true; @endphp
                                    <div class="row container">
                                        <h4 class="pull-left"># {{$order->id}}</h4>
                                        <h5 class="text-right" style="margin-top:0;">{{$order->created_at}}</h5>
                                    </div>
                                    <ul class="orderList">
                                        @foreach ($order->books as $book)
                                            <div class="row container">
                                                <li class="pull-left">{{$book->title}}</li>
                                                <span class="pull-right">x{{$book->quantity}}</span><br>
                                            </div>
                                        @endforeach
                                    </ul>
                                    <div class="row container">
                                        <text class="priceTag pull-left"><span class="glyphicon glyphicon-send" aria-hidden="true"></span>&nbsp;&nbsp;Price: ${{$order->price}}</text>
                                        <a class="pull-right manageOrderBtn" href="/myorder/{{$order->id}}">Manage</a>
                                    </div>
                                    <hr>
                                @endif
                            @endforeach
                            @if (!isset($recentFound))
                                <small>You have no order in process.</small>
                            @endif
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading"><span class="glyphicon glyphicon-star" aria-hidden="true"></span>&nbsp;History Orders</div>
                        <div class="panel-body">
                            @foreach ($orders as $order)
                                @if ($order->status != "paid")
                                    @php $historyFound = true; @endphp
                                    <div class="row container">
                                        <h4 class="pull-left"># {{$order->id}}</h4>
                                        <h5 class="pull-right" style="margin-top:0;">{{$order->created_at}}</h5>
                                    </div>
                                    <ul class="orderList">
                                        @foreach ($order->books as $book)
                                            <div class="row container">
                                                <li class="pull-left">{{$book->title}}</li>
                                                <span class="pull-right">x{{$book->quantity}}</span><br>
                                            </div>
                                        @endforeach
                                    </ul>
                                    <div class="row container">
                                        @if ($order->status == "completed")
                                            <text class="priceTag completed_order pull-left"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;&nbsp;Price: ${{$order->price}}</text>
                                        @else
                                            <text class="priceTag canceled_order pull-left"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>&nbsp;Price: ${{$order->price}}</text>
                                        @endif
                                        <a class="pull-right manageOrderBtn" href="/myorder/{{$order->id}}">Detail</a>
                                    </div>
                                    <hr>
                                @endif
                            @endforeach
                            @if (!isset($historyFound))
                                <small>You have no older orders.</small>
                            @endif
                        </div>
                    </div>
                @else
                    <small>You haven't placed any order yet.</small>
                @endif
            </div>
        </div>
    </div>
@endsection
