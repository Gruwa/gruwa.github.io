// test function

describe("Проверка теста", function() {

    describe("Отрабатывает ли тест состояние чекнутый чекбокс, и значение correct: false", function(){

            let $result = false;
            let $checkbox = true;
            let $correct = false;

            it("Чекбокс отмечен как верный ответ, его значение" + $checkbox + "хотя значение correct: false, результат теста = " + $result, function() {
                assert.equal($checkbox && $correct, $result, "Сравнение");
             });



});

    describe ("Отрабатывает ли тест состояние не чекнутый чекбокс, и значение correct: true", function(){


        let $result = false;
        let $checkbox = false;
        let $correct = true;

        it("Чекбокс не отмечен как верный ответ, его значение" + $checkbox + "хотя значение correct: true, результат теста = " + $result, function() {
            assert.equal($checkbox && $correct, $result, "Сравнение");
         });

    });

    describe ("Отрабатывает ли тест состояние чекнутый чекбокс, и значение correct: true", function(){


        let $result = true;
        let $checkbox = true;
        let $correct = true;

        it("Чекбокс отмечен как верный ответ, его значение" + $checkbox + "хотя значение correct: true, результат теста = " + $result, function() {
            assert.equal($checkbox && $correct, $result, "Сравнение");
         });

    });

});
