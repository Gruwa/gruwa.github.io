import { NgSwitch, NgSwitchDefault } from '@angular/common/src/directives/ng_switch';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    template: `
<div class="well hoverwell thumbnail">
    <h2>{{event.name}}</h2>
    <div>Date: {{event?.date}}</div>
    <div [ngClass]="getStartTimeClass()"
        [ngStyle]="getStartTimeStyle()" 
        [ngSwitch]="event?.time">
        Time: {{event?.time}}
    <!-- [ngSwitch] => делает видимыми илискрывает элементы в зависимости от активного свойства-->

    <!-- [class.green] => говорит, применить к этому диву класс .green когда экспрешен event?.time равно
     8:00 am  => вернет true 
        -  если класс надо применить только один можно записать так прямо в шаблоне 
    [class.green]="event?.time === '8:00 am'",
        - если надо применить несколько классов то можно записать прямо в шаблоне
    [ngClass]="{green: event?.time === '8:00 am', bold: event?.time === '9:00 am'}"
        - или же писать через функцию как показано в шаблоне
       -->
    
    <!-- [ngStyle] => все точно так же как и с [ngClass] -->

        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
    </div>
    <div>Price: \$ {{event?.price}}</div>
    <div *ngIf="event.location" >
        <span>Lcation: {{event?.location?.address}}</span>
        <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
    </div>
</div>
    `,
    styles: [`
        .green {color: #003300 !important;}
        .bold {font-weight: bold;}
        .thumbnail {min-height: 210px;}
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb; }
    `]
})
export class EventThumbnailComponent {
    @Input() event:any;

    getStartTimeClass() {
        const isEarlyStart = this.event && this.event.time === '9:00 am';
        return {green: isEarlyStart, bold: isEarlyStart};
        
        // можно также отдать строкой, например так
        // if(this.event && this.event.time === '9:00 am'){
        //   return 'green bold'; }
        // return '';

        // или массивом
        // if(this.event && this.event.time === '9:00 am'){
        //   return ['green', 'bold']; }
        // return [];
    }

    getStartTimeStyle():any {
        if(this.event && this.event.time === '10:00 am') {
            return {'color': 'red', 'font-weight': 'light'};
        }
        return {};
    }
}

