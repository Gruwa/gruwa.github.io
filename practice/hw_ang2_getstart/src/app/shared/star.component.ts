import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { directiveDef } from '@angular/core/src/view/provider';

@Component({
    selector: 'ai-star',
    templateUrl: 'app/shared/star.component.html',
    styleUrls: ['app/shared/star.component.css']
})
export class StarComponent {
    @Input() rating: number; // @Input() => input decorator, функция ставим (), добавляется к любому типу, в начале ставим @, получение данных во вложенный компонент
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>(); // @Output => output decorator, выдача ивента произошедшего во вложенном компоненте в родительский

    ngOnChanges(): void {
        this.starWidth = this.rating * 86 / 5;
    }

    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}
