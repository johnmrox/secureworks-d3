import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  // TODO: arrange these properly
  clientForm: FormGroup;
  friendArray: FormArray; // TODO: maybe change name
  name: AbstractControl;
  age: AbstractControl;
  weight: AbstractControl;
  friends: AbstractControl;

  @ViewChild(FormGroupDirective, {static: false}) formRef: FormGroupDirective;

  private readonly SNACKBAR_DURATION = 5000;
  private readonly SNACKBAR_SUCCESS_MESSAGE = 'Client saved!';
  private readonly SNACKBAR_DISMISS_MESSAGE = 'Dismiss';

  constructor(
    private fb: FormBuilder,
    private clientSvc: ClientService,
    private snackBar: MatSnackBar) {
  }

  /** returns an array of the friend controls. there is one initially on the page
   * but these can be added and removed by the "Add friend" button */
  get friendControls(): AbstractControl[] {
    return this.friendArray.controls;
  }

  ngOnInit(): void {
    this.initializeFormsAndControls();
  }

  /** initializes the clientForm and any needed controls */
  private initializeFormsAndControls(): void {
    this.clientForm = this.fb.group({
      name: [null, Validators.required],
      age: [null, Validators.required],
      weight: [null, Validators.required],
      friends: this.fb.array([])
    });

    this.friendArray = this.clientForm.get('friends') as FormArray;
    this.name = this.clientForm.get('name');
    this.age = this.clientForm.get('age');
    this.weight = this.clientForm.get('weight');
    this.friends = this.clientForm.get('friends');
  }

  /** creates a form group for the friends form array on page load and when the
   * "Add friend" button is selected */
  private createItem(): FormGroup {
    return this.fb.group({
      friend: [null, Validators.required]
    });
  }

  /** when the "Save" button is selected, saves client data, resets the page to its original state,
   * and displays a success snackbar */
  onSubmit(): void {
    this.clientSvc.addClient(this.clientForm.value);
    this.openSnackbar();
    this.resetPage();
  }

  /** displays a success snackbar when the data is saved */
  private openSnackbar() { // TODO: consider adding this to the client service
    this.snackBar.open(this.SNACKBAR_SUCCESS_MESSAGE, this.SNACKBAR_DISMISS_MESSAGE, {
      duration: this.SNACKBAR_DURATION,
    });
  }

  /** resets all form fields and removes any Friend fields added by the user */
  resetPage(): void {
    this.formRef.resetForm();
    this.clientForm.reset();
    this.removeAllFriendFields();
  }

  /** removes all Friend fields added by the user.
   * used when the page is reset */
  private removeAllFriendFields(): void {
    while (this.friendArray.length) {
      this.friendArray.removeAt(0);
    }
  }

  /** adds a Friend form to the friendArray when the "Add friend" button is selected */
  addFriendField(): void {
    this.friendArray.push(this.createItem());
  }

  /** removes the last-added Friend field */
  removeLastFriendField(): void {
    this.friendArray.removeAt(this.friendControls.length - 1);
  }
}
