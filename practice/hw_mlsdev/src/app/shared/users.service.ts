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
    avatar_url?: string;
    login?: string;
}

@Injectable()
export class UsersService {
    
    public activeUser$ = new Subject<any>();
      
    public dataGitUser$ = new Subject<any>();
    usersList: IData[];
    dataUrl: string;
    repo: IData;

    constructor(private http: Http) {

    }

    usersDataFromGitApi(dataUrl?: string): Observable<IData[]> {
        return this.http.get(dataUrl)
                .map((response: Response) => <IData[]>response.json());
    }

    dataActiveUserFromGitApi(dataUrl?: string): Observable<IData> {
        return this.http.get(dataUrl)
                .map((response: Response) => <IData>response.json());
    }



    userFunc(user: IData) {
        localStorage.setItem('activeUser', JSON.stringify(user));
    }

    getEvent(id:number) {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        return activeUser.id === id;
    }


    gitUsersList(eventData: any) {
        this.usersList = eventData;
        console.log('service', this.usersList);
        
    }


}