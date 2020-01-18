import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';
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
  private readonly SNACKBAR_DURATION = 5000;
  private readonly SNACKBAR_SUCCESS_MESSAGE = 'Client saved!';
  private readonly SNACKBAR_DISMISS_MESSAGE = 'Dismiss';

  constructor(
    private fb: FormBuilder,
    private clientSvc: ClientService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  /** returns an array of the friend controls. there is one initially on the page
   * but these can be added and removed by the "Add friend" button */
  get friendControls(): AbstractControl[] {
    return this.friendArray.controls;
  }

  ngOnInit(): void {
    this.initializeForms();
  }

  /** initializes the clientForm and any needed controls */
  private initializeForms(): void {
    this.clientForm = this.fb.group({
      name: [null],
      age: [null],
      weight: [null],
      friends: this.fb.array([this.createItem()])
    });

    this.friendArray = this.clientForm.get('friends') as FormArray;
  }

  /** creates a form group for the friends form array on page load and when the
   * "Add friend" button is selected */
  private createItem(): FormGroup {
    return this.fb.group({
      friend: [null]
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
    this.clientForm.reset();
    this.removeAllButFirstFriend();
  }

  /** removes all Friend fields except the one initialized on page load.
   * used when the page is reset */
  private removeAllButFirstFriend(): void {
    for (let i = this.friendArray.length - 1; i >= 1; i--) {
      this.friendArray.removeAt(i);
    }
  }

  /** adds a Friend form to the friendArray when the "Add friend" button is selected */
  addFriend(): void {
    this.friendArray.push(this.createItem());
  }

  /** removes the last-added Friend field */
  removeLastFriend(): void {
    this.friendArray.removeAt(this.friendControls.length - 1); // TODO: what happens if we remove too many (there are not any left)?
  }
}
