import { NgIf } from '@angular/common/src/directives/ng_if';
import { isBoolean } from 'util';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'collapsible-well',
    template: `
        <div (click)="toggleContent()" class="well pointable">
            <h4>
                <ng-content select="[well-title]"></ng-content>
            </h4>
            <ng-content *ngIf="visible" select="[well-body]"></ng-content>
        </div>
    `
})
//  <ng-content *ngIf="visible"></ng-content> => позволяет вставить сюда в темплейт 
// содержание тега <collapsible-well> прописанное в штмл файле, в данном случае это
// <h6>{{session.presenter}}</h6><span>Duration: {{session.duration}}</span>
// <br /><span>Level: {{session.level}}</span><p>{{session.abstract}}</p>

// select=".title" позволяет привязывать <ng-content> к определенному тегу через класс .title
// точно также можно привязть и по селектору, т.е. вместо класса указываешь селектор
// т.е. select="[well-body]" привязывает див с селектором well-body
export class CollapsibleWellComonent {
    visible: boolean = false;

    toggleContent() {
        this.visible = !this.visible;
    }
}