// test function

describe("Проверка функции pow", function() {

    describe("Работает или нет функция", function(){

        function test(a) {

            var result = a * a * a * a * a;

            it("Возведение " + a + " в степень 5 результат = " + result, function() {
                assert.equal(pow(a, 5), result);
             });
        }

        for (var a = 1; a <= 5; a++) {
            test(a);
        }

});



});
