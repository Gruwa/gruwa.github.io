import { Injectable, SimpleChanges } from '@angular/core';
import { CreateSidebarComponent } from './../sidebar/create-sidebar.component';

@Injectable()

export class ToggleService {

    listToggle: boolean = true;

    listToggleFunc(data: boolean) {
        this.listToggle = data; 
        // console.log('ToggleService ', this.listToggle);
          
    }

    // ngAfterContentChecked() {
    //     this.toggle = this.createSidebarComponent.listToggle;
    //     console.log(this.createSidebarComponent.listToggle);
        
    // }    
     
}

// interface OnChanges { 
//     ngOnChanges(listToggle: SimpleChanges): void
// }

