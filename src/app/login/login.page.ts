import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, IonRouterOutlet, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CreateModalComponentModule } from '../create/create-modal.component';
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
      <ion-button
        data-test="open-create-button"
        (click)="createModalIsOpen$.next(true)"
      >
        Create Account
      </ion-button>
      <ion-modal
        [isOpen]="createModalIsOpen$ | async"
        [presentingElement]="routerOutlet.nativeEl"
        [canDismiss]="true"
        (ionModalDidDismiss)="createModalIsOpen$.next(false)"
      >
        <ng-template>
          <app-create-modal></app-create-modal>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  loginStatus$ = new BehaviorSubject<
    'pending' | 'authenticating' | 'success' | 'error'
  >('pending');

  createModalIsOpen$ = new BehaviorSubject(false);

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    protected routerOutlet: IonRouterOutlet
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
    CreateModalComponentModule,
  ],
})
export class LoginPageModule {}
