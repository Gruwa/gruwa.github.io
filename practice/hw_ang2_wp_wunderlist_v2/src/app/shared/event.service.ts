import { setTimeout } from 'timers';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { EventEmitter, Inject, Injectable } from '@angular/core';

@Injectable()

export class EventService {
    
        doneItem: boolean = false; 
        hideItem: boolean;
        starItem: boolean = false;

    getEvents() {
        return EVENTS;
    }

    getEvent(id:number) {
        return EVENTS.find(event => event.id === id);
    }

    newEvents(event: IEvents) {
        if(EVENTS[EVENTS.length - 1] === undefined) {
            event.id = 1;
        } else {
            event.id = EVENTS[EVENTS.length - 1].id + 1;
        }
        event.items = [];
        EVENTS.push(event);
    }

    deleteEvent(event: IEvents) {
        EVENTS.splice(EVENTS.indexOf(event), 1);
    }

    newItems(item: IEventsItem, event: IEvents) {
        if(event.items[event.items.length - 1] === undefined) {
            item.id = 1;
        } else {
            item.id = event.items[event.items.length - 1].id + 1;
        }
        event.items.push(item);        
    }

    deleteItem(item: IEventsItem, event: IEvents) {
        let elementSearch = EVENTS[EVENTS.indexOf(event)].items;
        elementSearch.splice(elementSearch.indexOf(item), 1);
    }
    
    doneItemFunc(item: IEventsItem, done: boolean) {
        item.done = done;
    }

    starItemFunc(starItem: boolean, item: IEventsItem, event: IEvents) {
        if(starItem === true) {
            this.deleteItem(item, event);
            EVENTS[EVENTS.indexOf(event)].items.splice(0,0, item);
            item.star = starItem;
        }

    }

    searchItems(searchTerm: string) {
        let term = searchTerm.toLocaleLowerCase();
        let results: IEventsItem[] = [];

        EVENTS.forEach(event => {
            let matchingSessions = event.items.filter(
                item => item.name.toLocaleLowerCase().indexOf(term) > -1);
            matchingSessions = matchingSessions.map((item: any) => {
                item.eventId = event.id;
                return item;
            })
            results = results.concat(matchingSessions);
        })

        let emitter = new EventEmitter(true);
        setTimeout(() => {
            emitter.emit(results);
        }, 100);
        
        return emitter;
    }

}

export interface IEventsItem {
    id: number;
    name: string;
    done?: boolean;
    star?: boolean;
}

export interface IEvents {
    id: number;
    name: string;
    items: IEventsItem[];
}



const EVENTS = [
    { 
    id: 1,
    name: 'Food',
    items: [
        {
        id: 1,
        name: "Using Angular 4 Pipes"            
        },
        {
        id: 2,
        name: "Getting the most out of your dev team"
        },
        {
        id: 3,
        name: "Angular 4 Performance Metrics"
        },
        {
        id: 4,
        name: "Angular 5 Look Ahead"
        },
        {
        id: 5,
        name: "Basics of Angular 4"
        }
    ]
    },
    { 
    id: 2,
    name: 'Home',
    items: [
        {
        id: 1,
        name: "Testing Angular 4 Workshop"
        },
        {
        id: 2,
        name: "Angular 4 and Firebase"
        },
        {
        id: 3,
        name: "Reading the Angular 4 Source",
        presenter: "Patrick Stapleton"
        },
        {
        id: 4,
        name: "Hail to the Lukas",
        presenter: "Lukas Ruebbelke"
        }
    ]
    },
    { 
    id: 3,
    name: 'Work',
    items: [
        {
        id: 1,
        name: "How Elm Powers Angular 4"
        },
        {
        id: 2,
        name: "Angular and React together"
        },
        {
        id: 3,
        name: "Redux Woes"
        },
        {
        id: 4,
        name: "ng-wat again!!"
        },
        {
        id: 5,
        name: "Dressed for Success"
        },
        {
        id: 6,
        name: "These aren't the directives you're looking for"
        }
    ]
    },
    { 
    id: 4,
    name: 'Angular',
    items: [
        {
        id: 1,
        name: "Diversity in Tech"
        },
        {
        id: 2,
        name: "World Peace and Angular"
        },
        {
        id: 3,
        name: "Using Angular with Androids"
        }
    ]
    },
    { 
    id: 5,
    name: 'React',
    items: [
        {
        id: 1,
        name: "Gambling with Angular"
        },
        {
        id: 2,
        name: "Angular 4 in 60ish Minutes"
        }
    ]
    },
    { 
    id: 6,
    name: 'JS',
    items: [
        {
        id: 1,
        name: "Angular JS"
        },
        {
        id: 2,
        name: "Angular and React together"
        },
        {
        id: 3,
        name: "Redux Woes"
        },
        {
        id: 4,
        name: "Angular 2"
        },
        {
        id: 5,
        name: "Angular 4"
        },
        {
        id: 6,
        name: "These aren't the directives you're looking for"
        }
    ]
    }
];


// export interface ITest {
//     a: number;
//     b: number;
//     c?: string;
//     d?: number;
//     e?: string;
// }

// let somevar: ITest;

// somevar = {
//     b: 2,
//     e: 'testtest',
//     a: 1
// };

// function someFunc(a: string, b: string, c: number = 3, d?: string): void {
//    console.log(c);
// }

// someFunc('str', 'str', undefined, 'str');

