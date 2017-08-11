import { Injectable } from '@angular/core';

@Injectable()

export class ToggleService {

    listToggle: boolean = true;

    listToggleFunc(data: boolean) {
        this.listToggle = data; 
        // console.log('ToggleService ', this.listToggle);      
    }
}


