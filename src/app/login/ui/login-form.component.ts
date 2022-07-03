import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login-form',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {}

@NgModule({
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  imports: [IonicModule, ReactiveFormsModule],
})
export class LoginFormComponentModule {}
