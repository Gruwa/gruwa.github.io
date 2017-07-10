import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    template: `
<div class="well hoverwell thumbnail">
    <h2>{{event.name}}</h2>
    <div>Date: {{event.date}}</div>
    <div>Time: {{event.time}}</div>
    <div>Price: \$ {{event.price}}</div>
    <div>
        <span>Lcation: {{event.location.address}}</span>
        <span class="pad-left">{{event.location.city}}, {{event.location.country}}</span>
    </div>
    <!--
    <button class="btn btn-primary" (click)="handleClickMe()">Click Me</button>
    По клику на кнопку в дочернем эелементе вызывается функция handleClickMe(),
    которая вытягивает свойство this.event.name и с помощью @Output() eventClick = new EventEmitter();
    передает его родительнскому элементу
    -->
</div>
    `,
    styles: [`
        .pad-left { margin-left: 10px; }
        .well div { color: red; }
    `]
})
export class EventThumbnailComponent {
    @Input() event:any;
    someProperty:any = "some value";

// @Output() eventClick = new EventEmitter();

//    handleClickMe() {
//        this.eventClick.emit(this.event.name);
//    }

    logFoo() {
        console.log('foo');
    }
}

