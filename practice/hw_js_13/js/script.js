$(function() {

    'use strict';

// Server
    var $ServerData = {
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
    };

    var $testContent = tmpl($html, $data);

    $('body').append($testContent);

    var app = {
            creatTest: function(){
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

                Test($jsData);

                TestCheckBox(app);

                function createElement(config) {
                      var element = document.createElement(config.tagName);

                      if (config.className) {
                          for (var i = 0; i < config.className.length; i++) {
                             element.classList.add(config.className[i]);
                         };

                      };
                      if (config.tagName == 'INPUT') {
                          element.setAttribute("type", "checkbox");
                      };
                      return element;
                }

                function Test(obj) {
                    for (var key in obj) {
                        var olList = new createElement(ol);
                        document.getElementsByClassName('content')[0].appendChild(olList);
                        var liList = new createElement(li);
                        liList.innerHTML = key;
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
                                allInput[i].id = ('listInput' + i);
                            };

                    }
            },

            logicalTest: function(){

                function disable(myCheck) {
                    var k = document.getElementById("myCheck");
                    k.disabled = true;
                }

                function undisable(myCheck) {
                    document.getElementById("myCheck").disabled = false;
                }

                $('#listInput0').change(function(event) {
                    if (event.target == $('#listInput0') || document.getElementById("listInput0").checked != false){
                        disable("listInput1");
                        disable("listInput2");
                        // document.getElementById("#listInput0").checked == true;
                        // document.getElementById("#listInput1").disabled == true;
                        // document.getElementById("#listInput2").disabled == true;
                    } else {

                    }


                });



            }
        };


    app.creatTest();
    app.logicalTest();



});
