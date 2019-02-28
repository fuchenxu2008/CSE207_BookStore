if ($('.ticket').length) {
    var candidateOrder = JSON.parse(sessionStorage.getItem('candidateOrder'))
    if (!candidateOrder) {
        location.href = '/shoppingcart'
    }
    $.each(candidateOrder[0], function(index, item) {
        // console.log(item);
        $("<li>"+item['book_title']+"</li><span class='pull-right'>x"+item['quantity']+"&nbsp;&nbsp;&nbsp;&nbsp;$"+item['subtotal']+"</span><br>").appendTo('.items')
    })
    $('#priceToPay').html(candidateOrder[1]['totalPrice'])
    // console.log(JSON.stringify(candidateOrder));
}

$('#deliveryEntrance').click(function() {
    $('#deliveryModal').modal('toggle')
})

$('#confirm').click(function() {
    var selectedDelivery = $("input[name='delivery']:checked")
    if (selectedDelivery.length == 1) {
        // console.log('yes');
        $delivery = $(selectedDelivery).next()
        // console.log($delivery);
        $('#selectedDelivery').html($delivery.clone())
    }
    $('#deliveryModal').modal('hide')
})

function switchInterface(mode) {
    switch (mode) {
        case 'addDelivery':
        $('#chooseDelivery').hide()
        $('#confirm').hide()
        $('.deliveryFormContent').show()
        break;
        case 'chooseDelivery':
        $('#chooseDelivery').show()
        $('#confirm').show()
        $('.deliveryFormContent').hide()
        break;
        default:
        break
    }
}

$('#addDelivery').click(function() {
    switchInterface('addDelivery')
})

$('#createDeliveryForm').submit(function(e) {
    e.preventDefault()
    var inputs = $('#createDeliveryForm :input')
    var newDelivery = {}
    $.each($(inputs), function(index, input) {
        if (this.name == 'recepient_name' || this.name == 'phone' || this.name == 'address') {
            newDelivery[this.name] = $(input).val()
            $(input).val('')
        }
    })
    // console.log(newDelivery);
    axios.post('/delivery', newDelivery)
    .then(function(response) {
        // console.log(response);
        $(`<li><label>
            <input type="radio" name="delivery" value="`+response.data+`">
            <p>Name: `+newDelivery['recepient_name']+`<br>Phone: `+
            newDelivery['phone']+`<br>Address: `+
            newDelivery['address']+`</p>
            </label></li>`).prependTo('.deliveriesList')
            switchInterface('chooseDelivery')
        })
        .catch(function(e) {
            console.log(e);
        })
    })

    $('#closeModal').click(function() {
        if ($('#confirm').is(':visible')) {
            $('#deliveryModal').modal('hide')
        }else{
            switchInterface('chooseDelivery')
        }
    })

    $('#payBtn').click(function() {
        if ($("input[name='delivery']:checked").length == 1) {
            var books = [],
                carts = []
            $.each(candidateOrder[0], function(index, book) {
                books.push({
                    'book_id': book['book_id'],
                    'quantity': book['quantity']
                })
                carts.push(book['cart_id'])
            })
            // console.log(books);
            // books
            order = {
                'carts': carts,
                'books': books,
                'price': candidateOrder[1]['totalPrice'],
                'delivery': $("input[name='delivery']:checked").val(),
                'status': 'paid'
            }
            $processhint = $(`<div id="added_hint" style="z-index:10; position: fixed; top:50%; left:50%; transform: translate(-50%, -50%); color: white; background-color: rgba(0,0,0,0.5); border-radius:15px; padding-left:30px; padding-right:30px; padding-top:10px; padding-bottom:10px;">
            <h3 style="margin-top:24px; margin-bottom: 24px;">Purchasing...</h3></div>`)
            $processhint.appendTo('body')
            axios.post('/checkout', order)
            .then(function(response) {
                setTimeout(function() {
                    $('#added_hint').remove()
                    $successSymbol = $(`<a href="/home"><span class='glyphicon glyphicon-ok' aria-hidden='true' style='font-size: 15rem; position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);border-radius: 100%;color: white;background-color: #6CE679;padding: 5px;'></span></a>`)
                    $successSymbol.appendTo('body')
                    location.href='/home'
                }, 2000)
            })
            .catch(function(error) {
                console.log(error);
            })
        }else {
            alert('Choose a delivery please :)')
        }
    })
