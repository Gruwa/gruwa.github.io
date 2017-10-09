import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

// import { Observable } from "rxjs/Observable";
// import 'rxjs/add/operator/map'; если потребует установить функции

import '../assets/style/style.scss';


declare let require: (filename: string) => any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  
    ngOnInit() {

        let circle = document.getElementById("circle");
        let source = Observable.fromEvent(document, "mousemove")
                               .map((e : MouseEvent) => {
                                   return {
                                       x: e.clientX,
                                       y: e.clientY
                                   };
                               })                           
                               .filter(value => value.x < 500)
                               .delay(300);
    
        function onNext(value) {
            circle.style.left = '70';
            console.log(circle.style)
            circle.style.top = '120';
            console.log(circle.style.top = value.y)
        }
        source.subscribe(
            onNext,
            e => console.log(`error: ${e}`),
            () => console.log("complete")
        );




// //-----------------------------------------------------------------------------        
//         let numbers = [1,5,10];
//          // let source = Observable.from(numbers); // 1 способ задание потока

//         // 2 способ задания потока-------------------
//         // let source = Observable.create(observer => {
            
//         //     for(let n of numbers) {

//         //         // if( n === 5 ) {
//         //         //     observer.error("Wrong!");
//         //         // }
//         //         observer.next(n);
//         //     }

//         //     observer.complete();
//         // }); 
//         // --------------------------------------------------------------

//         let source = Observable.create(observer => {

//             let index = 0;
//             let produceValue = () => {
//                 observer.next(numbers[index++]);

//                 if(index < numbers.length) {
//                     setTimeout(produceValue, 2000);
//                 } else {
//                     observer.complete();
//                 }
//             };

//             produceValue();
//         }).map(n => n * 3)
//           .filter(n => n > 4);


//         // 2 способ подписи на событие------------
//         source.subscribe(
//             value => console.log(`value: ${value}`),
//             (e) => console.log(`error: ${e}`),
//             () => console.log("comlete")
//         );
//         // ----------------------

//         // // 1 способ подписи на событие------------
//         // class MyObserver implements Observer<number> {
//         //     next(value) {
//         //         console.log(`value: ${value}`);
//         //     }
            
//         //     error(e) {
//         //         console.log(`error: ${e}`);
//         //     }

//         //     complete() {
//         //         console.log("comlete");
                
//         //     }
//         // }
        
//         // source.subscribe(new MyObserver());

//         // //--------------------------
// //------------------------------------------------------------------------------
    
    }

}