$(".sidebar ul li").on('click', function () {
    $(".sidebar ul li.active").removeClass('active');
    $(this).addClass('active');
});

$('.open-btn').on('click', function () {
    $('.sidebar').addClass('active');
});

$('.close-btn').on('click', function () {
    $('.sidebar').removeClass('active');
});

// Nuevo código para cerrar la sidebar al hacer clic fuera de ella
$(document).on('click', function (e) {
    if ($(window).width() <= 767) {
        var sidebar = $('.sidebar');
        var openBtn = $('.open-btn');
        
        // Si el clic no fue dentro de la sidebar ni en el botón de abrir
        if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0 &&
            !openBtn.is(e.target) && openBtn.has(e.target).length === 0) {
            sidebar.removeClass('active');
        }
    }
});