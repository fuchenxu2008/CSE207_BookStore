<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/bookinfo/{id}', function(){
    return view('bookinfo');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::post('/shoppingcart', 'CartsController@addToShoppingCart');

Route::get('/shoppingcart', 'CartsController@showShoppingCart');

Route::delete('/shoppingcart', 'CartsController@removeItem');

Route::put('/shoppingcart', 'CartsController@updateQuantity');

Route::get('/shoppingcartsum', 'CartsController@getCartSum');

Route::get('/checkout', 'OrdersController@showOrderPage');

Route::post('/checkout', 'OrdersController@createOrder');

Route::post('/delivery', 'DeliveriesController@addDelivery');

Route::get('/myorder/{id}', 'OrdersController@showOrder');

Route::delete('/myorder/{id}', 'OrdersController@deleteOrder');

Route::put('/myorder/{id}=canceled', 'OrdersController@cancelOrder');

Route::put('/myorder/{id}=completed', 'OrdersController@completeOrder');

Route::get('/delivery', 'DeliveriesController@showDeliveries');

Route::put('/delivery/{id}', 'DeliveriesController@editDelivery');

Route::delete('/delivery/{id}', 'DeliveriesController@deleteDelivery');

Route::get('/books', function(){
    // $books = App\Book::orderBy('updated_at', 'desc')->paginate(5);
    // return response()->json(view('inc.pagination', ['books' => $books])->render());
    return response()->json(App\Book::orderBy('updated_at', 'desc')->get());
});
