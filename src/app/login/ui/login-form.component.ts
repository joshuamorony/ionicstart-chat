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
      <ion-item>
        <ion-label>email</ion-label>
        <ion-input
          formControlName="email"
          data-test="login-email-field"
          type="email"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>password</ion-label>
        <ion-input
          formControlName="password"
          data-test="login-password-field"
          type="password"
        ></ion-input>
      </ion-item>
      <ion-button data-test="login-button" type="submit">Login</ion-button>
    </form>
  `,
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
