$(document).ready(function() {
    var lastSearch = JSON.parse(sessionStorage.getItem('lastSearch'))
    var lastCategory = sessionStorage.getItem('lastCategory')

    // padding-left of 'ul'
    var categoryListWidth = 15//px
    // For each category
    $.each($('#categoryList li'), function(index, categoryBtn) {
        // add 15px of margin-right
        categoryListWidth += $(this).width() + 15//px
        // If this category is same as lastCategory
        if (lastCategory == $(this).text()) {
            $(this).addClass('categoryActive')
        }
        $(categoryBtn).bind('click', function() {
            sessionStorage.setItem('lastCategory', $(this).text())
            $(this).addClass('categoryActive')
            $('#categoryList li').not(this).removeClass('categoryActive')
            $('#searchPhrase').val('')
            $('#explicitSearch').val('')
            if ($(this).text() == 'Recent') {
                getRecent()
            }else {
                searchCode = 'q=subject:' + $(this).text()
                searchBook(searchCode, 0)
            }
        })
    })
    // Set the width for ul
    $('#categoryList ul').css('width', categoryListWidth)

    // If there're a lastSearch record (may include lastCategory)
    if (lastSearch) {
        // search that
        searchBook(lastSearch.searchCode, lastSearch.pageIndex)
        // If it's a search not by category
        if (!lastCategory) {
            $('#searchPhrase').val(lastSearch.searchCode.replace('q=', ''))
        }
    }else {
        $('#categoryList li').first().addClass('categoryActive')
        getRecent()
    }

    if ($('#quickCart').length) {
        axios.get('/shoppingcartsum')
        .then(function(response){
            //console.log(response);
            $('#cart-badge').html(response.data)
        })
    }
})

function getRecent() {
    $('#searchResult').html(`<div id="added_hint" style="z-index:10; position: fixed; top:50%; left:50%; transform: translate(-50%, -50%); color: white; background-color: rgba(0,0,0,0.5); border-radius:15px; padding-left:30px; padding-right:30px; padding-top:10px; padding-bottom:10px;">
    <h3 style="margin-top:24px; margin-bottom: 24px;">Loading...</h3></div>`)
    sessionStorage.removeItem('lastSearch')
    sessionStorage.setItem('lastCategory', 'recent')
    $('#pagination').html('')
    axios.get('/books')
    .then(function(response) {
        $('#searchResult').html('')
        $.each(response.data, function(index, bookinfo) {
            // console.log(JSON.parse(bookinfo.author));
            $result = `<div class="panel panel-default"><div class="panel-body"><div class='row'>`
            var thumbnail = 'https://vignette.wikia.nocookie.net/galaxylife/images/7/7c/Noimage.png/revision/latest?cb=20120622041841',
            price = 'Unavailable',
            authors = ''
            if (bookinfo.author != 'null') {
                $.each($(JSON.parse(bookinfo.author)),function(index, author) {
                    authors = authors + author + '<br>'
                })
            }
            try {
                price = bookinfo.price
                if (parseFloat(price) == 0) {
                    displayPrice = 'Free'
                }else {
                    displayPrice = '$' + price
                }
            } catch (err) {return}
            try {
                thumbnail = bookinfo.thumbnail
            } catch (err) {}
            //console.log(authors);
            $result += `<img src='`+thumbnail+`' class='col-xs-3 shrink' onclick="location.href='/bookinfo/`+bookinfo.id+`'">
            <div class='col-xs-7'>
            <h4><b><a href='/bookinfo/`+bookinfo.id+`'>`+bookinfo.title+`</a></b></h4>
            <small>`+authors+`</small></div>
            <div id="`+bookinfo.id+`" class="col-xs-2 text-center" style="padding: 0 5px 0 5px;cursor: pointer; border-left: 1px solid grey;">
            <label style="font-size: 15px;font-weight:bold; color:red;"> `+displayPrice+`</label><br><br><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true" style="font-size:20px;"></span>
            <br><label>Add<label>
            </div></div></div>`
            $($result).appendTo('#searchResult')
            $('#'+bookinfo.id).bind('click', () => {
                //console.log('thumbnail: '+thumbnail);
                addToShoppingCart({
                    'book_id': bookinfo.id,
                    'book_thumbnail': thumbnail,
                    'book_title': bookinfo.title,
                    'book_author': JSON.parse(bookinfo.author),
                    'book_preview': bookinfo.link,
                    'price': price
                });
            });
        })
        // $('#pagination').parent().html(response.data)
        console.log(response);
    })
    .catch(function(error) {
        //console.log(error);
    })
}

