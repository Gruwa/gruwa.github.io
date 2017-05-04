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

    describe ("Работа с числом 0 возведенным в степень", function(){


        function test(a, b) {

            var result = a;
            console.log(a, b);

            it("Возведение " + 0 + " в степень " + b + " результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = 0, b = 8; b >= 1; b--) {
            test(a, b);
        }

    });


    describe ("Работа с числом возведенным в степень 0", function(){


        function test(a, b) {

            var result = 1;
            console.log(a, b);

            it("Возведение " + a + " в степень " + b + " результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = 11, b = 0; a <= 19; a++) {
            test(a, b);
        }

    });

    describe ("Работа с числом возведенным в степень Infinity", function(){


        function test(a, b) {

            var result = Infinity;
            console.log(a, b);

            it("Возведение " + a + " в степень " + b + " результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = 31, b = Infinity; a <= 39; a++) {
            test(a, b);
        }

    });

    describe ("Работа с Infinity возведенным в степень", function(){


        function test(a, b) {

            var result = Infinity;
            console.log(a, b);

            it("Возведение " + a + " в степень " + b + " результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = Infinity, b = 13; b <= 18; b++) {
            test(a, b);
        }

    });

    describe ("Работа с -Infinity возведенным в четную степень", function(){


        function test(a, b) {

            var result = Infinity;
            console.log(a, b);

            it("Возведение " + a + " в степень " + b + " результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = -Infinity, b = 14; b <= 20; b += 2) {
            test(a, b);
        }

    });

    describe ("Работа с -Infinity возведенным в нечетную степень", function(){


        function test(a, b) {

            var result = -Infinity;
            console.log(a, b);

            it("Возведение " + a + " в степень " + b + " результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = -Infinity, b = 13; b <= 21; b += 2) {
            test(a, b);
        }

    });

    describe ("Работа с возведением числа в отрицательную степень", function(){


        function test(a, b) {

            var result = 1 / (a * a * a * a);
            console.log(a, b);

            it("Возведение " + a + " в степень " + b + " результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = 1, b = -4; a <= 7; a++) {
            test(a, b);
        }

    });

    describe ("Работа с возведением числа в -Infinity степень", function(){


        function test(a, b) {

            var result = 0;
            console.log(a, b);

            it("Возведение " + a + " в степень " + b + " результат = " + result, function() {
                assert.equal(pow(a, b), result, "Сравнение");
             });
        }

        for (var a = 1, b = -Infinity; a <= 7; a++) {
            test(a, b);
        }

    });

});
