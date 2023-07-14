var sliderPeriod = 5000;
var sliderSpeed  = 500;

$(document).ready(function() {

    $.validator.addMethod('maskPhone',
        function(value, element) {
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.nav > .container > ul > li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.addClass('with-submenu');
        }
    });

    $('.mobile-menu-link').click(function(e) {
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('mobile-menu-open');
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
        $('html').data('scrollTop', curScroll);
        $('.wrapper').css('margin-top', -curScroll);
        e.preventDefault();
    });

    $('.mobile-menu-close').click(function(e) {
        $('html').removeClass('mobile-menu-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $('.wrapper').css('margin-top', 0);
        $(window).scrollTop($('html').data('scrollTop'));
        e.preventDefault();
    });

    $('.nav ul li').each(function() {
        var curItem = $(this);
        if (curItem.find('ul').length > 0) {
            curItem.append('<div class="nav-mobile-sublink"></div>');
        }
    });

    $('body').on('click', '.nav-mobile-sublink', function() {
        $(this).parent().toggleClass('open');
    });

    $('.header-search-link').click(function(e) {
        $('.header-search').toggleClass('open');
        if ($('.header-search').hasClass('open')) {
            $('.header-search .form-input input').focus();
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('.header-search').removeClass('open');
        }
    });

    $('.header-cart-window-hide').click(function(e) {
        $('.header-cart').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-cart').length == 0) {
            $('.header-cart').removeClass('open');
        }
    });

    $('.header-cart-value').click(function(e) {
        if ($(window).width() < 1200) {
            $('.header-cart').toggleClass('open');
            e.preventDefault();
        }
    });

    $('.side-menu > ul > li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.append('<span></span>');
        }
    });

    $('body').on('click', '.side-menu > ul > li > span', function() {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            curLi.toggleClass('open closed');
            curLi.find('> ul').slideToggle(100);
            e.preventDefault();
        }
    });

    $('.catalogue-sort-select-current').click(function() {
        $('.catalogue-sort-select').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.catalogue-sort-select').length == 0) {
            $('.catalogue-sort-select').removeClass('open');
        }
    });

    $('.catalogue-item-cart > a').click(function(e) {
        $(this).parents().filter('.catalogue-item').addClass('in-cart');
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('click', '.window-basket-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.catalogue-recommend').each(function() {
        var curBlock = $(this);
        var curHTML = '<ul>';
        curBlock.find('.recommend-tab').each(function() {
            if($(this).data('title') != undefined){
                curHTML += '<li><a href="#">' + $(this).data('title') + '</a></li>';
            }
        });
        curHTML += '</ul>';
        if (curHTML != '<ul></ul>') {
            $('.catalogue-recommend').show();
            curBlock.find('.recommend-menu').prepend(curHTML);
            curBlock.find('.recommend-menu li:first').addClass('active');
            if (curBlock.find('.recommend-menu li').length > 0) {
                curBlock.find('.recommend-menu').show();
            }
            curBlock.find('.recommend-tab:first').addClass('active');
        }
    });

    $('.catalogue-recommend').on('click', '.recommend-menu ul li a', function(e) {
        var curLi = $(this).parent();
        var curBlock = curLi.parents().filter('.catalogue-recommend');
        if (!curLi.hasClass('active')) {
            var curIndex = curBlock.find('.recommend-menu ul li').index(curLi);
            curBlock.find('.recommend-menu ul li.active').removeClass('active');
            curLi.addClass('active');

            curBlock.find('.recommend-tab.active').removeClass('active');
            curBlock.find('.recommend-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.catalogue-text-more a').click(function(e) {
        $(this).parent().prev().toggleClass('open');
        e.preventDefault();
    });

    $('.product-left .product-photo-preview ul li a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLink.parent().hasClass('active')) {
            $('.product-left .product-photo-preview ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.product-left .product-photo-preview ul li').index(curLi);
            $('.product-left .product-photo-big a.active').removeClass('active');
            $('.product-left .product-photo-big a').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-right .product-photo-preview ul li a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLink.parent().hasClass('active')) {
            $('.product-right .product-photo-preview ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.product-right .product-photo-preview ul li').index(curLi);
            $('.product-right .product-photo-big a.active').removeClass('active');
            $('.product-right .product-photo-big a').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-order .btn-submit').click(function(e) {
        $('.product-order').addClass('in-cart');
        windowOpen($('.product-order form').attr('action'), $('.product-order form').serialize());
        e.preventDefault();
    });

    $('.product-order .btn-reset').click(function(e) {
        //поищем количество, что бы добавить его к вызову формы
        var count = $('input[name=count]').val();
        if(count)
          var suphix = "&count="+count;
        windowOpen($(this).attr('href')+suphix);
        e.preventDefault();
    });

    $('.product-tabs-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.product-tabs-menu li').index(curLi);
            $('.product-tabs-menu li.active').removeClass('active');
            curLi.addClass('active');
            $('.product-tab-content.active').removeClass('active');
            $('.product-tab-content').eq(curIndex).addClass('active');

            $('.product-tabs-menu').each(function() {
                var curMenu = $(this);
                var curLink = curMenu.find('li.active a');
                $('.product-tabs-menu-line').animate({'width': curLink.width(), 'left': curLink.offset().left - curMenu.offset().left});
            });
        }
        e.preventDefault();
    });

    $('body').on('click', '.product-left .product-photo-big-inner a', function(e) {
        var curArray = [];
        $('.product-left .product-photo-preview a').each(function() {
            curArray.push({src: $(this).attr('rel')});
        });
        var curIndex = $('.product-left .product-photo-preview li').index($('.product-left .product-photo-preview li.active'));
        $.fancybox.open(curArray, {
                baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                    '<div class="fancybox-bg"></div>' +
                    '<div class="fancybox-controls">' +
                        '<div class="fancybox-infobar">' +
                            '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
                            '<div class="fancybox-infobar__body">' +
                                '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
                            '</div>' +
                            '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
                        '</div>' +
                        '<div class="fancybox-buttons">' +
                            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="fancybox-slider-wrap">' +
                        '<div class="fancybox-slider"></div>' +
                    '</div>' +
                    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
                '</div>',
                slideShow : false,
                fullScreen : false,
                thumbs : false
            },
            curIndex
        );
        e.preventDefault();
    });

    $('body').on('click', '.product-right .product-photo-big-inner a', function(e) {
        var curArray = [];
        $('.product-right .product-photo-preview a').each(function() {
            curArray.push({src: $(this).attr('rel')});
        });
        var curIndex = $('.product-right .product-photo-preview li').index($('.product-right .product-photo-preview li.active'));
        $.fancybox.open(curArray, {
                baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                    '<div class="fancybox-bg"></div>' +
                    '<div class="fancybox-controls">' +
                        '<div class="fancybox-infobar">' +
                            '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
                            '<div class="fancybox-infobar__body">' +
                                '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
                            '</div>' +
                            '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
                        '</div>' +
                        '<div class="fancybox-buttons">' +
                            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="fancybox-slider-wrap">' +
                        '<div class="fancybox-slider"></div>' +
                    '</div>' +
                    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
                '</div>',
                slideShow : false,
                fullScreen : false,
                thumbs : false
            },
            curIndex
        );
        e.preventDefault();
    });

    $('.slider').each(function() {
        var curSlider = $(this);
        var curHTML = '';
        curSlider.find('.slider-item').each(function() {
            curHTML += '<a href="#"><span></span></a>';
        });
        $('.slider-ctrl').html(curHTML);
        $('.slider-ctrl a:first').addClass('active');
    });

    $('.slider-content').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: sliderPeriod,
        dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        speed: sliderSpeed,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    variableWidth: false
                }
            }
        ]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.slider-ctrl a span').stop(true, true).css({'width': 0});
        $('.slider-ctrl a.active').removeClass('active');
        $('.slider-ctrl a').eq(nextSlide).addClass('active');
        $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');
    });
    $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');

    $('body').on('click', '.slider-ctrl a', function(e) {
        var curIndex = $('.slider-ctrl a').index($(this));
        $('.slider-content').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.brands-list-inner').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    $('.responses-item a').fancybox({
        baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-controls">' +
                '<div class="fancybox-infobar">' +
                    '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
                    '<div class="fancybox-infobar__body">' +
                        '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
                    '</div>' +
                    '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
                '</div>' +
                '<div class="fancybox-buttons">' +
                    '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
                '</div>' +
            '</div>' +
            '<div class="fancybox-slider-wrap">' +
                '<div class="fancybox-slider"></div>' +
            '</div>' +
            '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
        '</div>',
        slideShow : false,
        fullScreen : false,
        thumbs : false
    });

    $('.responses-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('#changeDelivery').change(function(e) {
        var curValue = $(this).val();
        $('.order-delivery-item.active').removeClass('active');
        $('#delivery-' + curValue).addClass('active');
        $("#deliveryId").val(curValue);
        recalcCart();
    });

    $('.order-comment-link a').click(function(e) {
        $('.order-comment-link').hide();
        $('.order-comment').css({'display': 'block'});
        e.preventDefault();
    });

    $('.basket-row-count input').on('spinstop', function(event, ui) {
        recalcCart();
    });

    /*
    $('.basket-delete a').click(function(e) {
        $(this).parents().filter('.basket-row').remove();
        recalcCart();
        e.preventDefault();
    });
    */

    $('.catalogue-filter-mobile-link').click(function(e) {
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('catalogue-filter-mobile-open');
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
        $('html').data('scrollTop', curScroll);
        $('.wrapper').css('margin-top', -curScroll);
        e.preventDefault();
    });

    $('.catalogue-filter-mobile-close').click(function(e) {
        $('html').removeClass('catalogue-filter-mobile-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $('.wrapper').css('margin-top', 0);
        $(window).scrollTop($('html').data('scrollTop'));
        e.preventDefault();
    });

    $('.catalogue-header h1').click(function(e) {
        if ($('.side-menu').length > 0) {
            $('html').toggleClass('side-menu-open');
            $(window).scrollTop(0);
        }
    });

    $('.side-menu-mobile-link').click(function(e) {
        $('html').removeClass('side-menu-open');
        e.preventDefault();
    });

    $('.faq-form-show a').click(function(e) {
        $('.faq-form-show').hide();
        $('.faq-form').show();
        e.preventDefault();
    });

    $('.faq-form-hide a').click(function(e) {
        $('.faq-form-show').show();
        $('.faq-form').hide();
        e.preventDefault();
    });

    $('.basket-order-link-mobile a').click(function(e) {
        $('.checkout').addClass('step-2');
        $('html, body').animate({scrollTop: $('.checkout').offset().top});
        e.preventDefault();
    });

    $('.checkout-step-1').click(function(e) {
        $('.checkout').removeClass('step-2');
        e.preventDefault();
    });

    $('.checkout-step-2').click(function(e) {
        $('.checkout').addClass('step-2');
        e.preventDefault();
    });

    $('.bx_filter_input_checkbox input').change(function() {
        var curField = $(this).parent();
        $('.bx_filter_input_checkbox.focus').removeClass('focus');
        curField.addClass('focus');
    });

    $('.menu-add-main li.mobile-with-submenu > a').click(function(e) {
        if ($(window).width() < 1200) {
            var curLi = $(this).parent();
            if (curLi.hasClass('open')) {
                curLi.removeClass('open');
            } else {
                curLi.addClass('open');
            }
            e.preventDefault();
        }
    });

    $('.menu-add-sections > ul > li > a').click(function(e) {
        if ($(window).width() < 1200) {
            var curLi = $(this).parent();
            if (curLi.hasClass('open')) {
                curLi.removeClass('open');
            } else {
                $('.menu-add-sections > ul > li.open').removeClass('open');
                curLi.addClass('open');
            }
            e.preventDefault();
        }
    });

    $('.menu-add-section-close').click(function(e) {
        $('.menu-add-sections > ul > li.open').removeClass('open');
        e.preventDefault();
    });

    $('.menu-add-section-close-mobile').click(function(e) {
        $('.menu-add').removeClass('open-sections');
        e.preventDefault();
    });

    if ($('.checkout').length > 0) {
        initOrderDates();
    }

    $('.up-link').click(function(e) {
        $('html, body').animate({scrollTop: 0});
        e.preventDefault();
    });

});

