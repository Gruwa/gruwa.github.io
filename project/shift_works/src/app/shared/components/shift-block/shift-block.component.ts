import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-shift-block',
    templateUrl: './shift-block.component.html',
    styleUrls: ['./shift-block.component.scss']
})
export class ShiftBlockComponent {

    @Input() shift;
}
