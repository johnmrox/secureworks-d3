import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {MatToolbarModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ MatToolbarModule, RouterTestingModule ],
      providers: [
        { provide: Router, useValue: router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header', () => {
    expect(component).toBeTruthy();
  });

  it ('should navigate to the home component', () => {
    component.navigateHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it ('should navigate to the clients component', () => {
    component.navigateToClients();
    expect(router.navigate).toHaveBeenCalledWith(['/clients']);
  });

  it ('should navigate to the analytics component', () => {
    component.navigateToAnalytics();
    expect(router.navigate).toHaveBeenCalledWith(['/analytics']);
  });

  it('should contain the toolbar element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar')).toBeDefined();
  });

  it('should contain a nav element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav')).toBeDefined();
  });

  it('should contain two buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button').length).toBe(2);
  });

  it('should render the Add Client button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[0].textContent).toContain('Add Client');
  });

  it('should render the Analytics button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[1].textContent).toContain('Analytics');
  });

  it('should render the logo div', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.logo')).toBeDefined();
    expect(compiled.querySelector('.logo').textContent).toContain('Client App');
  });
});
