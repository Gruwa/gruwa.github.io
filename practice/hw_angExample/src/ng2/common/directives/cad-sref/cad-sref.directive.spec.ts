import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CadSref} from './cad-sref.directive';

const mocks = {
  $state: {
    href: sinon.stub(),
    go: sinon.stub()
  },
  $event: {
    preventDefault: sinon.stub()
  }
};

@Component({})
class TestCadSrefComponent {}

describe('UnityCommonModule ->', () => {
  describe('cadSref direcive ->', () => {
    let fixture: ComponentFixture<TestCadSrefComponent>;
    let anchorEl: DebugElement;

    const createComponent = (template) => {
      TestBed.configureTestingModule({
        declarations: [TestCadSrefComponent, CadSref],
        providers: [{
          provide: '$state',
          useValue: mocks.$state
        }]
      });
      TestBed.overrideComponent(TestCadSrefComponent, {set: {template}});
      fixture = TestBed.createComponent(TestCadSrefComponent);
      fixture.detectChanges();
      anchorEl = fixture.debugElement.query(By.css('a'));
    };

    afterEach(() => {
      mocks.$state.href.reset();
      mocks.$state.go.reset();
      mocks.$event.preventDefault.reset();
    });

    context('direcive appplied ->', () => {
      beforeEach(() => {
        mocks.$state.href.returns('http://some.url/');
        createComponent(`<a cadSref="state.name" [cadSrefParams]="{id: 12}" [cadSrefOpts]="{reload: true}"></a>`);
      });

      it('should set href attr', () => {
        expect(anchorEl.nativeElement.href).to.be.equal('http://some.url/');
      });

      it('should add class', () => {
        expect(anchorEl.nativeElement.classList.contains('cad-sref')).to.be.true;
      });
    });

    context('when element enabled ->', () => {
      beforeEach(() => {
        createComponent(`<a cadSref="state.name" [cadSrefParams]="{id: 12}" [cadSrefOpts]="{reload: true}"></a>`);
        anchorEl.triggerEventHandler('click', mocks.$event);
      });

      it('should prevent click event propagation', () => {
        expect(mocks.$event.preventDefault).to.be.calledOnce;
      });

      it('should change state', () => {
        expect(mocks.$state.go).to.be.calledOnce.and.calledWith('state.name', {id: 12}, {reload: true});
      });
    });

    context('when element disabled ->', () => {
      beforeEach(() => {
        mocks.$state.href.returns('http://some.url/');
        createComponent(`<a cadSref="state.name" [cadSrefParams]="{id: 12}" [disabled]="true"></a>`);
        anchorEl.triggerEventHandler('click', mocks.$event);
      });

      it('should not set href attr', () => {
        expect(anchorEl.nativeElement.href).to.be.equal('');
      });

      it('should not prevent click event propagation', () => {
        expect(mocks.$event.preventDefault).to.be.not.called;
      });

      it('should not change', () => {
        expect(mocks.$state.go).to.be.not.called;
      });
    });

  });
});