$('#searchMode').on('changed.bs.select', function (event, clickedIndex, newValue, oldValue) {
    if (clickedIndex == '3') {
        $('#primary-search').removeClass('input-group')
        $('#primary-searchBtn').hide()
        $('#secondary-search').show()
        $('#searchPhrase').val('')
        $('#searchPhrase').attr('placeholder','Enter the title here...')
        $('#explicitSearch').attr('required','required')
    }else {
        $('#primary-search').addClass('input-group')
        $('#primary-searchBtn').show()
        $('#secondary-search').hide()
        $('#searchPhrase').attr('placeholder','Enter the search phrase here...')
        $('#explicitSearch').removeAttr('required')
    }
});

// pageIndex is the real index-1 (Page 1 => pageIndex = 0)
function searchBook(searchCode, pageIndex) {
    $(`<div id="added_hint" style="z-index:10; position: fixed; top:50%; left:50%; transform: translate(-50%, -50%); color: white; background-color: rgba(0,0,0,0.5); border-radius:15px; padding-left:30px; padding-right:30px; padding-top:10px; padding-bottom:10px;">
    <h3 style="margin-top:24px; margin-bottom: 24px;">Loading...</h3></div>`).appendTo('#searchResult')
    // startIndex is the book index
    $url = 'https://www.googleapis.com/books/v1/volumes?'+searchCode+'&startIndex='+pageIndex*15+'&maxResults=15&filter=paid-ebooks&key=AIzaSyD0bZblkrAO7vVf5-gJ5yIV8C4mxl5-zlA'
    if ((searchCode).indexOf('subject') == -1) {
        $('#categoryList li').removeClass('categoryActive')
        sessionStorage.removeItem('lastCategory')
    }
    axios.get($url)
    .then(function(response) {
        //console.log(response.data);
        $total = response.data.totalItems
        $('#searchResult').html('<small>'+$total+' results found.</small> <small class="pull-right">Page '+(pageIndex+1)+'</small>')
        // console.log(response.data);
        if ($total > 0) {
            if (response.data.items) {
                $.each(response.data.items, function(index, bookinfo) {
                    // console.log(bookinfo.volumeInfo.authors);
                    $result = `<div class="panel panel-default"><div class="panel-body"><div class='row'>`
                    var thumbnail = 'https://vignette.wikia.nocookie.net/galaxylife/images/7/7c/Noimage.png/revision/latest?cb=20120622041841',
                    price = 'Unavailable',
                    authors = ''
                    if (bookinfo.volumeInfo.authors !== undefined) {
                        authors = bookinfo.volumeInfo.authors
                    }
                    try {
                        price = bookinfo.saleInfo.listPrice.amount
                        if (parseFloat(price) == 0) {
                            displayPrice = 'Free'
                        }else {
                            displayPrice = '$' + price
                        }
                    } catch (err) {return}
                    try {
                        thumbnail = bookinfo.volumeInfo.imageLinks.thumbnail.replace('http', 'https')
                    } catch (err) {}
                    //console.log(authors);
                    $result += `<img src='`+thumbnail+`' class='col-xs-3 shrink' onclick="location.href='/bookinfo/`+bookinfo.id+`'">
                    <div class='col-xs-7'>
                    <h4><b><a href='/bookinfo/`+bookinfo.id+`'>`+bookinfo.volumeInfo.title+`</a></b></h4>
                    <small>`+authors+`</small></div>
                    <div id="`+bookinfo.id+`" class="col-xs-2 text-center" style="padding: 0 5px 0 5px;cursor: pointer; border-left: 1px solid grey;">
                    <label style="font-size: 15px;font-weight:bold; color:red;"> `+displayPrice+`</label><br><br><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true" style="font-size:20px;"></span>
                    <br><label>Add<label>
                    </div></div></div>`
                    $($result).appendTo('#searchResult')
                    $('#'+bookinfo.id).bind('click', () => {
                        //console.log('thumbnail: '+thumbnail);
                        addToShoppingCart({
                            'book_id': bookinfo.id,
                            'book_thumbnail': thumbnail,
                            'book_title': bookinfo.volumeInfo.title,
                            'book_author': authors,
                            'book_preview': bookinfo.volumeInfo.previewLink,
                            'price': price
                        });
                    });
                    // Store last search locally
                    sessionStorage.setItem('lastSearch', JSON.stringify({
                        'searchCode': searchCode,
                        'pageIndex': pageIndex
                    }));
                })
            }else {
                $('#searchResult').html('No More books found.')
            }

            // Pagination
            $total/15 == parseInt($total/15) ? $totalPages = $total/15 : $totalPages = parseInt($total/15) + 1;
            $displayLimit = 8 //pages
            // Initialize the default pageIndex to 0
            $startPageIndex = 0;
            // Determine the leftmost page number to display
            var leftFull = pageIndex >= $displayLimit/2
            var rightFull = $totalPages - pageIndex > $displayLimit/2
            //If left part is not over half of the limit, startIndex remains 0 (regardless of the rest)
            if (!leftFull) {
                $startPageIndex = 0;
            }else if (leftFull && rightFull) {    // If left part is over half of the limit && the pages left is over half of the limit, then shift
                $startPageIndex = pageIndex + 1 - $displayLimit/2
            }else if (!rightFull) {   // If right part is not over half of the limit (not enough, don't shift)
                $startPageIndex = $totalPages - $displayLimit
            }
        //console.log('startPageIndex: '+$startPageIndex);
        // If pages left is too many
        $totalPages - pageIndex >= $displayLimit ? $pageInterval = $displayLimit - 1 : $pageInterval = $totalPages - $startPageIndex - 1;
        $('#pagination').html('')
        if (pageIndex >= 1) {
            $(`<li><a id="previousPage" href="#searchForm" aria-label="Previous><span aria-hidden="true">&laquo;</span></a></li>`).appendTo('#pagination')
            $('#previousPage').bind('click', () => {
                searchBook(searchCode, pageIndex-1);
            });
        }
        for (let i = $startPageIndex + 1; i <= $startPageIndex + 1 + $pageInterval; i++) {
            $(`<li><a id="page_`+i+`" href="#searchForm">`+i+`</a></li>`).appendTo('#pagination')
            if (pageIndex == i-1) {
                $('#page_'+i).parent().addClass('active')
            }else {
                $('#page_'+i).removeClass('active')
            }
            $('#page_'+i).bind('click', () => {
                searchBook(searchCode, i-1);
            })
        }
        if (pageIndex + 1 < $totalPages) {
            $(`<li><a id="nextPage" href="#searchForm" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`).appendTo('#pagination')
            $('#nextPage').bind('click', () => {
                searchBook(searchCode, pageIndex+1);
            });
        }
    }else{
        $('#pagination').html('')
        $('#searchResult').html('No books found.')
    }
    $(`<div style='text-align: center;'><small>Powered By Google Book</small></div>`).appendTo('#searchResult')
})
.catch(function (error) {
    //console.log(error);
});
}

