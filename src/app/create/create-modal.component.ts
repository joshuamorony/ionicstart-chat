import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../shared/data-access/auth.service';
import { Credentials } from '../shared/interfaces/credentials';
import { CreateFormComponentModule } from './ui/create-form.component';

@Component({
  selector: 'app-create-modal',
  template: `
    <ion-header></ion-header>
    <ion-content>
      <app-create-form (create)="createAccount($event)"></app-create-form>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateModalComponent {
  createStatus$ = new BehaviorSubject<
    'pending' | 'creating' | 'success' | 'error'
  >('pending');

  constructor(protected authService: AuthService) {}

  async createAccount(credentials: Credentials) {
    this.createStatus$.next('creating');

    try {
      await this.authService.createAccount(credentials);
      this.createStatus$.next('success');
    } catch (err) {
      this.createStatus$.next('error');
    }
  }
}

@NgModule({
  declarations: [CreateModalComponent],
  exports: [CreateModalComponent],
  imports: [IonicModule, CreateFormComponentModule],
})
export class CreateModalComponentModule {}
