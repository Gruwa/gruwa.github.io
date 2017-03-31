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
                    text: 'Вариант ответа №3',
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
                    text: 'Вариант ответа №3',
                    id: 404,
                    content: true,
                },
                405 : {
                    text: 'Вариант ответа №3',
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

                // function checkbox() {
                //     $('input:checked').change(function(event) {
                //         if ( $(event.target).parent('ul').find('input:checked').length == 2) {
                //             console.log($(event.target).parent('ul').find('input:checked').length);
                //             $(event.target).parent('ul').find('input:not(:checked)').attr('disabled', 'disabled');
                //         } if ( $(event.target).parent('ul').find('input:checked').length != 2) {
                //             $(event.target).parent('ul').find('input:not(:checked)').removeAttr('disabled');
                //         };
                //
                //     });
                // }
                //
                // checkbox();

                for (var key in $jsData) {

                }

                console.log(document.getElementById('101'));
                $('.buttonEndForm').click(function(event) {
                    // for (var i = 0; i < $('input:checked').length; i++) {
                    //         console.log($('input:checked'));
                    //         var k = $('input:checked')[i].id;
                            //
                            // - найти все инпуты
                            // - найти в них все чекнутые проверить по тру
                            // - найти все не чекнутые и проверить на фелс.
                            //
                            // ---
                            // найти все инпуты, проверяем по 1, если чекнутый тогда конт == труб если не чекнутый тогда конт == фелс , если все ок тогда победаб если нет тогда проигрыш
                            for (var key in $jsData) {
                                for (var key2 in $jsData[key]) {
                                    console.log($jsData[key][key2].content);
                                    var inputs = $('input');
                                    for (var i = 0; i < inputs.length; i++){
                                        console.log($('#'+inputs[i].id).parent().find('input:checked'));
                                        if ($('#'+inputs[i].id).parent().find('input:checked')[0] && $jsData[key][key2].content == true) {
                                            console.log('DFE');
                                        };

                                    };


                                };
                            };




                            // $jsData['Вопрос №1'[101[content]]] ===>
                            // $jsData['Вопрос №1'[inputs[i].id[content]]]

                    // try {
                    // for (var i = 0; i < $('input:checked').length; i++) {
                    //         console.log($('input:checked'));
                    //         var k = $('input:checked')[i].id;
                    //         $(k)
                    //         console.log(k);
                    //         if (k.content == false) {
                    //             var number = getRandom(4345, 6872)
                    //             function getRandom(min, max)
                    //                 {return parseInt(Math.random() * (max - min) + min);}
                    //             var textEndTest = 'Вы исчерпали свою удачу. <p>Ваш котел номер '+number+' за поворотом.</p> <p>УВАЖАЕМЫЕ, просьба картошку из котла НЕ ЖРАТЬ!</p>';
                    //             app.modalWindow(textEndTest);
                    //             return ;
                    //         };
                    //     };
                    //     var number = getRandom(776345, 956872)
                    //     function getRandom(min, max)
                    //         {return parseInt(Math.random() * (max - min) + min);}
                    //     var textEndTest = 'Поздравляем <p>Вы прошли '+number+' круг ада.</p> Надеемся в следующий раз Вам больше не повезет!';
                    //     app.modalWindow(textEndTest);
                        // $('input:checked')
                        // if ($('input:checked').find('selector')
                        //     // document.getElementById('listInput1').checked != false && document.getElementById('listInput5').checked != false && document.getElementById('listInput8').checked != false && document.getElementById('listInput0').checked != false && document.getElementById('listInput3').checked != false && document.getElementById('listInput7').checked != false
                        // ) {
                        //     var number = getRandom(776345, 956872)
                        //     function getRandom(min, max)
                        //         {return parseInt(Math.random() * (max - min) + min);}
                        //     var textEndTest = 'Поздравляем <p>Вы прошли '+number+' круг ада.</p> Надеемся в следующий раз Вам больше не повезет!';
                        //     app.modalWindow(textEndTest);
                        // } else {
                        //     var number = getRandom(4345, 6872)
                        //     function getRandom(min, max)
                        //         {return parseInt(Math.random() * (max - min) + min);}
                        //     var textEndTest = 'Вы исчерпали свою удачу. <p>Ваш котел номер '+number+' за поворотом.</p> <p>УВАЖАЕМЫЕ, просьба картошку из котла НЕ ЖРАТЬ!</p>';
                        //     app.modalWindow(textEndTest);
                        // }
                    // } finally {
                    //     $('input').removeAttr('disabled');
                    //     var inputArray = document.getElementsByTagName('input');
                    //     for (var i = 0; i < inputArray.length; i++) {
                    //         inputArray[i].checked = false;
                    //     }
                    // }

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
            }
        };

    app.logicalTest();




});
