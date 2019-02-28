@extends('layouts.app')

@section('content')
<style media="screen">
body {
    background-color: rgb(86,182,194);
}
</style>
<div class="container">
    <div class="ticket">
        <div class="container">
            <h1>Your Order</h1>
            <hr>
            <div class="content">
                <ul class="items">
                </ul>
            </div>
            <hr>
                <h4>Delivery</h4>
                <div id="selectedDelivery" class="container">

                </div>
                <button type="button" id="deliveryEntrance">Choose your delivery method ></button>
            <hr>
            <div class="text-right" style="font-size:20px;">
                Total: <span style="color:#FC586E">$ </span><label id="priceToPay">0</label>
                <button type="button" id="payBtn">Pay Now</button>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deliveryModal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="">Delivery Method</h4>
          </div>
          {!! Form::open(['id' => 'createDeliveryForm']) !!}
          <div class="modal-body">
              <div id="chooseDelivery">
                  <ul class="deliveriesList">
                      @if (count($deliveries) > 0)
                          @foreach ($deliveries as $delivery)
                              <li>
                                  <label>
                                      <input type="radio" name="delivery" value="{{$delivery->id}}">
                                      <p>Name: {{$delivery['recepient_name']}}<br>
                                      Phone: {{$delivery['phone']}}<br>
                                      Address: {{$delivery['address']}}</p>
                                  </label>
                              </li>
                          @endforeach
                      @endif
                  </ul>
                  <button type="button" id="addDelivery" class="center-block">Add New Delivery</button>
              </div>
              <div class="deliveryFormContent">
                  {{Form::label('recepient_name', 'Name')}}
                  {{Form::text('recepient_name', auth()->user()->name, ['class' => 'form-control', 'required'])}}
                  {{Form::label('phone', 'Phone')}}
                  {{Form::number('phone', '', ['class' => 'form-control', 'required'])}}
                  {{Form::label('address', 'Address')}}
                  {{Form::textarea('address', '', ['class' => 'form-control', 'rows' => '3', 'required'])}}
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" id="closeModal">Close</button>
            <button type="button" class="btn btn-primary" id="confirm">Confirm</button>
            {{Form::submit('Add this address', ['id' => 'deliverySubmit', 'class' => 'deliveryFormContent btn btn-success', 'style' => 'display: none;'])}}
          {!! Form::close() !!}
          </div>
        </div>
      </div>
    </div>
</div>

@endsection
