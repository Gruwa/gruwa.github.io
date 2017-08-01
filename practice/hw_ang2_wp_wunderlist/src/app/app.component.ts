import { Component } from '@angular/core';

import '../assets/style/style.scss';
import '../assets/img/icon.png';

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 

    listToggle: any;

    toggleClicked(data: any) {
        this.listToggle = data;
    }

    getTogleContent() {

        if(this.listToggle == false) {
            return {'margin-left': '42px'};
        }
    }

}
