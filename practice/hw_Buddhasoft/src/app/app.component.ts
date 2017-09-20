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

    isProductEdited: boolean = false;
    isProductCreated: boolean = false;

    constructor(
        private router: Router,
        private productsService: ProductsService) { }

    ngOnInit() {
        this.productsService.productEditData$.subscribe(this.isProductEdited$Observer.bind(this));
        this.productsService.productNewData$.subscribe(this.isProductCreated$Observer.bind(this));
    }

    isProductEdited$Observer(booleanData: boolean) {        
        this.isProductEdited = booleanData;
        setTimeout(() => {
            this.isProductEdited = false;
        }, 3000);
    }

    isProductCreated$Observer(booleanData: boolean) {        
        this.isProductCreated = booleanData;
        setTimeout(() => {
            this.isProductCreated = false;
        }, 3000);
    }

    goToMainPage() {
        this.router.navigate(['/products']);
    }

    link() {
        this.router.navigate(['/tools/new']);
    }
  
}