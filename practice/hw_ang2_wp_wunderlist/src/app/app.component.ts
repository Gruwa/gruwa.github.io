import { Component, Output } from '@angular/core';

import '../assets/style/style.scss';
import '../assets/img/icon.png';

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 

    @Output() redPancilName: any;

    listToggle:any;
    redPancil:any;
    // redPancilName:any;

    // ngAfterContentChecked() {
    //     console.log(this.redPancil);
    //     console.log(this.redPancilName);
    // }

    redPancilClickedName(data: any) {
        this.redPancilName = data;
    }

    redPancilClicked(data: any) {
        this.redPancil = data;
    }

    redPancilContent() {
        return this.redPancil;
    }

    toggleClicked(data: any) {
        this.listToggle = data;
    }

    getTogleContent() {
        
        if(this.listToggle == false) {
            return {'margin-left': '42px'};
        }
    }

    

}
