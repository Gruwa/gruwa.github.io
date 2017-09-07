import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export interface IData {
    url?: string;
    id?: number;
    location?: string;
    name?: string;
    repos_url?: string;
}

@Injectable()
export class UsersService {
    
    dataUrl: string;
    user: IData;
    repo: IData;

    constructor(private http: Http) {

    }

    dataGit(dataUrl?: string): Observable<IData[]> {
        return this.http.get(dataUrl)
                .map((response: Response) => <IData[]>response.json());
    }

    userFunc(user: IData) {
        this.user = user
    }

    getEvent(id:number) {
        return this.user.id === id;
    }
}