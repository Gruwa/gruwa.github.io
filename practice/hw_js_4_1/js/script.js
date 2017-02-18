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
        head.style.fontSize = '20px';
        head.style.maxWidth = '300px';
        head.classList.add('label', 'label-success');
        var content = document.createElement('div');
        wrapper.insertBefore(content, head.nextSibling);
        content.style.maxWidth = '300px';
        content.style.margin = "0px auto 0px auto";
        var testOl = document.createElement('ol');
        content.insertBefore(testOl, testOl.nextSibling);
        testOl.style.listStyleType = 'decimal';
        testOl.classList.add('list-group');
        var button = document.createElement('button');
        var textButton = document.createTextNode('Проверить мои результаты');
        button.appendChild(textButton);
        wrapper.insertBefore(button, content.nextSibling);
        button.style.display = "block";
        button.style.margin = "0px auto 0px auto";
        button.classList.add('btn', 'btn-primary');


        Test(this);
        TestCheckBox(this);

        function Test(obj) {
            for (var key in obj) {
                if (key == "creatTest") continue;
                var li = document.createElement('li');
                li.innerHTML = key;
                testOl.appendChild(li);
                li.appendChild(TestLi(obj[key]));
                function TestLi(obj2) {
                    var ul = document.createElement('ul');
                    ul.classList.add('list-group', 'clearfix:after');
                    for (var key in obj2) {
                        var li = document.createElement('li');
                        li.classList.add('list-group-item');
                        li.innerHTML = key;
                        ul.appendChild(li);
                    }
                    return ul;
                    }
                }

            }
        function TestCheckBox(obj) {
                var allLi = document.querySelectorAll('ul > li');
                for (var i = 0; i < allLi.length; i++) {
                    allLi[i].classList.add('listLi' + i);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "checkbox");
                    input.style.float = 'left';
                    allLi[i].insertAdjacentElement("beforeBegin", input);
                }


                var allInput = document.querySelectorAll('ul > input');
                for (var i = 0; i < allInput.length; i++) {
                    var classNameInput = allInput[i].className = 'listInput' + i;
                }

        }

    },

};

test.creatTest();
