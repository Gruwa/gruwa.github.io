import {IconComponent} from './icon.component';
import {TestBed, ComponentFixture} from '@angular/core/testing';

describe('IconComponent', () => {
  let icon: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let svg: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [IconComponent]});
    fixture = TestBed.createComponent(IconComponent);
    icon = fixture.componentInstance;
    svg = fixture.nativeElement.querySelector('svg');
  });

  it('should create component', () => {
    expect(icon).to.be.not.undefined;
  });

  it('should have proper classes', () => {
    icon.name = 'foo';
    icon.customClass = 'azaza';
    fixture.detectChanges();
    expect(svg.classList.contains('icon')).to.be.true;
    expect(svg.classList.contains('icon-foo')).to.be.true;
    expect(svg.classList.contains('azaza')).to.be.true;
  });

  it('should have proper styles set', () => {
    icon.width = '123';
    icon.height = '456';
    icon.fill = 'rgb(255, 0, 0)';
    fixture.detectChanges();
    expect(svg.style.width).to.equal('123px');
    expect(svg.style.height).to.equal('456px');
    expect(svg.style.fill).to.equal('rgb(255, 0, 0)');
  });

  it('should have proper <use>', () => {
    icon.name = 'foo';
    fixture.detectChanges();
    expect(svg.querySelector('use').getAttribute('xlink:href')).to.equal('#icon-foo');
  });
});
