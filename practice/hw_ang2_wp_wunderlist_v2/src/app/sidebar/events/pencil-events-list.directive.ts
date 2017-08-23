import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[PencilDirective]'
})

export class PencilEventsListDirective {

    @Output() PencilBack = new EventEmitter;

    @HostListener('mouseenter') onMouseEnter() {
        this.showPencil(true);
        // this.showPencilBack.emit(this.showPencil);
    }

    @HostListener('mouseleave') onMouseLeave() {
        setTimeout(this.showPencil(false), 1000);
        
        // this.showPencilBack.emit(this.showPencil);
    }

    private showPencil(showPencil: boolean) {
        // this.showPencilBack.emit(showPencil);
    }
    
}
