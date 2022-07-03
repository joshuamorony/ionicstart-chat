import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login-form',
  template: `
    <form>
      <ion-item>
        <ion-label>email</ion-label>
        <ion-input data-test="login-email-field" type="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>password</ion-label>
        <ion-input data-test="login-password-field" type="password"></ion-input>
      </ion-item>
      <ion-button data-test="login-button" type="submit">Login</ion-button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {}

@NgModule({
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  imports: [IonicModule, ReactiveFormsModule],
})
export class LoginFormComponentModule {}
