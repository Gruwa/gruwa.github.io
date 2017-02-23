'use strict';

var data = {
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
    }

var app = {
        creatTest: function(){
            var ListElement = {
                'div' : {'wrapper'},
                'p' : {'page-header', 'header'},
                'div' : {'content'},
                'ol' : {'list-group', 'testOl'},
                'button' : {'btn', 'btn-primary', 'button'}
            }
            function DomElements() {
                var element = document.createElement('div');
                document.body.insertBefore(element, element.nextSibling);
                element.classList.add('wrapper');
            }
            var wrapper = document.createElement('div');
            document.body.insertBefore(wrapper, wrapper.nextSibling);
            wrapper.classList.add('wrapper');
            var head = document.createElement('p');
            wrapper.insertBefore(head, head.nextSibling);
            head.innerHTML = 'Тест по программированию';
            head.classList.add('page-header', 'header');
            var content = document.createElement('div');
            wrapper.insertBefore(content, head.nextSibling);
            content.classList.add('content');
            var testOl = document.createElement('ol');
            content.insertBefore(testOl, testOl.nextSibling);
            testOl.classList.add('list-group', 'testOl');
            var button = document.createElement('button');
            var textButton = document.createTextNode('Проверить мои результаты');
            button.appendChild(textButton);
            wrapper.insertBefore(button, content.nextSibling);
            button.classList.add('btn', 'btn-primary', 'button');

            Test(data);
            TestCheckBox(app);

            function Test(obj) {
                for (var key in obj) {
                    var li = document.createElement('li');
                    li.innerHTML = key;
                    testOl.appendChild(li);
                    li.appendChild(TestLi(obj[key]));
                    function TestLi(obj2) {
                        var ul = document.createElement('ul');
                        ul.classList.add('list-group', 'clearfix:after');
                        ul.style.marginTop = '10px';
                        ul.style.marginBottom = '10px';
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
                        input.style.marginRight = '5px';
                    }
                    var allInput = document.querySelectorAll('ul > input');
                    for (var i = 0; i < allInput.length; i++) {
                        var classNameInput = allInput[i].className = 'listInput' + i;
                    }

            }

        },

}

app.creatTest();
