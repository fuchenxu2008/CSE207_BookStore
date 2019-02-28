@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Welcome To Bookstore</h1>
        <hr>
        {!! Form::open(['id' => 'searchForm']) !!}
        <div class="col-xs-3" style="padding: 0;">
            <select id="searchMode" class="selectpicker">
                <option value="Mixed">Mixed</option>
                <option value="Title">Title</option>
                <option value="Author">Author</option>
                <option value="Explicit">Explicit</option>
            </select>
        </div>
        <div id="primary-search" class="input-group col-xs-9" style="padding:0;">
            {{Form::text('searchPhrase', '', ['id' => 'searchPhrase', 'class' => 'form-control', 'required', 'placeholder' => 'Enter search phrase here...'])}}
            <span class="input-group-btn">
                {{Form::submit('Search', ['id' => 'primary-searchBtn', 'class' => 'btn btn-primary'])}}
            </span>
        </div>
        <div id="secondary-search" class="input-group" style="display:none;">
            {{Form::text('searchPhrase', '', ['id' => 'explicitSearch', 'class' => 'form-control', 'placeholder' => 'Enter Author name here...'])}}
            <span class="input-group-btn">
                {{Form::submit('Search', ['class' => 'btn btn-primary'])}}
            </span>
        </div>
        {!! Form::close() !!}
        <div id="categoryList">
            <ul>
                <li>Recent</li>
                <li>Love</li>
                <li>Technology</li>
                <li>Politics</li>
                <li>Literature</li>
                <li>Fiction</li>
                <li>Art</li>
                <li>Society</li>
                <li>Autobiography</li>
                <li>Travel</li>
                <li>Emotion</li>
                <li>Comedy</li>
                <li>Life</li>
                <li>Photography</li>
                <li>Economics</li>
                <li>Adventure</li>
                <li>Novel</li>
                <li>Home</li>
            </ul>
        </div>
        <br>
        <div id="searchResult">
            <small style="position: absolute; bottom: 5px; left:50%; transform:translateX(-50%);">Powered By Google Book</small>
        </div>

        <nav aria-label="Page navigation">
          <ul id="pagination" class="pagination">
          </ul>
        </nav>

        @auth
            <div id="quickCart" class="fixed-lower-right">
                <span class="glyphicon glyphicon-shopping-cart cartlogo" aria-hidden="true">
                    <span id="cart-badge" class="badge upper-right">0</span>
                </span>
            </div>
        @endauth
    </div>
@endsection
