@if (count($books) > 0)
    <small>{{count($books)}} results found.</small>
    @foreach ($books as $book)
        <div class="panel panel-default">
            <div class="panel-body">
                <div class='row'>
                    <img src='{{$book->thumbnail}}' class='col-xs-3 shrink' onclick="location.href='/bookinfo/{{$book->id}}'">
                    <div class='col-xs-7'>
                        <h4><b><a href='/bookinfo/{{$book->id}}'>{{$book->title}}</a></b></h4>
                        <small>{{$book->author}}</small>
                    </div>
                    <div id="{{$book->id}}" class="col-xs-2 text-center" style="padding: 0 5px 0 5px;cursor: pointer; border-left: 1px solid grey;">
                        <label style="font-size: 15px;font-weight:bold; color:red;">${{$book->price}}</label><br><br>
                        <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true" style="font-size:20px;"></span><br>
                        <label>Add<label>
                    </div>
                </div>
            </div>
        </div>
    @endforeach
@endif

{{$books->links()}}
