$(function() {

    'use strict';

// Server
    var $ServerData = {
            'Вопрос №1' : {
                101 : {
                    text: 'Вариант ответа №1',
                    id: 101,
                    content: false,
                },
                102 : {
                    text: 'Вариант ответа №2',
                    id: 102,
                    content: true,
                },
                103 : {
                    text: 'Вариант ответа №3',
                    id: 103,
                    content: true,
                },
            },
            'Вопрос №2' : {
                201 : {
                    text: 'Вариант ответа №1',
                    id: 201,
                    content: true,
                },
                202 : {
                    text: 'Вариант ответа №2',
                    id: 202,
                    content: false,
                },
                203 : {
                    text: 'Вариант ответа №3',
                    id: 203,
                    content: true,
                },
                204 : {
                    text: 'Вариант ответа №4',
                    id: 204,
                    content: true,
                },
            },
            'Вопрос №3' : {
                301 : {
                    text: 'Вариант ответа №1',
                    id: 301,
                    content: true,
                },
                302 : {
                    text: 'Вариант ответа №2',
                    id: 302,
                    content: false,
                },
            },
            'Вопрос №4' : {
                401 : {
                    text: 'Вариант ответа №1',
                    id: 401,
                    content: true,
                },
                402 : {
                    text: 'Вариант ответа №2',
                    id: 402,
                    content: false,
                },
                403 : {
                    text: 'Вариант ответа №3',
                    id: 403,
                    content: false,
                },
                404 : {
                    text: 'Вариант ответа №4',
                    id: 404,
                    content: true,
                },
                405 : {
                    text: 'Вариант ответа №5',
                    id: 405,
                    content: true,
                },
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
         $jsData: $jsData,
    };

    var $testContent = tmpl($html, $data);

    $('body').append($testContent);

    var app = {

            logicalTest: function(){

                console.log(document.getElementById('101'));
                $('.buttonEndForm').click(function(event) {

                    for (var key in $jsData) {
                        for (var key2 in $jsData[key]) {
                            console.log($jsData[key][key2].content);
                            var inputs = $jsData[key][key2].id;
                            console.log($('#'+inputs).length);
                            console.log( $('#'+inputs).parent().find('input:checked')[0] );
                            for (var i = 0; i < $('#'+inputs).parent().find('input').length; i++){
                                if ( $('#'+inputs).parent().find('input:checked')[0] &&
                                $jsData[key][key2].content != true) {
                                    var number = getRandom(4345, 6872)
                                    function getRandom(min, max) {
                                        return parseInt(Math.random() * (max - min) + min);
                                    }
                                    var textEndTest = 'Вы исчерпали свою удачу. <p>Ваш котел номер '+number+' за поворотом.</p> <p>УВАЖАЕМЫЕ, просьба картошку из котла НЕ ЖРАТЬ!</p>';
                                    app.modalWindow(textEndTest);
                                    return ;
                                };
                                if ( $jsData[key][key2].content == true && $('#'+inputs).parent().find('input:checked')[0] == undefined) {
                                    var number = getRandom(4345, 6872)
                                    function getRandom(min, max) {
                                        return parseInt(Math.random() * (max - min) + min);
                                    }
                                    var textEndTest = 'Вы исчерпали свою удачу. <p>Ваш котел номер '+number+' за поворотом.</p> <p>УВАЖАЕМЫЕ, просьба картошку из котла НЕ ЖРАТЬ!</p>';
                                    app.modalWindow(textEndTest);
                                    return ;
                                };
                            };
                        };
                    };

                    var number = getRandom(776345, 956872)
                    function getRandom(min, max)
                        {return parseInt(Math.random() * (max - min) + min);}
                    var textEndTest = 'Поздравляем <p>Вы прошли '+number+' круг ада.</p> Надеемся в следующий раз Вам больше не повезет!';
                    app.modalWindow(textEndTest);
                    return ;
                });
            },

            modalWindow: function(key) {
                $('.backgroundModal')[0].style.display = "block";
                $('.windowModal').html(key);
                $('.windowModal').animate({top: '50%'}, '10900');
                $('.backgroundModal').one('click', function(event) {
                    $('.backgroundModal')[0].style.display = "none";
                    $('.windowModal').animate({top: '-150%'}, 'fast');
                });
                var inputArray = document.getElementsByTagName('input');
                for (var i = 0; i < inputArray.length; i++) {
                    inputArray[i].checked = false;
                }
            },
        };

    app.logicalTest();

});
