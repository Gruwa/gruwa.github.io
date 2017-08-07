module demo_02_05 {
    //any
    let data: any;
    let info;
    let doSomething: any = function(arg:any) {
        return arg;
    }
    let x = doSomething(5);

    //primitives
    
    let age: number = 21;
    let score: number = 43.56;
    let rating = 99.99;
    
    let hasData: boolean =true;
    let hasData2 = true;
    let isBald = function() { return 'yea';}
    let hasDer = !!isBald;
    // знаки восклицания впереди переводят значение в boolean, ! - false, !! - true

    let firstN: string = 'Hoha';
    let lastN = 'Fofa';

    // string array
    function getArrayLength(x: string[]) {
        let len = x[0].length;
        return len;
    }
    let names: string[] = ['asd', 'fsdf', 'dsf', 'ytytr'];
    let firstPerson: string = names[0];
    console.log(getArrayLength(names));

    // null
    let getSal: any = null;
    let animal = null;
    // let orderDate: Date = null;

    //undefined
    let quant: number;
    let comp = undefined;

    console.log(quant);
    console.log(comp);
    
    

}