import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {log} from 'util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        // document.addEventListener('click', evt => {
        //     console.log(evt);
        //
        //     setTimeout(() => {
        //
        //         let counter = 0;
        //
        //         setInterval(() => {
        //             console.log(counter);
        //             counter++;
        //         }, 1000);
        //
        //         console.log('finish');
        //     }, 3000);
        // });


        // const interval$ = interval(1000);
        //
        // interval$.subscribe(val => {
        //     console.log('stream 1 =>' + val);
        // });
        //
        // interval$.subscribe(val => {
        //     console.log('stream 2 =>' + val);
        // });

        // const intervalTimer$ = timer(3000, 1000);
        //
        // intervalTimer$.subscribe(val => {
        //     console.log('stream 1 =>' + val);
        // });

        // const click$ = fromEvent(document, 'click');
        //
        // click$.subscribe(val => {
        //     console.log(val);
        // });

        const http$ = Observable.create(observer => {
            fetch('/api/courses')
                .then(resp => {
                    return resp.json();
                })
                .then(body => {
                    observer.next(body);
                    observer.complete();
                })
                .catch(err => {
                    observer.error(err);
                });
        });

        http$.subscribe(
            courses => console.log(courses),
            noop,
            () => console.log('completed')
        );



    }


}






