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

        let output = document.getElementById("output");
        let button = document.getElementById("button");

        let click = Observable.fromEvent(button, "click");

        function load(url: string) {
            return Observable.create(observer => {
                let xhr = new XMLHttpRequest();

                let onLoad = () => {

                    if(xhr.status === 200) {

                        let data = JSON.parse(xhr.responseText);
                        observer.next(data);
                        observer.complete();
                    } else {
                        observer.error(xhr.statusText);
                    }
                }

                xhr.addEventListener("load", onLoad);

                xhr.open("GET", url);
                xhr.send();

                return () => {
                    xhr.removeEventListener("load", onLoad);
                    xhr.abort();
                }

            }).retryWhen(retryStrategy({attempts: 3, delay: 10000}));
        }

        function loadWithFetch(url: string) {
            return Observable.defer(() => {
                return Observable.fromPromise(fetch(url).then(r => {
                    if(r.status === 200) {
                        return r.json();
                    } else {
                        return Promise.reject(r);
                    }
                })).retryWhen(retryStrategy());
            })

        }

        function retryStrategy({attempts = 4, delay = 1000} = {}) {
            return function(errors) {
                return errors
                    .scan((acc, value) => {
                        console.log(acc, value);
                        return acc + 1;
                    }, 0)
                    .takeWhile(acc => acc < attempts)
                    .delay(delay);
            }
        }

        function renderMovies(movies) {
            movies.forEach(m => {
                let div = document.createElement("div");
                div.innerText = m.title;
                output.appendChild(div);
            });
        }


        let subscription = load("./../assets/server/data1.json").subscribe(renderMovies,
            e => console.log(`error: ${e}`),
            () => console.log("complete!")
        );

        console.log(subscription);
        subscription.unsubscribe();

        click.flatMap(e => loadWithFetch("./../assets/server/data1.json"))
            .subscribe(
                renderMovies,
                e => console.log(`error: ${e}`),
                () => console.log("complete")
            );

//---------------------------------------------------------------
// второй способ обработки приходящих эрроров
//         let source = Observable.merge(
//             Observable.of(1),
//             Observable.from([2, 3, 4]),
//             Observable.throw(new Error("Stop!")),
//             Observable.of(5)
//         ).catch(e => {
//             console.log(`caught: ${e}`);
//             return Observable.of(10);
//         });
//
//         source.subscribe(
//             value => console.log(`value: ${value}`),
//             error => console.log(`error: ${error}`),
//             () => console.log("complete")
//         )

//------------------------------------------------------------
// способ обработки приходящих эррооров

        // let source = Observable.onErrorResumeNext(// игнорирует приходящие эррорры
        //     Observable.of(1),
        //     Observable.from([2, 3, 4]),
        //     Observable.throw(new Error("Stop!")),
        //     Observable.of(5)
        // );
        //
        // source.subscribe(
        //     value => console.log(`value: ${value}`),
        //     error => console.log(`error: ${error}`),
        //     () => console.log("complete")
        // )
//-------------------------------------------------------
//         let source = Observable.merge(// объединяет несколько потоков обсервоблов в один
        // останавливается на первом полученном эрррор и дальше не идет
//             Observable.of(1),
//             Observable.from([2, 3, 4]),
//             Observable.throw(new Error("Stop!")),
//             Observable.of(5)
//         );
//
//         source.subscribe(
//             value => console.log(`value: ${value}`),
//             error => console.log(`error: ${error}`),
//             () => console.log("complete")
//         )

//------------------------------------------------------------

        // let source = Observable.create(observer => {
        //     observer.next(1);
        //     observer.next(2);
        //
        // });
        //
        // source.subscribe(
        //     value => console.log(`value: ${value}`)
        // )


//-----------------------------------------------------------

        // let output = document.getElementById("output");
        // let button = document.getElementById("button");
        //
        // let click = Observable.fromEvent(button, "click");
        //
        // function load(url: string) {
        //     return Observable.create(observer => {
        //         let xhr = new XMLHttpRequest();
        //
        //         xhr.addEventListener("load", () => {
        //
        //             if(xhr.status === 200) {
        //
        //                 let data = JSON.parse(xhr.responseText);
        //                 observer.next(data);
        //                 observer.complete();
        //             } else {
        //                 observer.error(xhr.statusText);
        //             }
        //
        //         });
        //
        //         xhr.open("GET", url);
        //         xhr.send();
        //
        //     }).retryWhen(retryStrategy({attempts: 3, delay: 10000}));
        // }
        //
        // function retryStrategy({attempts = 4, delay = 1000}) {
        //     return function(errors) {
        //         return errors
        //             .scan((acc, value) => {
        //                 console.log(acc, value);
        //                 return acc + 1;
        //             }, 0)
        //             .takeWhile(acc => acc < attempts)
        //             .delay(delay);
        //     }
        // }
        //
        // function renderMovies(movies) {
        //     movies.forEach(m => {
        //         let div = document.createElement("div");
        //         div.innerText = m.title;
        //         output.appendChild(div);
        //     });
        // }
        //
        // load("./../assets/server/data.json").subscribe(renderMovies);
        //
        // click.flatMap(e => load("./../assets/server/data.json"))
        //     .subscribe(
        //         renderMovies,
        //         e => console.log(`error: ${e}`),
        //         () => console.log("complete")
        //     );

// -------- получаем джейсон через промис в обсервобл--- --
// не лези лоадинг будет обращаться к серверу все время, что хуже
        // потому надо оборачивать в обсервебл
        // ниже приведен пример для приема промисов и оборачивания его в обсервобл
        //с тем же примером что и выше

        // function loadWithFetch(url: string) {
        //     return Observable.defer(() => {
        //         return Observable.fromPromise(fetch(url).then(r => r.json()));
        //     })
        //
        // }
        //
        // load("./../assets/server/data.json").subscribe(renderMovies);
        //
        // click.flatMap(e => loadWithFetch("./../assets/server/data.json"))
        //     .subscribe(
        //         renderMovies,
        //         e => console.log(`error: ${e}`),
        //         () => console.log("complete")
        //     );


//----------------------------------------------------------------------------------
//громоздкий метод

        // let output = document.getElementById("output");
        // let button = document.getElementById("button");
        //
        // let click = Observable.fromEvent(button, "click");
        //
        // function load(url: string) {
        //     let xhr = new XMLHttpRequest();
        //
        //     xhr.addEventListener("load", () => {
        //
        //         let movies = JSON.parse(xhr.responseText);
        //
        //         movies.forEach(m => {
        //             let span = document.createElement("div");
        //             span.innerText = m.title;
        //             output.appendChild(span);
        //         });
        //     });
        //
        //     xhr.open("GET", url);
        //     xhr.send();
        // };
        //
        // click.subscribe(
        //     e => load("./../assets/server/data.json"),
        //     e => console.log(`error: ${e}`),
        //     () => console.log("complete")
        // );


//----------------------------------------------------------------------------------

        let circle = document.getElementById("circle");
        let sourceR = Observable.fromEvent(document, "mousemove")
                               .map((e : MouseEvent) => {
                                   return {
                                       x: e.clientX,
                                       y: e.clientY
                                   };
                               })                           
                               .filter(value => value.x < 500)
                               .delay(300);
    
        function onNext(value) {
            circle.style.left = value.x +'px';
            circle.style.top = value.y + 'px';
        }

        sourceR.subscribe(
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