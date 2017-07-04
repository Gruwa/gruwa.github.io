import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IProduct } from './product';

@Injectable()

export class ProductService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) {}
    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
        .map((response: Response) => <IProduct[]> response.json())
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    private handleError(error: Response) {// private говорит о том , что метод приватный
        console.error(error);
        return Observable.throw(error.json().error || 'Server error'); // Observable => наблюдаемый (наблюдать объект), этот объект находится в центре с набором оператаров для работы с ним, из библиотеки rxjs для работы с асинхронными потоками данных, все для функционального и реактивного программирования => будущее JS
    }
}
