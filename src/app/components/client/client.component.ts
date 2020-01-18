import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientForm: FormGroup;
  friendArray: FormArray; // TODO: maybe change name
  SNACKBAR_DURATION = 5000;
  SNACKBAR_SUCCESS_MESSAGE = 'Client saved!';
  SNACKBAR_DISMISS_MESSAGE = 'Dismiss';

  constructor(
    private fb: FormBuilder,
    private clientSvc: ClientService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  get friendControls(): AbstractControl[] {
    return this.friendArray.controls;
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: [null],
      age: [null],
      weight: [null],
      friends: this.fb.array([this.createItem()])
    });

    this.friendArray = this.clientForm.get('friends') as FormArray;
  }

  onSubmit(): void {
    this.clientSvc.addClient(this.clientForm.value);
    this.openSnackBar();
    this.resetPage();
  }

  resetPage(): void {
    this.clientForm.reset();
    this.removeAllButOneFriend();
  }

  createItem(): FormGroup {
    return this.fb.group({
      friend: [null]
    });
  }

  addFriend(): void {
    this.friendArray.push(this.createItem());
  }

  resetFields(): void {
    this.resetPage();
  }

  removeLastFriend(): void {
    this.friendArray.removeAt(this.friendControls.length - 1); // TODO: what happens if we remove too many (there are not any left)?
  }

  removeAllButOneFriend(): void {
    for (let i = this.friendArray.length - 1; i >= 1; i--) {
      this.friendArray.removeAt(i);
    }
  }

  openSnackBar() { // TODO: consider adding this to the client service
    this.snackBar.open(this.SNACKBAR_SUCCESS_MESSAGE, this.SNACKBAR_DISMISS_MESSAGE, {
      duration: this.SNACKBAR_DURATION,
    });
  }
}
