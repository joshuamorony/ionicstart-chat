import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  template: ` <ion-content></ion-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}

@NgModule({
  declarations: [LoginPage],
  exports: [LoginPage],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginPage }]),
  ],
})
export class LoginPageModule {}
