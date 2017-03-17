'use strict';

(function($, undefined) {
    // start jcarousel
        $(function() {
            var $allPhoto = 10;

            photoGallary($allPhoto);

            function photoGallary(key) {
                var $html_elem = '', $k = "<li><img class='jcarousel_img'></li>";

                for (var i = 1; i <= key; i++) {
                    $('.jcarousel').find('ul').html($k).find('img:last').attr({src: './img/'+i+'.jpg', width: '640', height: '480'});
                    var $last = $('ul:last').html();
                    $html_elem += $last;
                };
                $('.jcarousel').find('ul').html($html_elem);
            }

            $('.jcarousel').jcarousel();

            $('.jcarousel')
                .jcarousel('reload', {
                    animation: 400
                })
                .jcarousel({
                    wrap: 'both'
                });

            $('.jcarousel-prev').click(function() {
                $('.jcarousel').jcarousel('scroll', '-=1');
            });

            $('.jcarousel-next').click(function() {
                $('.jcarousel').jcarousel('scroll', '+=1');
            });

        });
    // end jcarousel

    // start ikSelect
        $(function functionName() {
            $('select').ikSelect();
        })
    // end ikSelect

    // start checkbox_jquery
        $(function() {
            $(".niceCheck").each(
            /* при загрузке страницы меняем обычные на стильные checkbox */
            function() {

             changeCheckStart($(this));

            });

            function changeCheck(el)
            /*
            функция смены вида и значения чекбокса при клике на контейнер чекбокса (тот, который отвечает за новый вид)
            el - span контейнер для обычного чекбокса
            input - чекбокс
            */
            {

            var el = el,
                input = el.find("input").eq(0);

            if(el.attr("class").indexOf("niceCheckDisabled")==-1)
            {
                if(!input.attr("checked")) {
                    el.addClass("niceChecked");
                    input.attr("checked", true);
                } else {
                    el.removeClass("niceChecked");
                    input.attr("checked", false).focus();
                }
            }

            return true;
            }

            function changeVisualCheck(input)
            {
            /*
            меняем вид чекбокса при смене значения
            */
            var wrapInput = input.parent();
            if(!input.attr("checked")) {
                wrapInput.removeClass("niceChecked");
            }
            else
            {
                wrapInput.addClass("niceChecked");
            }
            }

            function changeCheckStart(el)
            /*
            новый чекбокс выглядит так <span class="niceCheck"><input type="checkbox" name="[name check]" id="[id check]" [checked="checked"] /></span>
            новый чекбокс получает теже name, id и другие атрибуты что и были у обычного
            */
            {

            try
            {
            var el = el,
            checkName = el.attr("name"),
            checkId = el.attr("id"),
            checkChecked = el.attr("checked"),
            checkDisabled = el.attr("disabled"),
            checkTab = el.attr("tabindex"),
            checkValue = el.attr("value");
            if(checkChecked)
                el.after("<span class='niceCheck niceChecked'>"+
                    "<input type='checkbox'"+
                    "name='"+checkName+"'"+
                    "id='"+checkId+"'"+
                    "checked='"+checkChecked+"'"+
                    "value='"+checkValue+"'"+
                    "tabindex='"+checkTab+"' /></span>");
            else
                el.after("<span class='niceCheck'>"+
                    "<input type='checkbox'"+
                    "name='"+checkName+"'"+
                    "id='"+checkId+"'"+
                     "value='"+checkValue+"'"+
                    "tabindex='"+checkTab+"' /></span>");

            /* если checkbox disabled - добавляем соотвсмтвующи класс для нужного вида и добавляем атрибут disabled для вложенного chekcbox */
            if(checkDisabled)
            {
                el.next().addClass("niceCheckDisabled");
                el.next().find("input").eq(0).attr("disabled","disabled");
            }

            /* цепляем обработчики стилизированным checkbox */
            el.next().bind("mousedown", function(e) { changeCheck(jQuery(this)) });
            el.next().find("input").eq(0).bind("change", function(e) { changeVisualCheck(jQuery(this)) });
            if(jQuery.browser.msie)
            {
                el.next().find("input").eq(0).bind("click", function(e) { changeVisualCheck(jQuery(this)) });
            }
            el.remove();
            }
            catch(e)
            {
            // если ошибка, ничего не делаем
            }

            return true;
            }
        });
    // end checkbox_jquery

    // start menu_jquery
        $(function () {
            var $nav = {
                data : 'nav',
                tagName : 'nav',
                className : ['main_menu_jquery', 'nav'],
            };
            var $ul_menu_jq = {
                data : 'menu_jq',
                tagName : 'ul',
                className : ['menu_jq', 'clearfix'],
            };
            var $ul_sub__menu_jq0 = {
                data : 'sub__menu_jq0',
                tagName : 'ul',
                className : ['sub__menu_jq', 'sub__menu_jq0'],
            };
            var $ul_sub__menu_jq1 = {
                data : 'sub__menu_jq1',
                tagName : 'ul',
                className : ['sub__menu_jq', 'sub__menu_jq1'],
            };
            var $ul_sub__menu_jq2 = {
                data : 'sub__menu_jq2',
                tagName : 'ul',
                className : ['sub__menu_jq', 'sub__menu_jq2'],
            };
            var $li_dropdown_jq0 = {
                quantity : '5',
                data : 'dropdown_jq0',
                tagName : 'li',
                className : ['dropdown_jq', 'dropdown_jq0'],
            };
            var $li_dropdown_jq1 = {
                quantity : '6',
                data : 'dropdown_jq1',
                tagName : 'li',
                className : ['dropdown_jq', 'dropdown_jq1'],
            };
            var $li_dropdown_jq2 = {
                quantity : '5',
                data : 'dropdown_jq2',
                tagName : 'li',
                className : ['dropdown_jq', 'dropdown_jq2'],
            };
            var $li_dropdown_jq3 = {
                quantity : '4',
                data : 'dropdown_jq3',
                tagName : 'li',
                className : [''],
            };
            var $a = {
                data : 'a_jq',
                tagName : 'a',
                content : 'Nav',
                href : '#',
            };

            var $nav_jq = new createElement($nav);

            menu($ul_menu_jq, $li_dropdown_jq0, $ul_menu_jq.className[0], 3);
            menu($ul_sub__menu_jq0, $li_dropdown_jq1, $ul_sub__menu_jq0.className[1], 2);
            menu($ul_sub__menu_jq1, $li_dropdown_jq2, $ul_sub__menu_jq1.className[1], 5);
            menu($ul_sub__menu_jq2, $li_dropdown_jq3);

            function menu( ul, list, location, numberLi ) {
                var $menu_jq = new createElement(ul);
                var $menu_jq_li = creatLi(list, $menu_jq, list.quantity);
                var z = $( '.'+location ).find( 'li:nth-child('+numberLi+')' )[0];
                $(z).addClass( ''+list.className[0]+' '+list.className[1]+'' );
            };

            var $menu_jq_li_a = new createElement($a);

            function creatLi(key, location, number) {
                for (var i = 0; i < number; i++) {
                    $(location).append(new createElement(key));
                };
            };
            function createElement(key) {
                var $element = document.createElement(key.tagName);

                if (key.content) {
                    $element.innerHTML = key.content;
                 };

                 appendElement( $nav.data, 'header' );
                 appendElement( $ul_menu_jq.data, $nav.className[0] );
                 appendElement( $ul_sub__menu_jq0.data, $li_dropdown_jq0.className[1] );
                 appendElement( $ul_sub__menu_jq1.data, $li_dropdown_jq1.className[1] );
                 appendElement( $ul_sub__menu_jq2.data, $li_dropdown_jq2.className[1] );

                 function appendElement( elem, location ) {
                     if ( key.data == ''+elem+'' ) {
                         $('.'+location).append($element);
                         $element.classList.add( key.className[0], key.className[1] );
                      };
                 };

                if ( key.data == 'a_jq' ) {
                    $('.menu_jq').find('li').append($element).find('a').attr('href', key.href);
                 };

                return $element;
            }

            data();

            function data() {
                $('.main_menu_jquery').css({
                    'background-color' : '#FF6464',
                    'margin-bottom' : '50px',
                });
                $('.menu_jq').css({
                    'max-width' : '400px',
                    'margin' : '0 auto',
                });
                $('.menu_jq > li').css({
                    'display': 'block',
                    'float': 'left',
                    'margin': '5px 0 6px 0px',
                    'height': '26px',
                    'width' : '70px',
                    'text-align' : 'center',
                });
                $('.menu_jq > li a').css({
                    'font-size': '12px',
                });
                $('.menu_jq li a').css({
                    'font-family': "'Ubuntu', sans-serif",
                    'color': '#ffffff',
                });
                $('.dropdown_jq').css({
                    'position': 'relative',
                });
                $('.sub__menu_jq li').css({
                    'width': '77px',
                    'padding': '5px 20px 5px 10px',
                    'background-color': '#FF6464',
                    'margin-top': '1px',
                    'margin-bottom': '1px',
                    'text-align' : 'left',
                });
                $('.sub__menu_jq').css({
                    'position': 'absolute',
                    'padding-top': '0',
                    'z-index': '1',
                });
                $('.sub__menu_jq0').css({
                    'top': '27px',
                    '-webkit-box-shadow': '1px 5px 7px 2px #383838',
                    'box-shadow': '1px 5px 7px 2px #383838',
                });
                $('.sub__menu_jq1').css({
                    'top': '2px',
                    'left': '97px',
                    '-webkit-box-shadow': '1px 5px 7px 2px #383838',
                    'box-shadow': '1px 5px 7px 2px #383838',
                });
                $('.sub__menu_jq2').css({
                    'top': '-30px',
                    'left': '97px',
                    '-webkit-box-shadow' : '1px 5px 7px 2px #383838',
                    'box-shadow' : '1px 5px 7px 2px #383838',
                });

                $('.sub__menu_jq0 li').hover(function(event) {
                        $(event.target).animate({backgroundColor: '#FF6464', backgroundColor: '#E14B4B'}, 'slow');
                    }, function() {
                        $(event.target).animate({backgroundColor: '#E14B4B', backgroundColor: '#FF6464'}, 'fast');
                });
                $('.sub__menu_jq').animate({ 'opacity': 'hide'});
                $('.dropdown_jq0').hover(function() {
                        $('.sub__menu_jq0').animate({ 'opacity': 'show', });
                    },
                     function() {
                        $('.sub__menu_jq0').animate({ 'opacity': 'hide'});
                });
                $('.dropdown_jq1').hover(function() {
                        $('.sub__menu_jq1').animate({ 'opacity': 'show', });
                    },
                     function() {
                        $('.sub__menu_jq1').animate({ 'opacity': 'hide'});
                });
                $('.dropdown_jq2').hover(function() {
                        $('.sub__menu_jq2').animate({ 'opacity': 'show', });
                    },
                     function() {
                        $('.sub__menu_jq2').animate({ 'opacity': 'hide'});
                });
            }

        });
    // end menu_jquery

    // start menu_js
    var js_nav = {
        data : 'nav',
        tagName : 'nav',
        className : ['main_menu_js', 'nav'],
    };
    var js_ul_menu = {
        data : 'menu_js',
        tagName : 'ul',
        className : ['menu_js', 'clearfix'],
    };
    var js_ul_sub__menu_js0 = {
        data : 'sub__menu_js0',
        tagName : 'ul',
        className : ['sub__menu_js', 'sub__menu_js0'],
    };
    var js_ul_sub__menu_js1 = {
        data : 'sub__menu_js1',
        tagName : 'ul',
        className : ['sub__menu_js', 'sub__menu_js1'],
    };
    var js_ul_sub__menu_js2 = {
        data : 'sub__menu_js2',
        tagName : 'ul',
        className : ['sub__menu_js', 'sub__menu_js2'],
    };
    var js_li_dropdown_js0 = {
        quantity : '5',
        data : 'dropdown_js0',
        tagName : 'li',
        className : ['dropdown_js', 'dropdown_js0'],
    };
    var js_li_dropdown_js1 = {
        quantity : '6',
        data : 'dropdown_js1',
        tagName : 'li',
        className : ['dropdown_js', 'dropdown_js1'],
    };
    var js_li_dropdown_js2 = {
        quantity : '5',
        data : 'dropdown_js2',
        tagName : 'li',
        className : ['dropdown_js', 'dropdown_js2'],
    };
    var js_li_dropdown = {
        quantity : '4',
        data : 'dropdown_js3',
        tagName : 'li',
        className : [''],
    };
    var js_a = {
        data : 'a_js',
        tagName : 'a',
        content : 'Nav',
        href : '#',
    };

        var nav_js = new createElement_js(js_nav);

        menu_js(js_ul_menu_js, js_li_dropdown_js0, js_ul_menu.className[0], 3);
        menu_js(js_ul_sub__menu_js0, js_li_dropdown_js1, js_ul_sub__menu_js0.className[1], 2);
        menu_js(js_ul_sub__menu_js1, js_li_dropdown_js2, js_ul_sub__menu_js1.className[1], 5);
        menu_js(js_ul_sub__menu_js2, js_li_dropdown_js3);

        function menu_js( ul, list, location, numberLi ) {
                    var $menu_jq = new createElement_js(ul);
                    var $menu_jq_li = creatLi_js(list, $menu_jq, list.quantity);
                    // var z = $( '.'+location ).find( 'li:nth-child('+numberLi+')' )[0];
                    // $(z).addClass( ''+list.className[0]+' '+list.className[1]+'' );

                    var zx = document.getElementsByClassName('.'+location);
                    var xz = zx.getElementsByClassName( 'li:nth-child('+numberLi+')' )[0];
                    xz.classList.add( ''+list.className[0]+' '+list.className[1]+'' );
                };

        var js_menu_js_li_a = new createElement_js(js_a);

        function creatLi_js(key, location, number) {
            for (var i = 0; i < number; i++) {
                // $(location).append(new createElement_js(key));
                var k = document.getElementsByClassName(location);
                k.append(new createElement_js(key));
                // document.
            };
        };

        function createElement_js(key) {
            var element_js = document.createElement(key.tagName);

            if (key.content) {
                element_js.innerHTML = key.content;
             };

             appendElement_js( js_nav.data, 'header' );
             appendElement_js( js_ul_menu.data, js_nav.className[0] );
             appendElement_js( js_ul_sub__menu_js0.data, js_li_dropdown_js0.className[1] );
             appendElement_js( js_ul_sub__menu_js1.data, js_li_dropdown_js1.className[1] );
             appendElement_js( js_ul_sub__menu_js2.data, js_li_dropdown_js2.className[1] );

             function appendElement_js( elem, location ) {
                 if ( key.data == ''+elem+'' ) {
                    //  $('.'+location).append(element_js);

                    // ТУУУУТТТТТ
                    var nameChild = document.getElementsByClassName(location);
                    nameChild.insertBefore(element_js);
                    element_js.classList.add( key.className[0], key.className[1] );
                  };
             };

            if ( key.data == 'a_js' ) {
                $('.menu_js').find('li').append(element_js).find('a').attr('href', key.href);
             };

            return element_js;
        }

    // end menu_js

})(jQuery);
