import {StatusComponent} from './status.component';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Pipe} from '@angular/core';

@Pipe({name: 'translate'})
class FakeTranslatePipe {
  transform() {} // tslint:disable-line
}

describe('StatusComponent', () => {
  let status: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusComponent, FakeTranslatePipe]
    });
    fixture = TestBed.createComponent(StatusComponent);
    status = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(status).to.be.not.undefined;
  });

});
