import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Credentials } from '../../shared/interfaces/credentials';

@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <ion-item lines="none">
        <ion-icon color="light" slot="start" name="mail-outline"></ion-icon>
        <ion-input
          formControlName="email"
          data-test="login-email-field"
          type="email"
          placeholder="email"
        ></ion-input>
      </ion-item>
      <ion-item lines="none">
        <ion-icon
          color="light"
          slot="start"
          name="lock-closed-outline"
        ></ion-icon>
        <ion-input
          formControlName="password"
          data-test="login-password-field"
          type="password"
          placeholder="password"
        ></ion-input>
      </ion-item>
      <ion-button
        data-test="login-button"
        type="submit"
        color="tertiary"
        expand="full"
      >
        Login
      </ion-button>
    </form>
  `,
  styles: [
    `
      ion-item {
        --background: transparent;
      }

      ion-input {
        --background: var(--ion-color-primary-tint);
        --padding-start: 1rem !important;
        --padding-top: 1rem;
        --padding-bottom: 1rem;
        --padding-end: 1rem;
        margin-bottom: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<Credentials>();

  loginForm = this.fb.group({
    email: this.fb.control('', { nonNullable: true }),
    password: this.fb.control('', { nonNullable: true }),
  });

  constructor(private fb: FormBuilder) {}

  protected onSubmit() {
    this.login.emit(this.loginForm.value as Credentials);
  }
}

@NgModule({
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  imports: [IonicModule, ReactiveFormsModule],
})
export class LoginFormComponentModule {}
