import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../shared/data-access/auth.service';
import { Credentials } from '../shared/interfaces/credentials';
import { CreateFormComponentModule } from './ui/create-form.component';

@Component({
  selector: 'app-create-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button
            data-test="modal-close-button"
            (click)="modalCtrl.dismiss()"
          >
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <app-create-form (create)="createAccount($event)"></app-create-form>
      <ion-badge
        data-test="create-error-message"
        *ngIf="(createStatus$ | async) === 'error'"
      >
        Oops! Could not create account with those details.
      </ion-badge>
    </ion-content>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateModalComponent {
  createStatus$ = new BehaviorSubject<
    'pending' | 'creating' | 'success' | 'error'
  >('pending');

  constructor(
    protected authService: AuthService,
    protected modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  async createAccount(credentials: Credentials) {
    this.createStatus$.next('creating');

    try {
      await this.authService.createAccount(credentials);
      this.createStatus$.next('success');
      this.modalCtrl.dismiss();
      this.navCtrl.navigateForward('/home');
    } catch (err) {
      this.createStatus$.next('error');
    }
  }
}

@NgModule({
  declarations: [CreateModalComponent],
  exports: [CreateModalComponent],
  imports: [IonicModule, CommonModule, CreateFormComponentModule],
})
export class CreateModalComponentModule {}
