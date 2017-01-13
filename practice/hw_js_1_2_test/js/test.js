describe("Проверка программы", function() {

    describe("Нахождение в массиве пользователя с положительным результатом", function(){

        var newName = ['Вася', 'Коля', 'Диод', 'Дождь', 'Клен', 'Дуб', 'Пчел', 'Слон'];
        var a = 5;
        var result = 'Диод';

        it(result + " находится в базе", function() {
            assert.equal(Registration(a, newName, result), result, "Сравнение");
         });

    });

    describe("Нахождение в массиве пользователя с отрицательным результатом", function(){

        var newName = ['Вася', 'Коля', 'Диод', 'Дождь', 'Клен', 'Дуб', 'Пчел', 'Слон'];
        var a = 5;
        var result = false;

        it("В базе " + result + " НЕТ", function() {
            assert.equal(Registration(a, newName, result), result, "Сравнение");
         });

    });

    // describe("Проверка копирования массива", function(){
    //
    //     var newName = ['Вася', 'Коля', 'Диод', 'Дождь', 'Клен', 'Дуб', 'Пчел', 'Слон'];
    //     var a = 5;
    //     // var result = ;
    //
    //     for (var i = 0; i < a; i++) {
    //         it(" находится в базе", function() {
    //             assert.equal(newName[i], Registration(), "Сравнение");
    //              });
    //         // if (newName[i] != list[i]){
    //         //
    //         //
    //         //  }
    //     }
    //
    //
    //
    // });

});
