$(document).ready(function() {
    if (!$('#confirmOrderBtn').length) {
        $('#deleteOrderBtn').show()
    }

    $('#cancelOrderBtn').click(function() {
        var confirm = window.confirm('Are you sure you wanna cancel it?');
        if (confirm) {
            var id = $('.order').attr('id').replace('order_', '')
            axios.put('/myorder/'+id+'=canceled')
                .then(function(response) {
                    // console.log(response);
                    $('#cancelOrderBtn').remove()
                    $('#confirmOrderBtn').remove()
                    $('#deleteOrderBtn').show()
                    $(`<label style="font-size: 40px; color: red;border: 3px red solid; position: absolute; top:40%; left: 20%; transform: translate(-50%, -50%);
                    padding: 5px 15px 5px 15px; background-color: transparent; transform: rotate(-20deg);">Canceled</label>`).appendTo('body')
                })
                .catch(function(error) {
                    console.log(error);
                })
        }
    })

    $('#confirmOrderBtn').click(function() {
        var confirm = window.confirm('You sure you have got the books? :D');
        if (confirm) {
            var id = $('.order').attr('id').replace('order_', '')
            axios.put('/myorder/'+id+'=completed')
                .then(function(response) {
                    // console.log(response);
                    $('#cancelOrderBtn').remove()
                    $('#confirmOrderBtn').remove()
                    $('#deleteOrderBtn').show()
                })
                .catch(function(error) {
                    console.log(error);
                })
        }
    })

    $('#deleteOrderBtn').click(function() {
        var confirm = window.confirm('You sure you wanna destroy this order? :(');
        if (confirm) {
            var id = $('.order').attr('id').replace('order_', '')
            axios.delete('/myorder/'+id)
                .then(function(response) {
                    // console.log(response);
                    location.href = "/home"
                })
                .catch(function(error) {
                    console.log(error);
                })
        }
    })
})
