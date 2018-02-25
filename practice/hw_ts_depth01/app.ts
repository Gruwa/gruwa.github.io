///<reference path="utilFunc.ts" />

import util = Utility.Fees;

let fee = util.CalcFee(10);
console.log(fee);

/* tsc --target ES5 app.ts*/
/* tsc --target ES5 app.ts --outFile out.js* - создается 1 файл со всем коде в нем */