// On submiting the search form
$('#searchForm').submit(function(e) {
    e.preventDefault();
    $searchMode = $('#searchMode').selectpicker('val')
    $searchPhrase = $('#searchPhrase').val()
    $searchCode = 'q='
    if ($searchMode == 'Explicit') {
        $explicitSearch = $('#explicitSearch').val()
        $searchCode += '+intitle:' + $searchPhrase + '+inauthor:' + $explicitSearch;
    }else if ($searchMode == 'Mixed') {
        $searchCode += $searchPhrase;
    }else if ($searchMode == 'Title') {
        $searchCode += '+intitle:' + $searchPhrase;
    }else if ($searchMode == 'Author') {
        $searchCode += '+inauthor:' + $searchPhrase;
    }
    searchBook($searchCode, 0);
});

// Add to Shopping Cart
function addToShoppingCart(bookinfo) {
    //console.log('front: '+bookinfo);
    axios.post('/shoppingcart', bookinfo)
    .then(function(response) {
        $(`<div id="added_hint" style="z-index:10; position: fixed; top:50%; left:50%; transform: translate(-50%, -50%); color: white; background-color: rgba(0,0,0,0.5); border-radius:15px; padding-left:30px; padding-right:30px; padding-top:10px; padding-bottom:10px;">
        <h3 style="margin-top:24px; margin-bottom: 24px;">Added</h3></div>`).insertAfter('#searchResult')
        $('#added_hint').delay(1000).fadeOut('slow')
        $('#cart-badge').html(parseInt($('#cart-badge').html()) + 1)
        // console.log(response);
    })
    .catch(function (error) {
        if (error.response.status == 401) {
            location.href = "/login"
        }
    });
}

$('#quickCart').click(() => {
    location.href = "/shoppingcart"
})
