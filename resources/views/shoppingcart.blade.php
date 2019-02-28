@extends('layouts.app')

@section('content')
    <div class="container" style="padding-bottom: 40px;">
        <h1>Shopping Cart</h1>
        <hr>
        <div id="cartContent">
            @if (count($items) > 0)
                @foreach ($items as $book)
                    <div class="panel panel-default" id="cart_{{$book['id']}}">
                        <div class="panel-body">
                            <div class="row book" value="{{$book['book_id']}}">
                                <div class="col-xs-3 shrink">
                                    <label>
                                        <img class="imgcheck" src="{{$book['book_thumbnail']}}" alt="thumbnail">
                                        <input type="checkbox" class="checkthis">
                                        <span class='selected glyphicon glyphicon-ok' aria-hidden='true'></span>
                                    </label>
                                </div>

                                <div class="col-xs-5 half-shrink">
                                    <h4><a href="/bookinfo/{{$book['book_id']}}">{{$book['book_title']}}</a></h4>
                                    @if (count(json_decode($book['book_author'])) > 0)
                                        <small>
                                            @foreach (json_decode($book['book_author']) as $author)
                                                {{$author}}
                                            @endforeach
                                        </small>
                                    @endif
                                </div>
                                <div class="col-xs-4">
                                    <div class="row text-center">
                                        <div class="col-xs-6 quantityChanger" style="padding-left: 11px;">
                                            {{$book['quantity']}} Copy
                                        </div>
                                        <div class="col-xs-6 individualSum" data="{{$book['price']}}">
                                            {{$book['price']*$book['quantity']}} USD
                                        </div>
                                    </div>
                                    {!! Form::open(['class' => 'removeForm']) !!}
                                    {{Form::submit('Remove', ['class' => 'btn removeBtn'])}}
                                    {!! Form::close() !!}
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            @else
                <small>You haven't added anything yet.</small>
            @endif
        </div>

        <div class="modal fade" id="changeQuantity_modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="">Change Quantity</h4>
                    </div>
                    {!! Form::open(['id' => 'quantityForm']) !!}
                    <div class="modal-body">
                        <div class="row container text-center">
                            {{Form::button('-', ['id' => 'decQuantity', 'class' => 'col-xs-2 col-xs-offset-2 btn btn-primary', 'style' => 'padding: 0; font-size: 22px; font-weight: bold;'])}}
                            <div class="col-xs-4">
                                {{Form::number('newQuantity', '', ['id' => 'quantityInput', 'class' => 'form-control text-center'])}}
                            </div>
                            {{Form::button('+', ['id' => 'incQuantity', 'class' => 'col-xs-2 btn btn-primary', 'style' => 'padding: 0; font-size: 22px; font-weight: bold;'])}}
                        </div>
                        {{Form::number('item_id', '', ['style' => 'display: none;'])}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        {{Form::submit('Confirm', ['class' => 'btn btn-success'])}}
                    </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>

    </div>

    <nav class="bottom-bar">
        {{-- <div> --}}
        <div class="row container vertical-middle">
            <label class="col-xs-3">
                <input id="selectall" type="checkbox" style="display:none;">
                <div class="light"></div>
                <label for="selectall" id="selectall_text"> &nbsp; All</label>
            </label>
            <label class="col-xs-5" style="font-size:25px;">$ <label id="totalPrice"></label></label>
            <button type="button" id="checkout" class="col-xs-4"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>&nbsp;&nbsp;Check Out</button>
        </div>
        {{-- </div> --}}
    </nav>
@endsection
