@extends('layouts.app')

@section('content')
    <div class="container">

        <div class="row container">
            <h1>Your Delivery</h1><hr>
            <a href="/home" class="back pull-left"><< Go Back</a>
            <button type="button" id="addDeliveryBtn" class="pull-right"> + Add a new delivery</button>
        </div>
        <br>



        <div id="deliveries">
            @foreach ($deliveries as $delivery)
                <div class="panel panel-default" id="delivery_{{$delivery->id}}">
                    <div class="panel-body editDeliveryBtn">
                        Name: &nbsp;&nbsp; <label>{{$delivery->recepient_name}}</label><br>
                        Phone: &nbsp;&nbsp; <label>{{$delivery->phone}}</label><br>
                        Address: &nbsp;&nbsp; <label>{{$delivery->address}}</label><br>
                        {{-- <button type="button" class="btn btn-warning editDeliveryBtn">Edit</button> --}}
                    </div>
                </div>
            @endforeach
        </div>

        <div class="modal fade" id="deliveryModal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"></h4>
              </div>
              {!!Form::open(['id' => 'deliveryForm'])!!}
              <div class="modal-body">
                {{Form::text('delivery_id', '', ['style' => 'display:none;'])}}
                {{Form::label('recepient_name', 'Name')}}
                {{Form::text('recepient_name', auth()->user()->name, ['class' => 'form-control', 'required'])}}
                {{Form::label('phone', 'Phone')}}
                {{Form::number('phone', '', ['class' => 'form-control', 'required'])}}
                {{Form::label('address', 'Address')}}
                {{Form::textarea('address', '', ['class' => 'form-control', 'rows' => '3', 'required'])}}
              </div>
              <div class="modal-footer">
                <button type="button" id="deleteDeliveryBtn" class="btn btn-danger pull-left">Delete</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                {{Form::submit('Save', ['id' => '', 'class' => 'btn btn-success'])}}
              </div>
              {!!Form::close()!!}
            </div>
          </div>
        </div>

    </div>
@endsection
