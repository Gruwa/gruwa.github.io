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

            var listElement = {
                        div: {
                            'tagName' : {'div' : {}},
                            'className' : {'wrapper' : {}},
                        },
                        head: {
                            'tagname' : {'p' : {}},
                            'className' : {'header' : {}, 'page-header' : {}},
                            'content' : {'Тест по программированию' : {}},
                        },
                        content: {
                            'tagname' : {'content' : {}},
                            'className' : {'content' : {}},
                        },
                        button: {
                            'tagname' : {'button' : {}},
                            'className' : {'btn' : {}, 'btn-primary' : {}, 'button' : {}},
                        },
                        ol: {
                            'tagname' : {'ol' : {}},
                            'className' : {'list-group' : {}, 'testOl' : {}},
                        },
                        ul: {
                            'tagname' : {'ul' : {}},
                            'className' : {'list-group' : {}, 'clearfix:after' : {}},
                        },
                        li: {
                            'tagname' : {'li' : {}},
                            'className' : {'list-group-item' : {}},
                        },
                        input: {
                            'tagname' : {'input' : {}},
                            'className' : {'input' : {}},
                        },

                }

            document.body.insertBefore(createElement(config), createElement(config).nextSibling);

            function createElement(config) {
              var element = document.createElement(config.tagName);

              if (config.className) {
                element.className = config.className;
              }

              if (config.content) {
                element.innerHTML = config.content;
              }

            //   if (config.tagName == 'button') {
            //       var textButton = document.createTextNode('Проверить мои результаты');
            //       element.appendChild(textButton);
            //   }

              return element;
            }

            console.log();
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
