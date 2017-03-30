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
                    id: 205,
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

    // var app = {
    //         creatTest: function(){
    //             var ol = {
    //                 tagName : 'ol',
    //                 className : ['list-group', 'testOl'],
    //             };
    //             var ul = {
    //                 tagName : 'ul',
    //                 className : ['list-group', 'clearfix'],
    //             };
    //             var li = {
    //                 tagName : 'li',
    //                 className : ['list-group-item'],
    //             };
    //             var input = {
    //                 tagName : 'INPUT',
    //                 className : ['input'],
    //             };
    //
    //             Test($jsData);
    //
    //             TestCheckBox(app);
    //
    //             function createElement(config) {
    //                   var element = document.createElement(config.tagName);
    //
    //                   if (config.className) {
    //                       for (var i = 0; i < config.className.length; i++) {
    //                          element.classList.add(config.className[i]);
    //                      };
    //
    //                   };
    //                   if (config.tagName == 'INPUT') {
    //                       element.setAttribute("type", "checkbox");
    //                   };
    //                   return element;
    //             }
    //
    //             function Test(obj) {
    //                 var olList = new createElement(ol);
    //                 document.getElementsByClassName('content')[0].appendChild(olList);
    //                 for (var key in obj) {
    //                     var liList = new createElement(li);
    //                     liList.innerHTML = key;
    //                     olList.appendChild(liList);
    //                     liList.appendChild(TestLi(obj[key]));
    //                     function TestLi(obj2) {
    //                         var ulList = new createElement(ul);
    //                         for (var key in obj2) {
    //                             var liList2 = new createElement(li);
    //                             liList2.innerHTML = key;
    //                             ulList.appendChild(liList2);
    //                         };
    //                         return ulList;
    //                             }
    //                     };
    //
    //                 }
    //                 function TestCheckBox(obj) {
    //                         var allLi = document.querySelectorAll('ul > li');
    //                         for (var i = 0; i < allLi.length; i++) {
    //                             allLi[i].classList.add('listLi' + i);
    //                             var inputList = new createElement(input);
    //                              allLi[i].insertAdjacentElement("beforeBegin", inputList);
    //                         };
    //                         var allInput = document.querySelectorAll('ul > input');
    //                         for (var i = 0; i < allInput.length; i++) {
    //                             allInput[i].id = ('listInput' + i);
    //                         };
    //
    //                 }
    //         },
    //
    //         logicalTest: function(){
    //
    //             function checkbox() {
    //                 $('input').change(function(event) {
    //                     if ( $(event.target).parent('ul').find('input:checked').length == 2) {
    //                         console.log($(event.target).parent('ul').find('input:checked').length);
    //                         $(event.target).parent('ul').find('input:not(:checked)').attr('disabled', 'disabled');
    //                     } if ( $(event.target).parent('ul').find('input:checked').length != 2) {
    //                         $(event.target).parent('ul').find('input:not(:checked)').removeAttr('disabled');
    //                     };
    //
    //                 });
    //             }
    //
    //             checkbox();
    //
    //             $('.buttonEndForm').click(function(event) {
    //                 try {
    //                     if (document.getElementById('listInput1').checked != false && document.getElementById('listInput5').checked != false && document.getElementById('listInput8').checked != false && document.getElementById('listInput0').checked != false && document.getElementById('listInput3').checked != false && document.getElementById('listInput7').checked != false ) {
    //                         var number = getRandom(776345, 956872)
    //                         function getRandom(min, max)
    //                             {return parseInt(Math.random() * (max - min) + min);}
    //                         var textEndTest = 'Поздравляем <p>Вы прошли '+number+' круг ада.</p> Надеемся в следующий раз Вам больше не повезет!';
    //                         app.modalWindow(textEndTest);
    //                     } else {
    //                         var number = getRandom(4345, 6872)
    //                         function getRandom(min, max)
    //                             {return parseInt(Math.random() * (max - min) + min);}
    //                         var textEndTest = 'Вы исчерпали свою удачу. <p>Ваш котел номер '+number+' за поворотом.</p> <p>УВАЖАЕМЫЕ, просьба картошку из котла НЕ ЖРАТЬ!</p>';
    //                         app.modalWindow(textEndTest);
    //                     }
    //                 } finally {
    //                     $('input').removeAttr('disabled');
    //                     var inputArray = document.getElementsByTagName('input');
    //                     for (var i = 0; i < inputArray.length; i++) {
    //                         inputArray[i].checked = false;
    //                     }
    //                 }
    //
    //             });
    //         },
    //
    //         modalWindow: function(key) {
    //             $('.backgroundModal')[0].style.display = "block";
    //             $('.windowModal').html(key);
    //             $('.windowModal').animate({top: '50%'}, '10900');
    //             $('.backgroundModal').one('click', function(event) {
    //                 $('.backgroundModal')[0].style.display = "none";
    //                 $('.windowModal').animate({top: '-150%'}, 'fast');
    //             });
    //         }
    //     };
    //
    //
    // app.creatTest();
    // app.logicalTest();




});

//
//     <%=for (var i = 0; i < $($jsData).length; i++) {%>
//         <li class="list-group-item"><%=$jsData[i]%></li>
//         <%=$question = $jsData[i];%>
//         <%=for (var i = 0; i < $($question).length; i++) {%>
//             <ul class="list-group clearfix">
//                 <label for="<%=$($question[i]).id%>">
//                 <input type="checkbox" class="input" id="<%=$($question[i]).id%>" >
//                 <li class="list-group-item"><%=$($question[i]).text%></li>
//                 </label>
//             </ul>
//         <%};%>
//     <%};%>

// <% for (var variable in $jsData) { var k = %>
//     <li class="list-group-item"><%= variable %></li>
//     <%console.log($jsData.variable);%>
//
//     <%for (var variable2 in [variable]) { %>
//         <%console.log($(variable2));%>
//         <ul class="list-group clearfix">
//             <label for="<%= variable2.id %>">
//             <input type="checkbox" class="input" id="<%= variable2.id %>" >
//             <li class="list-group-item"><%= variable2.text %></li>
//             <%console.log(variable2.text);%>
//             </label>
//         </ul>
//     <% }; %>
//
// <% }; %>
