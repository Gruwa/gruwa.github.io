// test function

describe("Проверка функции pow", function() {

    describe("Работает или нет функция, работа с целыми числами и числами > 0", function(){

        function test(a, b) {

            var result = a * a * a * a * a;
            console.log(a, b);

            it("Возведение " + a + " в степень 5 результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = 1, b = 5; a <= 5; a++) {
            test(a, b);
        }

});

    describe ("Работа с числами < 0", function(){


        function test(a, b) {

            var result = a * a * a * a * a ;
            console.log(a, b);

            it("Возведение " + a + " в степень 5 результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = -1, b = 5; a >= -5; a--) {
            test(a, b);
        }

    });

    describe ("Работа с числами < 0 c четной степенью", function(){


        function test(a, b) {

            var result = a * a * a * a * a * a;
            console.log(a, b);

            it("Возведение " + a + " в степень 6 результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = -1, b = 6; a >= -5; a--) {
            test(a, b);
        }

    });

    describe ("Работа с числами = 0", function(){


        function test(a, b) {

            var result = a * a * a;
            console.log(a, b);

            it("Возведение " + a + " в степень 3 результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = 2, b = 3; a >= -3; a--) {
            test(a, b);
        }

    });

});
