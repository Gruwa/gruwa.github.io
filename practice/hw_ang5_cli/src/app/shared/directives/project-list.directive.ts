import {
    Directive,
    HostBinding
} from '@angular/core';

@Directive({
    selector: '[appProjectListStyle]'
})
export class ProjectListDirective {

    @HostBinding('class.list-directive') isLabelStyle = true;

}
