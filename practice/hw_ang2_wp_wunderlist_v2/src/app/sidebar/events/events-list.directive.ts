import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { EventsListComponent } from './events-list.component';

@Directive({
    selector: '[showPencilDirective]'
})

export class EventsListDirective {

    @Output() showPencilBack = new EventEmitter;

    @HostListener('mouseenter') onMouseEnter() {
        this.showPencil(true);
        // this.showPencilBack.emit(this.showPencil);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.showPencil(false);
        // this.showPencilBack.emit(this.showPencil);
    }

    private showPencil(showPencil: boolean) {
        this.showPencilBack.emit(showPencil);
    }
    
}
