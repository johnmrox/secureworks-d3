import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let h3: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    h3 = fixture.nativeElement.querySelector('h3');
    fixture.detectChanges();
  });

  it('should create the PageNotFoundComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the page not found message', () => {
    expect(h3).toBeDefined();
    expect(h3.textContent).toContain('This page was not found');
  });
});
