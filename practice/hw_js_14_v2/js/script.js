// весь изменяемый контент должен хранится в чётко определённых полях
// структура данных должна быть удобна для обработки

$(function() {

    'use strict';

// Server

    var $ServerData = [
    {
    id: 110,
    text: "Текст вопроса 1",
    answers: [
            {
            id: 111,
            text: "Ответ 1 на вопрос 1",
            correct: true
            },
            {
            id: 112,
            text: "Ответ 2 на вопрос 1",
            correct: false
            },
            {
            id: 113,
            text: "Ответ 3 на вопрос 1",
            correct: false
            },
        ]
    },
    {
    id: 120,
    text: "Текст вопроса 2",
    answers: [
            {
            id: 121,
            text: "Ответ 1 на вопрос 2",
            correct: false
            },
            {
            id: 122,
            text: "Ответ 2 на вопрос 2",
            correct: true
            },
            {
            id: 123,
            text: "Ответ 3 на вопрос 2",
            correct: true
            },
        ]
    },
    {
    id: 130,
    text: "Текст вопроса 3",
    answers: [
            {
            id: 131,
            text: "Ответ 1 на вопрос 3",
            correct: false
            },
            {
            id: 132,
            text: "Ответ 2 на вопрос 3",
            correct: true
            },
            {
            id: 133,
            text: "Ответ 3 на вопрос 3",
            correct: false
            },
        ]
    },
];

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

                $('.buttonEndForm').click(function(event) {
                    for (var i = 0; i < $jsData.length; i++) {
                        var $answers = $jsData[i].answers;
                        for (var j = 0; j < $answers.length; j++) {
                            if ( $('#'+$answers[j].id).parent().find('input:checked')[0] && $answers[j].correct != true) {
                                    var number = getRandom(4345, 6872);
                                    var textEndTest = 'Вы исчерпали свою удачу. <p>Ваш котел номер '+number+' за поворотом.</p> <p>УВАЖАЕМЫЕ, просьба картошку из котла НЕ ЖРАТЬ!</p>';

                                    function getRandom(min, max) {
                                        return parseInt(Math.random() * (max - min) + min);
                                    }

                                    app.modalWindow(textEndTest);
                                    return ;
                                }; 
                                if ( $answers[j].correct == true && $('#'+$answers[j].id).parent().find('input:checked')[0] == undefined) {
                                    var number = getRandom(4345, 6872);
                                    var textEndTest = 'Вы исчерпали свою удачу. <p>Ваш котел номер '+number+' за поворотом.</p> <p>УВАЖАЕМЫЕ, просьба картошку из котла НЕ ЖРАТЬ!</p>';

                                    function getRandom(min, max) {
                                        return parseInt(Math.random() * (max - min) + min);
                                    }

                                    app.modalWindow(textEndTest);
                                    return ;
                                };

                        };
                    };

                    var number = getRandom(776345, 956872);
                    var textEndTest = 'Поздравляем <p>Вы прошли '+number+' круг ада.</p> Надеемся в следующий раз Вам больше не повезет!';

                    app.modalWindow(textEndTest);

                    function getRandom(min, max){
                        return parseInt(Math.random() * (max - min) + min);
                    }

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
                };
            },
        };

    app.logicalTest();

});
