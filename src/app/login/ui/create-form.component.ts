import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Credentials } from '../../shared/interfaces/credentials';
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
          formControlName="password"
          data-test="create-confirm-field"
          type="password"
        ></ion-input>
      </ion-item>
      <ion-button data-test="login-button" type="submit">
        Create Account
      </ion-button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {
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
  imports: [IonicModule, ReactiveFormsModule],
})
export class CreateFormComponentModule {}
