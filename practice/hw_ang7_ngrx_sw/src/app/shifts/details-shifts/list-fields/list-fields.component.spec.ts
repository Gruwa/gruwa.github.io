import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListFieldsComponent} from './list-fields.component';
import {PipeModule} from '../../../shared/pipes/pipe.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {FlowService} from '../../../shared/services/flow.service';
import {DataService} from '../../../shared/services/data.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

class FakeFlowService {
}

class FakeDataService {
  public LOCAL_STORAGE: object = {
    'group': 'group',
    tab: 'tab',
    'token': 'token',
    'user': 'user',
    'tabavailability': 'tabavailability'
  };

  public LIST_FIELDS = {
    title: 'fake title',
    date: 'date',
    startTime: 'start time',
    endTime: 'end time',
    location: 'location',
    station: 'station',
    jobTitle: 'job title',
    status: 'status'
  };
}

describe('ListFieldsComponent', () => {
  let component: ListFieldsComponent;
  let fixture: ComponentFixture<ListFieldsComponent>;
  let debugElement: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PipeModule.forRoot(),
        RouterTestingModule,
        NgxWebstorageModule.forRoot(),
      ],
      declarations: [ListFieldsComponent],
      providers: [
        {
          provide: FlowService,
          useClass: FakeFlowService
        },
        {
          provide: DataService,
          useClass: FakeDataService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(ListFieldsComponent);
    component = fixture.componentInstance;
    component.shift = {
      shiftID: '1',
      shiftTitle: '',
      station: '',
      isDropRequest: false,
      isPickupRequest: true,
      job: 'Faker',
      jobID: '',
      stationID: '',
      dateFrom: 'Apr 13 2018 11:11:11',
      dateTo: 'Apr 13 2019 13:13:13',
      location: 'fake location',
      locationID: ''
    };

    fixture.detectChanges();
  }));

  it('should create ListFieldsComponent', async (() => {
    expect(component).toBeTruthy();
  }));

  it('should be title with capitalizeFirst pipe for ListFieldsComponent', async(() => {
      debugElement = fixture.debugElement.query(By.css('.list-fields__label'));
      el = debugElement.nativeElement;

      fixture.detectChanges();

      expect(el.textContent).toContain('Fake title');
    })
  );

  it('should be location with capitalizeFirst pipe for ListFieldsComponent', async(() => {
      debugElement = fixture.debugElement.query(By.css('.list-fields__value'));
      el = debugElement.nativeElement;

      fixture.detectChanges();

      expect(el.textContent).toContain('Fake location');
    })
  );
});
