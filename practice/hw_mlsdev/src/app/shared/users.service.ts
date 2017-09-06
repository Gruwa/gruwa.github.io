import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export interface IUser {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

@Injectable()

export class UsersService {
    
    dataUrl: string = 'https://api.github.com/users?since=135&per_page=1';

    constructor(private http: Http) {

    }


    dataGit(dataUrl?: string): Observable<IUser[]> {
        return this.http.get(dataUrl)
                .map((response: Response) => <IUser[]>response.json());
    }



    // getEvents() {
        
    //     return EVENTS;
    // }

    getEvent(id:number) {
        // return EVENTS.find(event => event.id === id);
    }

    // newEvents(event: IEvents) {
    //     if(EVENTS[EVENTS.length - 1] === undefined) {
    //         event.id = 1;
    //     } else {
    //         event.id = EVENTS[EVENTS.length - 1].id + 1;
    //     }
    //     event.items = [];
    //     EVENTS.push(event);
    // }

    // deleteEvent(event: IEvents) {
    //     EVENTS.splice(EVENTS.indexOf(event), 1);
    // }

    // newItems(item: IEventsItem, event: IEvents) {
    //     if(event.items[event.items.length - 1] === undefined) {
    //         item.id = 1;
    //     } else {
    //         item.id = event.items[event.items.length - 1].id + 1;
    //     }
    //     event.items.push(item);        
    // }

    // deleteItem(item: IEventsItem, event: IEvents) {
    //     let elementSearch = EVENTS[EVENTS.indexOf(event)].items;
    //     elementSearch.splice(elementSearch.indexOf(item), 1);
    // }
    
    // doneItemFunc(item: IEventsItem, done: boolean) {
    //     item.done = done;
    // }

    // starItemFunc(starItem: boolean, item: IEventsItem, event: IEvents) {
    //     if(starItem === true) {
    //         this.deleteItem(item, event);
    //         EVENTS[EVENTS.indexOf(event)].items.splice(0,0, item);
    //         item.star = starItem;
    //     }

    // }

    // searchItems(searchTerm: string) {
    //     let term = searchTerm.toLocaleLowerCase();
    //     let results: IEventsItem[] = [];

    //     EVENTS.forEach(event => {
    //         let matchingSessions = event.items.filter(
    //             item => item.name.toLocaleLowerCase().indexOf(term) > -1);
    //         matchingSessions = matchingSessions.map((item: any) => {
    //             item.eventId = event.id;
    //             return item;
    //         })
    //         results = results.concat(matchingSessions);
    //     })

    //     let emitter = new EventEmitter(true);
    //     setTimeout(() => {
    //         emitter.emit(results);
    //     }, 100);
        
    //     return emitter;
    // }

}