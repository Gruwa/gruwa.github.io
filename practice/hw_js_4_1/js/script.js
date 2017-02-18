'use strict';
var test = {
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
    creatTest: function(){
        var body = document.body;
        var wrapper = document.createElement('div');
        body.insertBefore(wrapper, wrapper.nextSibling);
        wrapper.style.maxWidth = '1024px';
        wrapper.style.margin = "0px auto 0px auto";
        wrapper.style.backgroundColor = 'white';
        wrapper.style.padding = '30px';
        var head = document.createElement('p');
        wrapper.insertBefore(head, head.nextSibling);
        head.innerHTML = 'Тест по программированию';
        head.style.textAlign = 'center';
        head.style.fontSize = '20px';
        var content = document.createElement('div');
        wrapper.insertBefore(content, head.nextSibling);
        content.display = "block";
        content.style.maxWidth = '300px';
        content.style.margin = "0px auto 0px auto";
        var testOl = document.createElement('ol');
        content.insertBefore(testOl, testOl.nextSibling);
        var button = document.createElement('button');
        var textButton = document.createTextNode('Проверить мои результаты');
        button.appendChild(textButton);
        wrapper.insertBefore(button, content.nextSibling);

        Test(this);
        function Test(obj) {
            for (var key in obj) {
                if (key == "creatTest") continue;
                var li = document.createElement('li');
                li.innerHTML = key;
                testOl.appendChild(li);
                li.appendChild(TestLi(obj[key]));
                function TestLi(obj2) {
                    var ul = document.createElement('ul');
                    for (var key in obj2) {
                        var li = document.createElement('li');
                        li.innerHTML = key;
                        ul.appendChild(li);
                    }
                    return ul;
                }
            }
        }

    },

};

test.creatTest();
