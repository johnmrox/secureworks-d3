import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientComponent } from './client.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let form: HTMLElement;
  let matCardContent: HTMLElement;
  let matCardTitle: HTMLElement;
  let matCardSubtitle: HTMLElement;
  let matCardHeader: HTMLElement;
  let buttons: HTMLElement[];
  let matFormFields: HTMLElement[];

  // TODO: provide clientService stub
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientComponent],
      imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    form = fixture.nativeElement.querySelector('form');
    matCardContent = fixture.nativeElement.querySelector('mat-card-content');
    matCardTitle = fixture.nativeElement.querySelector('mat-card-title');
    matCardSubtitle = fixture.nativeElement.querySelector('mat-card-subtitle');
    matCardHeader = fixture.nativeElement.querySelector('mat-card-header');
    buttons = fixture.nativeElement.querySelectorAll('button');
    matFormFields = fixture.nativeElement.querySelectorAll('mat-form-field');
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
    expect(buttons.length).toBe(4);
  });

  it('should render the Add client button', () => {
    expect(buttons[0].textContent).toContain('Save');
  });

  it('should render the Reset button', () => {
    expect(buttons[1].textContent).toContain('Reset');
  });

  it('should render the Add friend button', () => {
    expect(buttons[2].textContent).toContain('Add friend');
  });

  it('should render the Remove last friend button', () => {
    expect(buttons[3].textContent).toContain('Remove last friend');
  });

  it('should contain a Material Card Header element', () => {
    expect(matCardHeader).toBeDefined();
  });

  it('should contain a Material Card Title element', () => {
    expect(matCardTitle).toBeDefined();
    expect(matCardTitle.textContent).toContain('Client Information');
  });

  it('should contain a Material Card Subtitle element', () => {
    expect(matCardSubtitle).toBeDefined();
    expect(matCardSubtitle.textContent).toContain('Enter details');
  });

  it('should contain a Material Card Content element', () => {
    expect(matCardContent).toBeDefined();
  });

  it('should contain a form', () => {
    expect(form).toBeDefined();
  });

  it('should contain three Material Form Fields', () => {
    expect(matFormFields.length).toBe(3);
  });

  // TODO: test the functionality of the "Add friend" button

  // TODO: test the functionality of the "Save" button

  // TODO: test the functionality of the "Reset" button

  // TODO: test the functionality of the "Remove last friend" button

  // TODO: test the functionality of the client services's addClient method
});
