$(function() {

    'use strict';

// Server
    var $ServerData = {
            'Вопрос №1' : {
                'Вариант ответа №1' : {},
                'Вариант ответа №2' : {},
                'Вариант ответа №3' : {},
            },
            'Вопрос №2' : {
                'Вариант ответа №1' : {},
                'Вариант ответа №2' : {},
                'Вариант ответа №3' : {},
            },
            'Вопрос №3' : {
                'Вариант ответа №1' : {},
                'Вариант ответа №2' : {},
                'Вариант ответа №3' : {},
            },
    };

    var $Server = JSON.stringify($ServerData);
// end Server

    var $jsData;
    try {
        localStorage.setItem('test', $Server);

        var $testData = localStorage.getItem('test');

        $jsData = JSON.parse($testData);

        } catch (e) {
            $jsData = JSON.parse($Server);
    }

    var $html = $('#testForm').html();

    var $data = {
         head : 'Тест по программированию',
    };

    var $testContent = tmpl($html, $data);

    $('body').append($testContent);

    var app = {
            creatTest: function(){
                var ol = {
                    tagName : 'ol',
                    className : ['list-group', 'testOl'],
                };
                var ul = {
                    tagName : 'ul',
                    className : ['list-group', 'clearfix'],
                };
                var li = {
                    tagName : 'li',
                    className : ['list-group-item'],
                };
                var input = {
                    tagName : 'INPUT',
                    className : ['input'],
                };

                Test($jsData);

                TestCheckBox(app);

                function createElement(config) {
                      var element = document.createElement(config.tagName);

                      if (config.className) {
                          for (var i = 0; i < config.className.length; i++) {
                             element.classList.add(config.className[i]);
                         };

                      };
                      if (config.tagName == 'INPUT') {
                          element.setAttribute("type", "checkbox");
                      };
                      return element;
                }

                function Test(obj) {
                    for (var key in obj) {
                        var olList = new createElement(ol);
                        document.getElementsByClassName('content')[0].appendChild(olList);
                        var liList = new createElement(li);
                        liList.innerHTML = key;
                        olList.appendChild(liList);
                        liList.appendChild(TestLi(obj[key]));
                        function TestLi(obj2) {
                            var ulList = new createElement(ul);
                            for (var key in obj2) {
                                var liList2 = new createElement(li);
                                liList2.innerHTML = key;
                                ulList.appendChild(liList2);
                            };
                            return ulList;
                                }
                        };

                    }
                    function TestCheckBox(obj) {
                            var allLi = document.querySelectorAll('ul > li');
                            for (var i = 0; i < allLi.length; i++) {
                                allLi[i].classList.add('listLi' + i);
                                var inputList = new createElement(input);
                                allLi[i].insertAdjacentElement("beforeBegin", inputList);
                            };
                            var allInput = document.querySelectorAll('ul > input');
                            for (var i = 0; i < allInput.length; i++) {
                                allInput[i].id = ('listInput' + i);
                            };

                    }
            },

            logicalTest: function(){

                function checkbox(master, firstLow, secondLow) {
                    $(master).change(function(event) {
                        if (event.target == $(master) || document.getElementById(master.id).checked != false){
                            $(firstLow).attr('disabled', 'disabled');
                            $(secondLow).attr('disabled', 'disabled');
                        } if (event.target == $(master) || document.getElementById(master.id).checked == false){
                            $(firstLow).removeAttr('disabled');
                            $(secondLow).removeAttr('disabled');
                        };
                    });
                }
                checkbox(listInput0, listInput1, listInput2);
                checkbox(listInput1, listInput0, listInput2);
                checkbox(listInput2, listInput1, listInput0);
                checkbox(listInput3, listInput4, listInput5);
                checkbox(listInput4, listInput3, listInput5);
                checkbox(listInput5, listInput4, listInput3);
                checkbox(listInput6, listInput7, listInput8);
                checkbox(listInput7, listInput6, listInput8);
                checkbox(listInput8, listInput7, listInput6);

                $('.buttonEndForm').click(function(event) {
                    try {
                        if (document.getElementById('listInput1').checked != false && document.getElementById('listInput5').checked != false && document.getElementById('listInput8').checked != false ) {
                            $('.modal-content').html('Поздравляем Вы прошли 876345 круг ада. Надеемся в следующий раз Вам не повезет больше!');
                        } else {
                            $('.modal-content').html('Вы исчерпали свою удачу. <p>Ваш котел номер 5429  за 15 поворотом.</p> <p>УВАЖАЕМЫЕ просьба картошку из котла НЕ ЖРАТЬ!</p>');
                        }
                    } finally {
                        $('input').removeAttr('disabled');
                        var inputArray = document.getElementsByTagName('input');
                        for (var i = 0; i < inputArray.length; i++) {
                            inputArray[i].checked = false;
                        }
                    }

                });


            }
        };


    app.creatTest();
    app.logicalTest();



});
