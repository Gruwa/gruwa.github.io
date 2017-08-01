import { Injectable } from '@angular/core';

@Injectable()
export class EventService {
    getEvents() {
        return EVENTS;
    }

    getEvent(id:number) {
        return EVENTS.find(event => event.id === id);
    }

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
