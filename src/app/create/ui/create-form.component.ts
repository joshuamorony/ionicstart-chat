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
import { Credentials } from '../../shared/interfaces/credentials';
import { CreateStatus } from '../create-modal.component';
import { passwordMatchesValidator } from '../utils/password-matches';

@Component({
  selector: 'app-create-form',
  template: `
    <form [formGroup]="createForm" (ngSubmit)="onSubmit()" #form="ngForm">
      <ion-item>
        <ion-label>email</ion-label>
        <ion-input
          formControlName="email"
          data-test="create-email-field"
          type="email"
        ></ion-input>
      </ion-item>
      <ion-badge
        data-test="email-validation"
        *ngIf="
          (createForm.controls.email.dirty || form.submitted) &&
          !createForm.controls.email.valid
        "
      >
        Please provide a valid email
      </ion-badge>
      <ion-item>
        <ion-label>password</ion-label>
        <ion-input
          formControlName="password"
          data-test="create-password-field"
          type="password"
        ></ion-input>
      </ion-item>
      <ion-badge
        data-test="password-validation"
        *ngIf="
          (createForm.controls.password.dirty || form.submitted) &&
          !createForm.controls.password.valid
        "
      >
        Password must be at least 8 characters long
      </ion-badge>
      <ion-item>
        <ion-label>confirm password</ion-label>
        <ion-input
          formControlName="confirmPassword"
          data-test="create-confirm-field"
          type="password"
        ></ion-input>
      </ion-item>
      <ion-badge
        data-test="confirm-password-validation"
        *ngIf="
          (createForm.controls.confirmPassword.dirty || form.submitted) &&
          createForm.hasError('passwordMatch')
        "
      >
        Must match password field
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
        expand="full"
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
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      updateOn: 'blur',
      validators: [passwordMatchesValidator],
    }
  );

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.createForm.valid) {
      const { confirmPassword, ...credentials } = this.createForm.value;
      this.create.emit(credentials as Credentials);
    }
  }
}

@NgModule({
  declarations: [CreateFormComponent],
  exports: [CreateFormComponent],
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class CreateFormComponentModule {}
