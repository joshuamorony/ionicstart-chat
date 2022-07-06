import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Credentials } from '../../shared/interfaces/credentials';
import { CreateStatus } from '../create-modal.component';
import { passwordMatchesValidator } from '../utils/password-matches';

@Component({
  selector: 'app-create-form',
  template: `
    <form [formGroup]="createForm" (ngSubmit)="onSubmit()">
      <ion-item>
        <ion-label>email</ion-label>
        <ion-input
          formControlName="email"
          data-test="create-email-field"
          type="email"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>password</ion-label>
        <ion-input
          formControlName="password"
          data-test="create-password-field"
          type="password"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>confirm password</ion-label>
        <ion-input
          formControlName="confirmPassword"
          data-test="create-confirm-field"
          type="password"
        ></ion-input>
      </ion-item>
      <ion-badge
        data-test="validation-message"
        *ngIf="showValidationMessage$ | async"
      >
        Please supply a valid email address and a password that is at least 8
        characters long
      </ion-badge>
      <ion-badge
        data-test="create-error-message"
        *ngIf="createStatus === 'error'"
      >
        Oops! Could not create account with those details.
      </ion-badge>
      <ion-button
        data-test="create-button"
        type="submit"
        [disabled]="createStatus === 'creating'"
      >
        <ion-spinner *ngIf="createStatus === 'creating'"></ion-spinner>
        Create Account
      </ion-button>
    </form>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {
  @Input() createStatus!: CreateStatus;
  @Output() create = new EventEmitter<Credentials>();

  createForm = this.fb.group(
    {
      email: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.email],
      }),
      password: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.minLength(8)],
      }),
      confirmPassword: this.fb.control(''),
    },
    {
      validators: [passwordMatchesValidator],
    }
  );

  showValidationMessage$ = this.createForm.statusChanges.pipe(
    map((status) => status === 'INVALID')
  );

  constructor(private fb: FormBuilder) {}

  protected onSubmit() {
    if (!this.createForm.valid) {
      return;
    }

    const { confirmPassword, ...credentials } = this.createForm.value;
    this.create.emit(credentials as Credentials);
  }
}

@NgModule({
  declarations: [CreateFormComponent],
  exports: [CreateFormComponent],
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class CreateFormComponentModule {}
