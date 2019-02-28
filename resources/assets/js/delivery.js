$('.editDeliveryBtn').css('cursor','pointer');

$('body').on('click', '.editDeliveryBtn', function() {
    $('#deliveryModal').modal('toggle')
    $('#deliveryForm').find('input[name="delivery_id"]').val($(this).parent().attr('id').replace('delivery_', ''))
    $('#deliveryForm').find('input[name="recepient_name"]').val($($(this).children('label')[0]).text())
    $('#deliveryForm').find('input[name="phone"]').val($($(this).children('label')[1]).text())
    $('#deliveryForm').find('textarea[name="address"]').val($($(this).children('label')[2]).text())
    $('.modal-title').html('Edit Delivery')
    $('#deleteDeliveryBtn').show()
})

$('#addDeliveryBtn').click(function() {
    $('#deliveryModal').modal('toggle')
    $('#deliveryForm').find('input[name="recepient_name"]').val('')
    $('#deliveryForm').find('input[name="phone"]').val('')
    $('#deliveryForm').find('textarea[name="address"]').val('')
    $('.modal-title').html('New Delivery')
    $('#deleteDeliveryBtn').hide()
})

$('#deleteDeliveryBtn').click(function() {
    var confirm = window.confirm('Sure to delete?')
    if (confirm) {
        var id = $('#deliveryForm').find('input[name="delivery_id"]').val()
        axios.delete('/delivery/'+id)
            .then(function(response) {
                // console.log(response);
                $('#delivery_'+id).remove()
                $('#deliveryModal').modal('hide')
            })
            .catch(function(error) {
                console.log(error);
            })
    }
})

$('#deliveryForm').submit(function(e){
    e.preventDefault()
    var delivery = {
        'recepient_name': $('#deliveryForm').find('input[name="recepient_name"]').val(),
        'phone': $('#deliveryForm').find('input[name="phone"]').val(),
        'address': $('#deliveryForm').find('textarea[name="address"]').val()
    }
    // console.log(delivery);
    // Add New
    if ($('.modal-title').text() == 'New Delivery') {
        axios.post('/delivery', delivery)
        .then(function(response) {
            // console.log(response);
            $('#deliveryModal').modal('hide')
            $(`<div class="panel panel-default" id="delivery_`+response.data+`">
                <div class="panel-body editDeliveryBtn">
                    Name: &nbsp;&nbsp; <label>`+delivery.recepient_name+`</label><br>
                    Phone: &nbsp;&nbsp; <label>`+delivery.phone+`</label><br>
                    Address: &nbsp;&nbsp; <label>`+delivery.address+`</label><br>
                </div>
            </div>`).prependTo('#deliveries')
            $('.editDeliveryBtn').css('cursor','pointer');
        })
        .catch(function(error) {
            console.log(error);
        })
    }else {
        // Edit old
        var id = $('#deliveryForm').find('input[name="delivery_id"]').val()
        axios.put('/delivery/'+id, delivery)
        .then(function(response) {
            // console.log(response);
            $('#deliveryModal').modal('hide')
            $('#delivery_'+id).html(`<div class="panel-body editDeliveryBtn">
                Name: &nbsp;&nbsp; <label>`+delivery.recepient_name+`</label><br>
                Phone: &nbsp;&nbsp; <label>`+delivery.phone+`</label><br>
                Address: &nbsp;&nbsp; <label>`+delivery.address+`</label><br>
            </div>`)
        })
        .catch(function(error) {
            console.log(error);
        })
    }
})
