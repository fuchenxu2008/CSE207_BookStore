if (window.location.pathname.indexOf('bookinfo') != -1) {
    var book_id = window.location.pathname.split('/')[2]
    axios.get('https://www.googleapis.com/books/v1/volumes/'+book_id)
        .then(function(response) {
            var bookinfo = response.data.volumeInfo
            var img = 'https://vignette.wikia.nocookie.net/galaxylife/images/7/7c/Noimage.png/revision/latest?cb=20120622041841',
            thumbnail = img
            try {
              img = bookinfo.imageLinks.large.replace('http', 'https')
            } catch (err) {
                try {
                  img = bookinfo.imageLinks.medium.replace('http', 'https')
                } catch (err) {
                    try {
                      img = bookinfo.imageLinks.small.replace('http', 'https')
                    } catch (err) {
                        try {
                          img = bookinfo.imageLinks.thumbnail.replace('http', 'https')
                        } catch (err) {}
                    }
                }
            }
            try {
              thumbnail = bookinfo.imageLinks.thumbnail.replace('http', 'https')
            } catch (err) {
                thumbnail = img
            }
            authors = ''
            if (bookinfo !== undefined) {
                authors = bookinfo.authors
            }

            $('#bookinfo_img').attr('src', img)
            $('#bookinfo_title').html(bookinfo.title)
            $('#bookinfo_title').click(function() {
                location.href = bookinfo.previewLink
            })
            $('#bookinfo_img').click(function() {
                location.href = bookinfo.previewLink
            })
            try {
              var subtitle = bookinfo.subtitle
              $('#bookinfo_subtitle').html(subtitle)
              $('<br>').insertAfter($('#bookinfo_subtitle').parent())
            } catch (err) {
                $('#bookinfo_subtitle').parent().hide()
            }
            $('#bookinfo_author').html(authors)
            $('#bookinfo_publisher').html(bookinfo.publisher)
            $('#bookinfo_publishdate').html(bookinfo.publishedDate)
            $('#bookinfo_pagecount').html(bookinfo.pageCount)
            $('#bookinfo_categories').html(bookinfo.categories)
            $('#bookinfo_ISBN').html(bookinfo.industryIdentifiers[1].identifier)
            $('#bookinfo_price').html(response.data.saleInfo.listPrice.amount + '  USD')
            $('#bookinfo_description').html(bookinfo.description)

            // Add to shopping cart
            $('#add_to_cartBtn').bind('click', function() {
                addToShoppingCart({
                    'book_id': book_id,
                    'book_thumbnail': thumbnail,
                    'book_title': bookinfo.title,
                    'book_author': authors,
                    'book_preview': bookinfo.previewLink,
                    'price': response.data.saleInfo.listPrice.amount
                });
            });
        })
        .catch(function(error) {
            console.log(error);
        })
}
// Add to Shopping Cart
function addToShoppingCart(bookinfo) {
    // console.log('front: '+bookinfo);
    axios.post('/shoppingcart', bookinfo)
        .then(function(response) {
            $(`<div id="added_hint" style="z-index:10; position: fixed; top:50%; left:50%; transform: translate(-50%, -50%); color: white; background-color: rgba(0,0,0,0.5); border-radius:15px; padding-left:30px; padding-right:30px; padding-top:10px; padding-bottom:10px;">
            <h3 style="margin-top:24px; margin-bottom: 24px;">Added</h3></div>`).insertAfter('#bookinfo_description')
            $('#added_hint').delay(1000).fadeOut('slow')
            // console.log(response);
        })
        .catch(function (error) {
            if (error.response.status == 401) {
                location.href = "/login"
            }
        });
}
