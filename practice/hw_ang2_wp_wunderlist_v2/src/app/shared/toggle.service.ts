import { Injectable, SimpleChanges } from '@angular/core';
import { CreateSidebarComponent } from './../sidebar/create-sidebar.component';

@Injectable()

export class ToggleService {

    listToggle: boolean = true;
    redPencil: boolean = false;

    listToggleFunc(data: boolean) {
        this.listToggle = data; 
        // console.log('ToggleService ', this.listToggle);      
    }

    redPencilFunc(data: boolean) {
        this.redPencil = data;
        console.log('RedPencil ', this.redPencil);
    }
}


