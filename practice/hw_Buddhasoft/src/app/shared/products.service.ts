import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { setTimeout } from 'timers';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { Injectable } from '@angular/core';

export interface IProduct {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}

// let offLineData = [
//     { 
//         id: 1,
//         title: 'Apple',
//         imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxHZ7A5oyikmiipk8iKigeHdwVCxOv1GojecGZInCGuO2lT_hw",
//         description: "The apple tree is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. ",
//         price: 0.97           
//     },
//     { 
//         id: 2,
//         title: 'Orange',
//         imageUrl: "https://previews.123rf.com/images/atoss/atoss1205/atoss120500041/13623365-Orange-fruit-isolated-on-white-background-Stock-Photo.jpg",
//         description: "The orange is the fruit of the citrus species Citrus × sinensis in the family Rutaceae. It is also called sweet orange",
//         price: 0.97           
//     },
//     { 
//         id: 3,
//         title: 'Mandarin',
//         imageUrl: "https://freshbroccoli.ru/bitrix/templates/aspro_mshop_freshbroccoli/images/magic-mandarin-sm.png",
//         description: "The mandarin orange also known as the mandarin or mandarine, is a small citrus tree with fruit resembling other oranges.",
//         price: 0.97            
//     }
//     ,
//     { 
//         id: 4,
//         title: 'Lemon',
//         imageUrl: "http://dreamatico.com/data_images/lemon/lemon-7.jpg",
//         description: "The lemon, Citrus limon (L.) Osbeck, is a species of small evergreen tree in the flowering plant family Rutaceae,",
//         price: 0.12            
//     },
//     { 
//         id: 5,
//         title: 'Cherry',
//         imageUrl: "http://tutknow.ru/uploads/posts/2013-06/1370787634_vishnya.jpg",
//         description: "A cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe (stone fruit). ",
//         price: 0.48            
//     },
//     { 
//         id: 6,
//         title: 'Watermelon',
//         imageUrl: "http://edaplus.info/food_pictures/watermelon.jpg",
//         description: "Watermelon Citrullus lanatus var. lanatus is a scrambling and trailing vine in the flowering plant",
//         price: 15.74            
//     },
//     { 
//         id: 7,
//         title: 'Apricot',
//         imageUrl: "http://honeygarden.ru/plants/apricot/apricot.jpg",
//         description: "An apricot is a fruit, or the tree that bears the fruit, of several species in the genus Prunus (stone fruits).",
//         price: 13.11            
//     },
//     { 
//         id: 8,
//         title: 'Plum',
//         imageUrl: "http://edaplus.info/food_pictures/plum.jpg",
//         description: "A plum is a fruit of the subgenus Prunus of the genus Prunus. ",
//         price: 18.17            
//     }
// ];

@Injectable()

export class ProductsService {

    verifyEditForm: boolean = false;
    productsData: IProduct[];
    activeProduct: IProduct;

    constructor(private http: Http) {

    }

    public productsData$ = new Subject<any>();

    getInitialData() {
        if(localStorage.productsData != undefined) {
            this.productsData = JSON.parse(localStorage.productsData);
        } else {
            this.dataServer('assets/server/data.json').subscribe(data => this.getData(data));
        }
    }
    
    dataServer(dataUrl?: string) {
        return this.http.request(dataUrl)
            .map(res => res.json());
    }

    getData(data?: IProduct[]) {
        localStorage.setItem('productsData', JSON.stringify(data));
        let dataLoacalStorage = localStorage.getItem('productsData');
        this.productsData = JSON.parse(dataLoacalStorage);
    }

    getProductId(id:number) {
        return this.productsData.find(product => product.id === id);
    }
    
    deleteProduct(product: IProduct) {
        this.productsData.splice(this.productsData.indexOf(product), 1);
        this.getData(this.productsData);
    }
    
    editButton(product: IProduct) {
        this.activeProduct = product;          
    }
    
    verifyProduct(verify: boolean) {
        this.verifyEditForm = verify;
    }

    saveEditForm(product: IProduct) {
        product.id = this.activeProduct.id;
        this.productsData.splice(this.productsData.indexOf(this.activeProduct), 1, product);
        this.getData(this.productsData);
    }

    saveCreateForm(product: IProduct) {
        console.log(product);
        console.log(this.productsData);
        
        product.id = this.productsData[this.productsData.length - 1].id + 1;
        this.productsData.push(product);
        this.getData(this.productsData);    
    }

}
