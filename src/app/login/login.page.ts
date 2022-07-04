import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../shared/data-access/auth.service';
import { Credentials } from '../shared/interfaces/credentials';
import { LoginFormComponentModule } from './ui/login-form.component';

@Component({
  selector: 'app-login',
  template: `
    <ion-content>
      <app-login-form (login)="login($event)"></app-login-form>
      <ion-badge
        data-test="login-error-message"
        *ngIf="(loginStatus$ | async) === 'error'"
      >
        Oops! Could not log you in with those details.
      </ion-badge>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  loginStatus$ = new BehaviorSubject<
    'pending' | 'authenticating' | 'success' | 'error'
  >('pending');

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async login(credentials: Credentials) {
    this.loginStatus$.next('authenticating');

    try {
      await this.authService.login(credentials);
      this.loginStatus$.next('success');
      this.navCtrl.navigateForward('/home');
    } catch (err) {
      this.loginStatus$.next('error');
    }
  }
}

@NgModule({
  declarations: [LoginPage],
  exports: [LoginPage],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginPage }]),
    LoginFormComponentModule,
  ],
})
export class LoginPageModule {}
