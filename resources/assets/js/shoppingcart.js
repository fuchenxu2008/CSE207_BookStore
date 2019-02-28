$(document).ready(function() {
    $('#totalPrice').on('updatePrice', function() {
        // console.log('updated');
        $priceSet = $('.individualSum')
        $totalPrice = 0
        $.each($priceSet, function(index, html) {
            if ($(html).parents('.panel').find('.checkthis').prop('checked')) {
                $totalPrice += parseFloat(html.innerText)
            }
        })
        $('#totalPrice').html($totalPrice.toFixed(2))
        // console.log($totalPrice);
    })

    $('#totalPrice').trigger('updatePrice')

    $('.removeForm').on('submit',function(e) {
        e.preventDefault()
        $item = $(this)
        $id = $item.parents('.panel').attr('id').replace('cart_', '')
        axios.delete('/shoppingcart', {params: {'id': $id}})
            .then(function(response) {
                // console.log(response);
                $item.parents('.panel').remove();
                if ($('#cartContent').find('.panel').length == 0) {
                    $('#cartContent').html("<small>You haven't added anything yet.</small>")
                }
                $('#totalPrice').trigger('updatePrice')
                if ($(".checkthis:checked").length == $(".checkthis").length) {
                    $('#selectall').prop('checked', true)
                }
            })
            .catch(function(error) {
                console.log(error);
            })
    })

    $('.quantityChanger').bind('click', function() {
        $item_id = $(this).parents('.panel').attr('id').replace('cart_', '')
        $('#quantityForm').find('input[name="item_id"]').val($item_id)
        $('#changeQuantity_modal').modal('toggle')
        $('#quantityInput').val(parseInt($(this).text()))
    })

    $('#quantityInput').on('keyup', function() {
        if (parseInt($('#quantityInput').val()) <= 0) {
            $('#quantityInput').val(1)
        }
    })

    $('#decQuantity').click(function() {
        var oldQuantity = parseInt($('#quantityInput').val())
        if (oldQuantity > 1) {
            $('#quantityInput').val(oldQuantity - 1)
        }
    })
    $('#incQuantity').click(function() {
        var oldQuantity = parseInt($('#quantityInput').val())
        $('#quantityInput').val(oldQuantity + 1)
    })

    $('#quantityForm').submit(function(e) {
        e.preventDefault()
        $newQuantityField = $('#quantityForm').find('input[name="newQuantity"]')
        $newQuantity = $newQuantityField.val()
        $newQuantityField.val('')
        $item_id = $('#quantityForm').find('input[name="item_id"]').val()
        $quantity = $('#cart_'+$item_id).find('.quantityChanger')
        $individualSum = $('#cart_'+$item_id).find('.individualSum')
        $singlePrice = $individualSum.attr('data')
        axios.put('/shoppingcart', {'id': $item_id, 'newQuantity': $newQuantity})
            .then(function(response) {
                // console.log(response);
                $quantity.html($newQuantity + ' Copy')
                $('#changeQuantity_modal').modal('hide')
                $individualSum.html(($newQuantity*$singlePrice).toFixed(2) + ' USD')
                $('#totalPrice').trigger('updatePrice')
            })
            .catch(function(error) {
                console.log(error);
            })
    })

    // Img
    function imgCheck(checkbox, state) {
        $parentNode = $(checkbox).parent()
        if (state) {
            $parentNode.find('.imgcheck').addClass('check')
            $parentNode.find('.selected').show()
        }else {
            $parentNode.find('.imgcheck').removeClass('check')
            $parentNode.find('.selected').hide()
        }
    }

    // All
    $('#selectall').change(function() {
        $allcheckbox = $(".checkthis")
        // console.log($allcheckbox);
        $allcheckbox.prop('checked', $(this).prop('checked'))
        imgCheck($allcheckbox, $(this).prop('checked'))
        $('#totalPrice').trigger('updatePrice')
    })

    // Individual
    $('.checkthis').change(function() {
        imgCheck($(this), $(this).prop('checked'))
        if (!$(this).prop('checked')) {
            $('#selectall').prop('checked', false)
        }else if ($(".checkthis:checked").length == $(".checkthis").length) {
            $('#selectall').prop('checked', true)
        }
        $('#totalPrice').trigger('updatePrice')
    })

    $('#checkout').click(function() {
        $selected = $(".checkthis:checked")
        if ($selected.length > 0) {
            $candidateOrder = []
            $books = []
            $.each($selected.parents('.book'), function(index, info) {
                $book = {
                    'cart_id': $(this).parents('.panel').attr('id').replace('cart_', ''),
                    'book_id':  $(info).attr('value'),
                    'book_title': $(info).find('h4').text(),
                    'quantity': parseInt($(info).find('.quantityChanger').text()),
                    'subtotal':  parseFloat($(info).find('.individualSum').text())
                }
                $books.push($book)
            })
            $candidateOrder.push($books)
            $candidateOrder.push({'totalPrice': $('#totalPrice').text()})
            sessionStorage.setItem('candidateOrder', JSON.stringify($candidateOrder));
            location.href = '/checkout'
        }
    })
})
