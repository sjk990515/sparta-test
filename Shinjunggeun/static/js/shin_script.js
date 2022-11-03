$(document).ready(function () {
    //main_visual
    $(".visual_slider").slick({
        autoplay: false,
        fade: false,
        autoplaySpeed: 4000,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        prevArrow: $("#visual_prev"),
        nextArrow: $("#visual_next"),
        lazyLoad: "progressive",
        pauseOnHover: false
    }).slickAnimation();

    //aos
    AOS.init({
        duration: 2000
    });
});

$(document).ready(function () {
    show_order();
});

function show_order() {
    $.ajax({
        type: 'GET',
        url: '/shinmini',
        data: {},
        success: function (response) {
            let rows = response['orders']
            for (let i = 0; i < rows.length; i++) {
                let name = rows[i]['name']
                let comment = rows[i]['comment']

                let temp_html = `<li>
                                    <span></span>
                                    <b>${name}</b>
                                    <p>${comment}</p>
                                </li>`
                $('#comment_box').append(temp_html)
            }
        }
    });
}

function save_order() {
    let name = $('#name').val()
    let comment = $('#comment').val()

    $.ajax({
        type: 'POST',
        url: '/shinmini',
        data: {name_give: name, comment_give: comment},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });
}

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $(".top").fadeIn("slow");
        } else {
            $(".top").fadeOut("slow");
        }
    });
    $(".top").on("click", function () {
        $("html,body").animate({
            scrollTop: "0"
        }, 300);
    });
});
