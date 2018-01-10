import {
    Directive,
    HostBinding
} from '@angular/core';

@Directive({
    selector: '[appProjectTitleStyle]'
})
export class ProjectTitleDirective {

    @HostBinding('class.title-directive') isLabelStyle = true;

}
