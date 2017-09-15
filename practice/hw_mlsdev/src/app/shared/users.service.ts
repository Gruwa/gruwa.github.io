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
    language?: string;
    owner?: {};
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

    setActiveUser(user: IData) {
        localStorage.setItem('activeUser', JSON.stringify(user));
    }

    getUserById(id:number) {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if(activeUser.id === id) {
            return activeUser;
        } else {
            return false;
        }
    }

    getActiveUser() {
       return JSON.parse(localStorage.getItem('activeUser'));
    }

    setActiveRepo(repo: IData) {
        localStorage.setItem('activeRepo', JSON.stringify(repo));
        console.log('df', localStorage);
        
    }

    getRepoById(id:number) {
        let activeRepo = JSON.parse(localStorage.getItem('activeRepo'));
        if(activeRepo.id === id) {
            return activeRepo;
        } else {
            return false;
        }
    }




}