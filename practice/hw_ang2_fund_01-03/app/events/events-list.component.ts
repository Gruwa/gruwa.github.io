import { Component } from '@angular/core';

@Component({
    selector: 'events-list',
    templateUrl: '/app/events/events-list.component.html'
})
export class EventsListComponent {
    event1 = {
        id: 1,
        name: 'Angular Connect',
        date: '0/26/2036',
        time: '10:00 am',
        price: 599.9,
        imageUrl: '/app/assets/images/angularconnect-shield.png',
        location: {
            address: '1057 DT',
            city: 'London',
            country: 'England'
        }
    }

    
    logFoo(){
        console.log('Foo');
    }

    // handleEventClicked(data) {
    //     console.log('received:', data);
    // }
}