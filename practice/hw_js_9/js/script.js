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
            var $nav_jq = $('header').append(createElement('nav'));
            var $menu = $('.main_menu_jquery').append(createElement('ul'));
            $menu.className = 'menu_jq, clearfix';

            for (var i = 0; i < 5; i++) {
                var $li_menu = $($men).append(createElement('li'));
            }



            function createElement(key) {
                var $element = document.createElement(key);
                if ( key == 'nav' ) {$element.className = 'main_menu_jquery'};
                if (key == 'li' && $(key).find('ul')) {$element.className = 'dropdown_jq';};
                // if (key == 'li' && $(key).parent($menu)) {$($menu).append($element);};
                // if (key == 'a') {$element.attr({'href':'#', 'content':'Nav'})};
                return $element;
            }
        });
    // end menu_jquery

})(jQuery);
