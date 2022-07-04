import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../shared/data-access/auth.service';
import { CreateFormComponentModule } from './ui/create-form.component';

@Component({
  selector: 'app-create-modal',
  template: `
    <ion-header></ion-header>
    <ion-content>
      <app-create-form
        (create)="authService.createAccount($event)"
      ></app-create-form>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateModalComponent {
  constructor(protected authService: AuthService) {}
}

@NgModule({
  declarations: [CreateModalComponent],
  exports: [CreateModalComponent],
  imports: [IonicModule, CreateFormComponentModule],
})
export class CreateModalComponentModule {}
