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
      <ion-item lines="none">
        <ion-icon color="light" slot="start" name="mail-outline"></ion-icon>
        <ion-input
          formControlName="email"
          data-test="create-email-field"
          type="email"
          placeholder="email"
        ></ion-input>
      </ion-item>
      <ion-note
        data-test="email-validation"
        color="danger"
        *ngIf="
          (createForm.controls.email.dirty || form.submitted) &&
          !createForm.controls.email.valid
        "
      >
        Please provide a valid email
      </ion-note>
      <ion-item lines="none">
        <ion-icon
          color="light"
          slot="start"
          name="lock-closed-outline"
        ></ion-icon>
        <ion-input
          formControlName="password"
          data-test="create-password-field"
          type="password"
          placeholder="password"
        ></ion-input>
      </ion-item>
      <ion-note
        data-test="password-validation"
        color="danger"
        *ngIf="
          (createForm.controls.password.dirty || form.submitted) &&
          !createForm.controls.password.valid
        "
      >
        Password must be at least 8 characters long
      </ion-note>
      <ion-item lines="none">
        <ion-icon
          color="light"
          slot="start"
          name="lock-closed-outline"
        ></ion-icon>
        <ion-input
          formControlName="confirmPassword"
          data-test="create-confirm-field"
          type="password"
          placeholder="confirm password"
        ></ion-input>
      </ion-item>
      <ion-note
        data-test="confirm-password-validation"
        color="danger"
        *ngIf="
          (createForm.controls.confirmPassword.dirty || form.submitted) &&
          createForm.hasError('passwordMatch')
        "
      >
        Must match password field
      </ion-note>
      <ion-note
        data-test="create-error-message"
        color="danger"
        *ngIf="createStatus === 'error'"
      >
        Could not create account with those details.
      </ion-note>
      <ion-button
        data-test="create-button"
        type="submit"
        expand="full"
        [disabled]="createStatus === 'creating'"
      >
        <ion-spinner *ngIf="createStatus === 'creating'"></ion-spinner>
        Submit
      </ion-button>
    </form>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }

      form {
        text-align: right;
      }

      ion-note {
        margin: 0 1rem 1rem 1rem;
        display: block;
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
