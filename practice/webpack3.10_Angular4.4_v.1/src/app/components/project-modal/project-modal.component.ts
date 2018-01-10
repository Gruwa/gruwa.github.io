import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { fadeInOutAnimation } from './../../animations';

@Component({
    selector: 'app-project-modal',
    templateUrl: './project-modal.component.html',
    styleUrls: ['./project-modal.component.scss'],
    animations: [fadeInOutAnimation]
})
export class ProjectModalComponent implements OnInit {

    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

}
