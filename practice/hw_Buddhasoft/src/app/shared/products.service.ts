import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';;
import { 
    Http, 
    Response 
} from '@angular/http';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { Injectable } from '@angular/core';

export interface IProduct {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}

@Injectable()
export class ProductsService {

    deleteForm: boolean = false;
    productsData: IProduct[];
    activeProduct: IProduct;
    public productEditData$ = new Subject<any>();
    public productNewData$ = new Subject<any>();

    constructor(
        private http: Http,
        private router:Router) { }

    initialData() {
        if(localStorage.productsData != undefined) {
            return  this.productsData = JSON.parse(localStorage.productsData);
        } else {
            return this.dataServer('assets/server/data.json').subscribe(data => this.updateData(data));
        }
    }
    
    dataServer(dataUrl?: string) {
        return this.http.request(dataUrl)
            .map(res => res.json());
    }

    updateData(data?: IProduct[]) {
        localStorage.setItem('productsData', JSON.stringify(data));
        let dataLoacalStorage = localStorage.getItem('productsData');
        this.productsData = JSON.parse(dataLoacalStorage);
    }

    getProductById(id:number) {
        this.productsData = this.initialData()
        return this.productsData.find(product => product.id === id);
    }
    
    deleteProduct(product: IProduct) {
        this.productsData.splice(this.productsData.indexOf(product), 1);
        this.updateData(this.productsData);
    }
    
    editProduct(product: IProduct) {
        this.activeProduct = product;          
    }

    saveEditProduct(product: IProduct, imgUrl: string) {
        product.id = this.activeProduct.id;
        product.imageUrl = imgUrl;
        this.productsData.splice(this.productsData.indexOf(this.activeProduct), 1, product);
        this.updateData(this.productsData);
    }

    saveProduct(product: IProduct, imgUrl: string) {
        this.productsData = this.initialData();
        product.id = this.productsData[this.productsData.length - 1].id + 1;
        product.imageUrl = imgUrl;
        this.productsData.push(product);
        this.updateData(this.productsData);    
    }

}
