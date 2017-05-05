// весь изменяемый контент должен хранится в чётко определённых полях
// структура данных должна быть удобна для обработки

$(function () {

    'use strict';

// Server

    let $ServerData = [
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

    const $Server = JSON.stringify($ServerData);
// end Server


    let $jsData;
    try {
        localStorage.setItem('test', $Server);

        let $testData = localStorage.getItem('test');

        $jsData = JSON.parse($testData);

        } catch (e) {
            $jsData = JSON.parse($Server);
    }

    let $html = $('#testForm').html();

    let $data = {
         head : 'Тест по программированию',
         $jsData: $jsData,
    };

    let $testContent = tmpl($html, $data);

    $('body').append($testContent);

    let app = {

            logicalTest: function(){

                $('.buttonEndForm').click(function(event) {
                    for (let i = 0; i < $jsData.length; i++) {
                        let $answers = $jsData[i].answers;
                        for (let j = 0; j < $answers.length; j++) {
                            if ( $('#'+$answers[j].id).parent().find('input:checked')[0] && $answers[j].correct != true) {
                                    let number = getRandom(4345, 6872);
                                    let textEndTest = 'Вы исчерпали свою удачу. <p>Ваш котел номер '+number+' за поворотом.</p> <p>УВАЖАЕМЫЕ, просьба картошку из котла НЕ ЖРАТЬ!</p>';

                                    function getRandom(min, max) {
                                        return parseInt(Math.random() * (max - min) + min);
                                    }

                                    app.modalWindow(textEndTest);
                                    return ;
                                };
                                if ( $answers[j].correct == true && $('#'+$answers[j].id).parent().find('input:checked')[0] == undefined) {
                                    let number = getRandom(4345, 6872);
                                    let textEndTest = 'Вы исчерпали свою удачу. <p>Ваш котел номер '+number+' за поворотом.</p> <p>УВАЖАЕМЫЕ, просьба картошку из котла НЕ ЖРАТЬ!</p>';

                                    function getRandom(min, max) {
                                        return parseInt(Math.random() * (max - min) + min);
                                    }

                                    app.modalWindow(textEndTest);
                                    return ;
                                };

                        };
                    };

                    let number = getRandom(776345, 956872);
                    let textEndTest = 'Поздравляем <p>Вы прошли '+number+' круг ада.</p> Надеемся в следующий раз Вам больше не повезет!';

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

                let inputArray = document.getElementsByTagName('input');

                for (let i = 0; i < inputArray.length; i++) {
                    inputArray[i].checked = false;
                };
            },
        };

    app.logicalTest();

});
