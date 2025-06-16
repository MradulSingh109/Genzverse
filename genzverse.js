src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"


$(document).ready(function () {
    $('.menu-btn').click(function () {
        $('.side-bar').addClass('active');
        $('.menu-btn').css("visibility", "hidden");
    })

    $('.close-btn').click(function () {
        $('.side-bar').removeClass('active');
        $('.menu-btn').css("visibility", "visible");
    })

    $('.sub-btn').click(function () {
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.dropdown').toggleClass('rotate');

    })
})

$(document).ready(function () {

    $('#autoWidth').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function () {
            $('#autoWidth').removeClass('cS-hidden');
        }
    });
});

$(document).ready(function () {
    $('.search').click(function () {
        $('.searchmenu').addClass('searchactive');
        // document.body.style.backgroundColor = "rgb(110, 99, 99)";
    })
})

document.addEventListener('click', e => {
    const searchmenu = document.querySelector('.searchmenu');
    const search = document.querySelector('.search');
    
    if(!searchmenu.contains(e.target) && !search.contains(e.target)){
        searchmenu.classList.remove('searchactive')
    }
})
