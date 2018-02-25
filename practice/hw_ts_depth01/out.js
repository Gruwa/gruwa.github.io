var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        function CalcFee(days) {
            return days * .25;
        }
        Fees.CalcFee = CalcFee;
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    function MaxBook(age) {
        if (age < 12) {
            return 3;
        }
        else {
            return 10;
        }
    }
    Utility.MaxBook = MaxBook;
    function privateFunc() {
        console.log("This is private...");
    }
})(Utility || (Utility = {}));
///<reference path="utilFunc.ts" />
var util = Utility.Fees;
var fee = util.CalcFee(10);
console.log(fee);
/* tsc --target ES5 app.ts*/ 
