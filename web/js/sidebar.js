$(document).ready(function() {
    function setActiveLink() {
        var currentPath = window.location.pathname;
        $(".sidebar ul li").removeClass('active');
        $(".sidebar ul li a").each(function() {
            var link = $(this).attr('href');
            if (currentPath.startsWith(link) && link !== '/') {
                $(this).parent('li').addClass('active');
            }
        });
    }

    setActiveLink();

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

    $(document).on('click', function (e) {
        if ($(window).width() <= 767) {
            var sidebar = $('.sidebar');
            var openBtn = $('.open-btn');
            
            if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0 &&
                !openBtn.is(e.target) && openBtn.has(e.target).length === 0) {
                sidebar.removeClass('active');
            }
        }
    });
});