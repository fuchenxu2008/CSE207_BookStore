@extends('layouts.app')

@section('content')
    <div class="container">
        <button type="button" class="back" onclick="window.history.go(-1);"><< Go Back</button>
        <button type="button" id="add_to_cartBtn" class="pull-right"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>&nbsp;&nbsp;Add to ShoppingCart</button>
        <h3 id="bookinfo_title"></h3>
        <hr>
        <div class="row">
            <img id="bookinfo_img" class="col-xs-5 half-shrink">
            <div class="col-xs-7 bookinfo_detail">
                <small>Authors: &nbsp; <span id="bookinfo_author" class="bookinfo_info"></span></small><br>
                <small>Subtitle: &nbsp; <span id="bookinfo_subtitle" class="bookinfo_info"></span></small>
                <small>Publisher: &nbsp; <span id="bookinfo_publisher" class="bookinfo_info"></span></small><br>
                <small>Publish Date: &nbsp; <span id="bookinfo_publishdate" class="bookinfo_info"></span></small><br>
                <small>Page Count: &nbsp; <span id="bookinfo_pagecount" class="bookinfo_info"></span></small><br>
                <small>Price: &nbsp;<span id="bookinfo_price" class="bookinfo_info"></span></small><br>
                <small>ISBN: &nbsp; <span id="bookinfo_ISBN" class="bookinfo_info"></span></small><br>
            </div>
        </div>
        <hr>
        <h3>Categories</h3>
        <p id="bookinfo_categories"></p>
        <hr>
        <h3>Description</h3>
        <p id="bookinfo_description"></p>
    </div>
@endsection
