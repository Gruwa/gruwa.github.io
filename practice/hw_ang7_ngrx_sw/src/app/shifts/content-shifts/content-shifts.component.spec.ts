import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {ContentShiftsComponent} from './content-shifts.component';
import {ShiftBlockComponent} from '../../shared/components/shift-block/shift-block.component';
import {PipeModule} from '../../shared/pipes/pipe.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ShiftsService} from '../services/shifts.service';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {CommonModule, Location} from '@angular/common';

class FakeShiftsService {
}

class FakeFLocalStorageService {
  retrieve = function (v) {
    return v;
  };
}

@Component({
  template: ''
})
class FakeDetailsShiftsComponent {
}

describe('ContentShiftsComponent', () => {
  let component: ContentShiftsComponent;
  let fixture: ComponentFixture<ContentShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PipeModule.forRoot(),
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {path: 'shifts/:item', component: FakeDetailsShiftsComponent}
        ])
      ],
      declarations: [
        ContentShiftsComponent,
        ShiftBlockComponent,
        FakeDetailsShiftsComponent
      ],
      providers: [
        {
          provide: ShiftsService,
          useClass: FakeShiftsService
        },
        {
          provide: LocalStorageService,
          useClass: FakeFLocalStorageService
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(ContentShiftsComponent);
    component = fixture.componentInstance;

    component.sortShifts = [
      {
        dateFormated: '13/04/2019',
        dateFrom: '',
        shifts: [
          {
            shiftID: '1',
            shiftTitle: '',
            station: '',
            isDropRequest: true,
            isPickupRequest: true,
            job: '',
            jobID: '',
            stationID: '',
            dateFrom: '',
            dateTo: '',
            location: '',
            locationID: ''
          }
        ]
      }
    ];
    fixture.detectChanges();
  }));

  it('should create', async (() => {
    expect(component).toBeTruthy();
  }));

  it('should go by url to FakeDetailsShiftsComponent',
    async(inject([Router, Location], (router: Router, location: Location) => {
      fixture.debugElement.query(By.css('.app-shift-block')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/shifts/1');
      });
    }))
  );
});

