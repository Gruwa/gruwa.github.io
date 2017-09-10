import { ProductsService } from './shared';
import { Router } from '@angular/router';
import { 
    Component, 
    OnInit 
} from '@angular/core';

import { setTimeout } from 'timers';

import '../assets/style/style.scss';


declare let require: (filename: string) => any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    booleanEditData: boolean = false;
    booleanNewData: boolean = false;

    constructor(private router: Router,
                private productsService: ProductsService) { }

    ngOnInit() {
        this.productsService.productEditData$.subscribe(this.productEditData$Observer.bind(this));
        this.productsService.productNewData$.subscribe(this.productNewData$Observer.bind(this));
    }

    productEditData$Observer(booleanData: boolean) {        
        this.booleanEditData = booleanData;
        setTimeout(() => {
            this.booleanEditData = false;
        }, 3000);
    }

    productNewData$Observer(booleanData: boolean) {        
        this.booleanNewData = booleanData;
        setTimeout(() => {
            this.booleanNewData = false;
        }, 3000);
    }

    contextMenuMain() {
        this.router.navigate(['/products']);
    }

    link() {
        this.router.navigate(['/tools/new']);
    }
  
}