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
  // forms
  clientForm: FormGroup;
  @ViewChild(FormGroupDirective, {static: false}) formRef: FormGroupDirective;

  // form controls
  nameCtrl: AbstractControl;
  ageCtrl: AbstractControl;
  weightCtrl: AbstractControl;
  friendCtrls: FormArray;

  // constants
  private readonly SNACKBAR_DURATION = 5000;
  private readonly SNACKBAR_SUCCESS_MESSAGE = 'Client saved!';
  private readonly SNACKBAR_DISMISS_MESSAGE = 'Dismiss';

  constructor(
    private fb: FormBuilder,
    private clientSvc: ClientService,
    private snackBar: MatSnackBar) {
  }

  /** returns an array of friend controls.
   * these can be added and removed by the "Add friend" button */
  get friendControls(): AbstractControl[] {
    return this.friendCtrls.controls;
  }

  ngOnInit(): void {
    this.initializeFormsAndControls();
  }

  /** initializes the clientForm and any necessary controls */
  private initializeFormsAndControls(): void {
    this.initClientForm();
    this.initClientControls();
  }

  private initClientForm(): void {
    this.clientForm = this.fb.group({
      name: [null, Validators.required],
      age: [null, Validators.required],
      weight: [null, Validators.required],
      friends: this.fb.array([])
    });
  }

  private initClientControls(): void {
    this.nameCtrl = this.clientForm.get('name');
    this.ageCtrl = this.clientForm.get('age');
    this.weightCtrl = this.clientForm.get('weight');
    this.friendCtrls = this.clientForm.get('friends') as FormArray;
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
  private openSnackbar(): void { // TODO: consider adding this to the client service
    this.snackBar.open(this.SNACKBAR_SUCCESS_MESSAGE, this.SNACKBAR_DISMISS_MESSAGE, {
      duration: this.SNACKBAR_DURATION,
    });
  }

  /** resets all form fields to pre-submit states and removes any friend fields added by the user */
  resetPage(): void {
    this.formRef.resetForm();
    this.clientForm.reset();
    this.removeAllFriendFields();
  }

  /** removes all Friend fields added by the user.
   * used when the page is reset */
  private removeAllFriendFields(): void {
    while (this.hasFriends()) {
      this.friendCtrls.removeAt(0);
    }
  }

  /** returns whether any friend fields have been added by the user */
  hasFriends(): boolean {
    return this.friendCtrls.length > 0;
  }

  /** adds a Friend form to the friendArray when the "Add friend" button is selected */
  addFriendField(): void {
    this.friendCtrls.push(this.createItem());
  }

  /** removes the last-added Friend field */
  removeLastFriendField(): void {
    this.friendCtrls.removeAt(this.friendCtrls.length - 1);
  }
}
