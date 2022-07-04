import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../shared/data-access/auth.service';
import { Credentials } from '../shared/interfaces/credentials';
import { LoginFormComponentModule } from './ui/login-form.component';

@Component({
  selector: 'app-login',
  template: `
    <ion-content>
      <app-login-form (login)="login($event)"></app-login-form>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async login(credentials: Credentials) {
    try {
      await this.authService.login(credentials);
      this.navCtrl.navigateForward('/home');
    } catch (err) {}
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
