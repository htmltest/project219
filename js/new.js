$(document).ready(function() {

    $('.side-menu > ul > li > ul > li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.append('<span></span>');
        }
    });

    $('body').on('click', '.side-menu > ul > li > ul > li > span', function() {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            curLi.toggleClass('open closed');
            curLi.find('> ul').slideToggle(100);
            e.preventDefault();
        }
    });

});