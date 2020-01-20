import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComponent } from './client.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {AbstractControl, FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientComponent ],
      imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatSnackBarModule, MatInputModule, MatButtonModule, BrowserAnimationsModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the client component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a name form control', () => {
    expect(component.nameCtrl).toBeDefined();
    expect(component.nameCtrl instanceof AbstractControl).toBeTruthy();
  });

  it('should have an age form control', () => {
    expect(component.ageCtrl).toBeDefined();
    expect(component.ageCtrl instanceof AbstractControl).toBeTruthy();
  });

  it('should have a weight form control', () => {
    expect(component.weightCtrl).toBeDefined();
    expect(component.weightCtrl instanceof AbstractControl).toBeTruthy();
  });

  it('should have a friends form control array', () => {
    expect(component.friendCtrls).toBeDefined();
    expect(component.friendCtrls instanceof FormArray).toBeTruthy();
  });

  it('should have a client form', () => {
    expect(component.clientForm).toBeDefined();
    expect(component.clientForm instanceof FormGroup).toBeTruthy();
  });

  it('should contain four buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button').length).toBe(4);
  });

  it('should render the Add Client button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[0].textContent).toContain('Save');
  });

  it('should render the Add Client button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[1].textContent).toContain('Reset');
  });

  it('should render the Add Client button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[2].textContent).toContain('Add friend');
  });

  it('should render the Add Client button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[3].textContent).toContain('Remove last friend');
  });

  it('should contain a Material Card Header element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-header')).toBeDefined();
  });

  it('should contain a Material Card Title element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title')).toBeDefined();
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Client Information');
  });

  it('should contain a Material Card Subtitle element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-subtitle')).toBeDefined();
    expect(compiled.querySelector('mat-card-subtitle').textContent).toContain('Enter details');
  });

  it('should contain a Material Card Content element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-content')).toBeDefined();
  });

  it('should contain a form', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('form')).toBeDefined();
  });

  it('should contain three Material Form Fields', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-form-field').length).toBe(3);
  });

  // TODO: test the functionality of the "Add friend" button
  // it('should be able to add Material Form Fields', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   component.addFriendField();
  //   expect(compiled.querySelectorAll('mat-form-field').length).toBe(4);
  // }); TODO: this is not working. maybe use tick and fakeAsync like here? https://stackoverflow.com/questions/39514679/test-an-async-pipetransform

  // TODO: test the functionality of the "Save" button

  // TODO: test the functionality of the "Reset" button

  // TODO: test the functionality of the "Remove last friend" button
});
