import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsComponent } from './analytics.component';
import { BarGraphComponent } from '../bar-graph/bar-graph.component';
import { By } from '@angular/platform-browser';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;
  let h3Info: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticsComponent, BarGraphComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    h3Info = fixture.nativeElement.querySelector('h3.info-missing');
    fixture.detectChanges();
  });

  it('should create the AnalyticsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a client information header', () => {
    expect(h3Info).toBeDefined();
  });

  it('should not contain the button container on page load', () => {
    expect(fixture.debugElement.query(By.css('.button-container'))).toBeNull();
  });

  // TODO: test when clients are populated

  // TODO: test when clients are not populated

  // TODO: handle various handleModeSelected scenarios

  // TODO: test that the three buttons appear on the page

  // TODO: test that app-bar-graph appears on the page

  // TODO: test that the selected mode header appears on the page

  // TODO: test the handleModeSelected calls updateChartData
});