function recalcCart() {
    var curSumm = 0;
    $('.checkout-cart .basket-row').each(function() {
        var curRow = $(this);
        var curNum = Number(curRow.find('.basket-row-count input').val());
        curSumm += curNum * Number(curRow.find('.basket-row-price-per-item span').html().replace(' ', ''));
        curRow.find('.basket-row-price span').html(String(curNum * Number(curRow.find('.basket-row-price-per-item span').html().replace(' ', ''))).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });
    var curDeliveryPrice = 0;
    if ($('.order-delivery-item.active').length > 0) {
        if ($('.order-delivery-item.active .delivery-price').length > 0) {
            curDeliveryPrice = Number($('.order-delivery-item.active .delivery-price').html().replace(' ', ''));
        }
    }

    $('#basket-delivery').html(String(curDeliveryPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    var allSumm = curSumm + curDeliveryPrice;//+ Number($('#basket-discount').html().replace(' ', ''))
    if ($('#basket-coupon-value').length > 0) {
        $('#basket-coupon-summ').html(String(-Math.round(allSumm * (Number($('#basket-coupon-value').html() / 100)))).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        allSumm += Number($('#basket-coupon-summ').html().replace(' ', ''));
    }
    if (allSumm < 0) {
        allSumm = 0;
    }
    allSumm = curSumm + curDeliveryPrice;// + Number($('#basket-discount').html().replace(' ', '')) + Number($('#basket-coupon-summ').html().replace(' ', ''))
    $('#basket-summ').html(String(allSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
}

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

$(window).on('load resize', function() {
    $('.catalogue-text-wrap').each(function() {
        var curBlock = $(this);
        curBlock.removeClass('hidden open');
        if (curBlock.height() < curBlock.find('.catalogue-text-inner').height()) {
            curBlock.addClass('hidden');
        }
    });

    $('.product-left .product-photo-big-inner').css({'line-height': $('.product-left .product-photo-big-inner a').height() + 'px'});
    $('.product-right .product-photo-big-inner').css({'line-height': $('.product-right .product-photo-big-inner a').height() + 'px'});

    $('.product-tabs-menu').each(function() {
        var curMenu = $(this);
        var curLink = curMenu.find('li.active a');
        $('.product-tabs-menu-line').animate({'width': curLink.width(), 'left': curLink.offset().left - curMenu.offset().left});
    });

    $('.catalogue-recommend .catalogue-list').each(function() {
        var curList = $(this);
        if (curList.hasClass('slick-slider')) {
            curList.slick('unslick');
            curList.find('.catalogue-item-text').css({'min-height': 0});
        }
        if ($(window).width() < 1199) {
            curList.slick({
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>',
                dots: true,
                adaptiveHeight: true
            });
            curList.find('.catalogue-item-text').css({'min-height': '0px'});

            curList.find('.catalogue-item-text').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.outerHeight();

                curList.find('.catalogue-item-text').each(function() {
                    var otherBlock = $(this);
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                });
            });
        }
    });

});

$(window).on('load resize scroll', function() {
    if ($(window).scrollTop() > $(window).height()) {
        $('.up-link').css({'display': 'block'});
    } else {
        $('.up-link').css({'display': 'none'});
    }
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('input[type="number"]').each(function() {
        var curBlock = $(this).parent();
        var curHTML = curBlock.html();
        curBlock.html(curHTML.replace(/type=\"number\"/g, 'type="text"'));
        curBlock.find('input').spinner();
        curBlock.find('input').keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                return false;
            }
            return true;
        });
    });

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent().parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    if (curForm.hasClass('window-form')) {
        curForm.validate({
            ignore: '',
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                checkErrors();
            },
            submitHandler: function(form) {
                windowOpen($(form).attr('action'), $(form).serialize());
            }
        });
    } else {
        curForm.validate({
            ignore: '',
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                checkErrors();
            }
        });
    }
}

function checkErrors() {
    $('.form-input').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('input.error').length > 0 || curField.find('textarea.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0 || curField.find('textarea.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-checkbox, .form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-select').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('select.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('select.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    if ($('.window').length > 0) {
        $('.window').remove();
    }

    $('body').append('<div class="window"><div class="window-loading"></div></div>')

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

            if ($('.window-container img').length > 0) {
                $('.window-container img').each(function() {
                    $(this).attr('src', $(this).attr('src'));
                });
                $('.window-container').data('curImg', 0);
                $('.window-container img').load(function() {
                    var curImg = $('.window-container').data('curImg');
                    curImg++;
                    $('.window-container').data('curImg', curImg);
                    if ($('.window-container img').length == curImg) {
                        $('.window-container').removeClass('window-container-load');
                        windowPosition();
                    }
                });
            } else {
                $('.window-container').removeClass('window-container-load');
                windowPosition();
            }

            $(window).resize(function() {
                windowPosition();
            });

            $('.window-close').click(function(e) {
                windowClose();
                e.preventDefault();
            });

            $('body').on('keyup', function(e) {
                if (e.keyCode == 27) {
                    windowClose();
                }
            });

            $('.window form').each(function() {
                initForm($(this));
            });

            $(document).click(function(e) {
                if ($(e.target).hasClass('window')) {
                    windowClose();
                }
            });
        }
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}

var dateFormat = 'dd M yy';

function initOrderDates() {
    recalcCart();
}

