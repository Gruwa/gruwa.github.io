import {PanelComponent} from './panel.component';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Pipe, NO_ERRORS_SCHEMA} from '@angular/core';

@Pipe({name: 'translate'})
class FakeTranslatePipe {}

describe('PanelComponent component', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;
  // let svg: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelComponent, FakeTranslatePipe],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    // svg = fixture.nativeElement.querySelector('svg');
  });

  it('should create component', () => {
    expect(component).to.be.not.undefined;
  });

  it('should have "disabled" field set to false by default', () => {
    expect(component.disabled).to.be.false;
  });

  describe('toggle()', () => {
    it('should change "isOpen" prop', () => {
      component.isOpen = false;
      component.toggle();
      expect(component.isOpen).to.be.true;
    });

    it('should emit change events', () => {
      const spyChange = sinon.spy(component.isOpenChange, 'emit');
      const spyOpen = sinon.spy(component.onOpen, 'emit');
      const spyClose = sinon.spy(component.onClose, 'emit');

      component.isOpen = false;
      component.toggle();
      expect(spyChange).calledWith(true);
      expect(spyOpen).calledOnce;

      component.toggle();
      expect(spyClose).calledOnce;
    });

    context('when component is disabled', () => {
      beforeEach(() => {
        component.disabled = true;
      });

      it('should not change "isOpen" prop', () => {
        component.isOpen = false;
        component.toggle();
        expect(component.isOpen).to.be.false;
      });

      it('should not emit change events', () => {
        const spyChange = sinon.spy(component.isOpenChange, 'emit');
        const spyOpen = sinon.spy(component.onOpen, 'emit');
        const spyClose = sinon.spy(component.onClose, 'emit');

        component.toggle();
        expect(spyChange).not.called;
        expect(spyOpen).not.called;
        expect(spyClose).not.called;
      });
    });
  });

  describe('stopEventPropagation()', () => {
    it('should stop event propogation', () => {
      const e: any = {stopPropagation: sinon.stub()};
      component.stopEventPropagation(e);
      expect(e.stopPropagation).calledOnce;
    });
  });
});
