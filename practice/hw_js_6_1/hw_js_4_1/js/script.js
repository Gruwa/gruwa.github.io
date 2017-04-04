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

            var div = {
                tagName : 'div',
                className : ['wrapper'],
            };

            var head = {
                tagName : 'p',
                className : ['header', 'page-header'],
                content : 'Тест по программированию',
            };
            var content = {
                tagName : 'content',
                className : ['content'],
            };
            var button = {
                tagName : 'button',
                className : ['btn', 'btn-primary', 'button'],
            };
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

            var box = new createElement(div);
            document.body.insertBefore(box, box.nextSibling);
            var elem = new createElement(head);
            box.insertBefore(elem, elem.nextSibling);
            var content = new createElement(content);
            box.insertBefore(content, content.nextSibling);
            elem = new createElement(button);
            box.insertBefore(elem, elem.nextSibling);

            console.log(elem);
            console.log(input.tagName);


            function createElement(config) {
              var element = document.createElement(config.tagName);

              if (config.className) {
                  for (var i = 0; i < config.className.length; i++) {
                     element.classList.add(config.className[i]);
                 };

              };

              if (config.content) {
                element.innerHTML = config.content;
                };

              if (config.tagName == 'button') {
                  var textButton = document.createTextNode('Проверить мои результаты');
                  element.appendChild(textButton);
              };

              if (config.tagName == 'INPUT') {
                  element.setAttribute("type", "checkbox");
              };


              return element;
            }

            Test(data);
            TestCheckBox(app);

            function Test(obj) {
                for (var key in obj) {
                    var olList = new createElement(ol);
                    content.insertBefore(olList, olList.nextSibling);
                    var liList = new createElement(li);
                    liList.innerHTML = key; console.log(key);
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
                            allInput[i].classList.add('listInput' + i);
                        }

                }
        }
    }


app.creatTest();

// var listElement = {
//             div: {
//                 'tagName' : {'div' : {}},
//                 'className' : {'wrapper' : {}},
//             },
//             head: {
//                 'tagName' : {'p' : {}},
//                 'className' : {'header' : {}, 'page-header' : {}},
//                 'content' : {'Тест по программированию' : {}},
//             },
//             content: {
//                 'tagName' : {'content' : {}},
//                 'className' : {'content' : {}},
//             },
//             button: {
//                 'tagName' : {'button' : {}},
//                 'className' : {'btn' : {}, 'btn-primary' : {}, 'button' : {}},
//             },
//             ol: {
//                 'tagName' : {'ol' : {}},
//                 'className' : {'list-group' : {}, 'testOl' : {}},
//             },
//             ul: {
//                 'tagName' : {'ul' : {}},
//                 'className' : {'list-group' : {}, 'clearfix:after' : {}},
//             },
//             li: {
//                 'tagName' : {'li' : {}},
//                 'className' : {'list-group-item' : {}},
//             },
//             input: {
//                 'tagName' : {'input' : {}},
//                 'className' : {'input' : {}},
//             },
// }
