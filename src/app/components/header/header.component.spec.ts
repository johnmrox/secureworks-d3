import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {MatToolbarModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let nav: HTMLElement;
  let logo: HTMLElement;
  let matToolbar: HTMLElement;
  let buttons: HTMLElement[];
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
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    nav = fixture.nativeElement.querySelector('nav');
    logo = fixture.nativeElement.querySelector('.logo');
    buttons = fixture.nativeElement.querySelectorAll('button');
    matToolbar = fixture.nativeElement.querySelectorAll('mat-toolbar');
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
    expect(matToolbar).toBeDefined();
  });

  it('should contain a nav element', () => {
    expect(nav).toBeDefined();
  });

  it('should contain two buttons', () => {
    expect(buttons.length).toBe(2);
  });

  it('should render the Add Client button', () => {
    expect(buttons[0].textContent).toContain('Add Client');
  });

  it('should render the Analytics button', () => {
    expect(buttons[1].textContent).toContain('Analytics');
  });

  it('should render the logo', () => {
    expect(logo).toBeDefined();
    expect(logo.textContent).toContain('Client App');
  });
});
