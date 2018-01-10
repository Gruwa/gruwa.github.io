import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'app-project-button',
    templateUrl: './project-button.component.html',
    styleUrls: ['./project-button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProjectButtonComponent implements OnInit {

    @Input() color: string = 'project__btn__color';
    @Input() type: string = 'button';
    @Input() fa: boolean = false;
    @Input() iconname: string = '';
    @Input() disabled: boolean = false;
    @Input() title: string = '';
    @Input() newClass: string = '';
    @Input() cancel: boolean = false;
    @Output() onClickEvent: EventEmitter<any> = new EventEmitter<any>();

    private classes: string = '';
    constructor() {
    }

    ngOnInit() {

    }

    getClass() {
        this.classes = this.color;

        if (this.newClass) {
            this.classes += ' ' + this.newClass;
        }
        if (this.cancel) {
            this.classes += ' ' + 'project__btn__color--cancel';
        }

        return this.classes;
    }

}
