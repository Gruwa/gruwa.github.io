import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';
import {ShiftBlockComponent} from './shift-block.component';
import {PipeModule} from '../../pipes/pipe.module';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import * as moment from 'moment';

describe('ShiftBlockComponent', () => {
  let component: ShiftBlockComponent;
  let fixture: ComponentFixture<ShiftBlockComponent>;
  let debugElement: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          PipeModule.forRoot(),
          RouterTestingModule
        ],
        declarations: [ShiftBlockComponent]
      })
      .compileComponents();
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(ShiftBlockComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
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

  it('should create ShiftBlockComponent', async(() => {
      expect(component).toBeTruthy();
    })
  );

  it('should be JOB for ShiftBlockComponent', async(() => {
      debugElement = fixture.debugElement.query(By.css('.shift-block__job'));
      el = debugElement.nativeElement;

      fixture.detectChanges();

      expect(el.textContent).toContain(component.shift.job);
    })
  );

  it('should be dateFrom and dateTo for ShiftBlockComponent', async(() => {
      debugElement = fixture.debugElement.query(By.css('.shift-block__date-from'));
      el = debugElement.nativeElement;

      fixture.detectChanges();

      expect(el.textContent).toContain(
        moment(component.shift.dateFrom).format('h:mm A') + ' - '
        + moment(component.shift.dateTo).format('h:mm A'));
    })
  );

  it('should be location for ShiftBlockComponent', async(() => {
      debugElement = fixture.debugElement.query(By.css('.shift-block__date-loc'));
      el = debugElement.nativeElement;

      fixture.detectChanges();

      expect(el.textContent).toContain(component.shift.location);
    })
  );

  it('should be display point with isPickupRequest for ShiftBlockComponent', async(() => {
      debugElement = fixture.debugElement.query(By.css('.shift-block__point'));

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(debugElement.classes['shift-block__display-true']).toEqual(component.shift.isPickupRequest);
      });
    })
  );
});

describe('ShiftBlockComponent', () => {
  let component: ShiftBlockComponent;
  let fixture: ComponentFixture<ShiftBlockComponent>;
  let debugElement: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          PipeModule.forRoot(),
          RouterTestingModule
        ],
        declarations: [ShiftBlockComponent]
      })
      .compileComponents();
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(ShiftBlockComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.variable = true;
    component.shift = {
      shiftID: '1',
      shiftTitle: '',
      station: '',
      isDropRequest: true,
      isPickupRequest: false,
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

  it('should create ShiftBlockComponent', async(() => {
      expect(component).toBeTruthy();
    })
  );

  it('should be display point with isDropRequest for ShiftBlockComponent', async(() => {
      debugElement = fixture.debugElement.query(By.css('.shift-block__point'));

      fixture.detectChanges();

      expect(debugElement.classes['shift-block__display-true']).toEqual(component.shift.isDropRequest);
    })
  );
});
