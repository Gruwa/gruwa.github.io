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
                className : 'wrapper',
            };

            var head = {
                tagName : 'p',
                className : ('header', 'page-header'),
                content : ('Тест по программированию'),
            };
            var content = {
                tagName : 'content',
                className : 'content',
            };
            var button = {
                tagName : 'button',
                className : ['btn', 'btn-primary', 'button'],
            };
            var ol = {
                tagName : 'ol',
                className : ('list-group', 'testOl'),
            };
            var ul = {
                tagName : 'ul',
                className : ('list-group', 'clearfix:after'),
            };
            var li = {
                tagName : 'li',
                className : 'list-group-item',
            };
            var input = {
                tagName : 'input',
                className : 'input',
            };


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


            var elem = new createElement(button);
                        console.log(elem);

            function createElement(config) {
              var element = document.createElement(config.tagName);

              if (config.className) {
                  for (var i = 0; i < config.className.length; i++) {
                     element.classList.add(config.className[i]);
                  }

              }

              if (config.content) {
                element.innerHTML = config.content;
              }

              if (config.tagName == 'button') {
                  var textButton = document.createTextNode('Проверить мои результаты');
                  element.appendChild(textButton);
              }

              return element;
            }


        }
    }


app.creatTest();



//             DomElements(ListElement);
//
//             function DomElements(obj) {
//                 for (var key in obj) {
//
//                     var element = document.createElement(key);
//                     document.body.insertBefore(element, element.nextSibling);
//
//                     DomElementsList(obj[key], element);
//
//                     function DomElementsList(obj2, element) {
//                         for (var key in obj2) {
//                             element.classList.add(key) ;
//                             if (key != 'wrapper') {
//                                 var div = document.querySelector(".wrapper");
//                                 div.insertBefore(element, element.nextSibling);
//                                 };
//                             if (key == 'testOl') {
//                                 var div = document.querySelector(".content");
//                                 div.insertBefore(element, element.nextSibling);
//                                 };
//                             if (key == 'header') {
//                                 var div = document.querySelector(".header");
//                                 div.innerHTML = 'Тест по программированию';
//                                     }
//                             if (key == 'button') {
//                                 var div = document.querySelector(".button");
//                                 var textButton = document.createTextNode('Проверить мои результаты');
//                                 div.appendChild(textButton);
//                             }
//
//                         };
//                     }
//                 };
//
//             }
//
//             Test(data);
//             TestCheckBox(app);
//
//             function Test(obj) {
//                 for (var key in obj) {
//                     var li = document.createElement('li');
//                     li.innerHTML = key;
//                     var testOl = document.querySelector(".testOl");
//                     testOl.appendChild(li);
//                     li.appendChild(TestLi(obj[key]));
//                     function TestLi(obj2) {
//                         var ul = document.createElement('ul');
//                         ul.classList.add('list-group', 'clearfix:after');
//                         ul.style.marginTop = '10px';
//                         ul.style.marginBottom = '10px';
//                         for (var key in obj2) {
//                             var li = document.createElement('li');
//                             li.classList.add('list-group-item');
//                             li.innerHTML = key;
//                             ul.appendChild(li);
//                         }
//                         return ul;
//                         }
//                     }
//
//                 }
//             function TestCheckBox(obj) {
//                     var allLi = document.querySelectorAll('ul > li');
//                     for (var i = 0; i < allLi.length; i++) {
//                         allLi[i].classList.add('listLi' + i);
//                         var input = document.createElement("INPUT");
//                         input.setAttribute("type", "checkbox");
//                         input.style.float = 'left';
//                         allLi[i].insertAdjacentElement("beforeBegin", input);
//                         input.style.marginRight = '5px';
//                     }
//                     var allInput = document.querySelectorAll('ul > input');
//                     for (var i = 0; i < allInput.length; i++) {
//                         var classNameInput = allInput[i].className = 'listInput' + i;
//                     }
//
//             }
//
//         },
//
// }
//
// app.creatTest();
