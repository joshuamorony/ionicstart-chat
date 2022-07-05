import {
  NgModule,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonicModule, NavController } from '@ionic/angular';
import { FormControl, FormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { RouterModule } from '@angular/router';
import { MessageListComponentModule } from './ui/message-list.component';
import { MessageService } from '../shared/data-access/message.service';
import { MessageInputComponentModule } from './ui/message-input.component';
import { AuthService } from '../shared/data-access/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Chat </ion-title>
        <ion-buttons slot="start">
          <ion-button data-test="logout-button" (click)="logout()">
            <ion-icon name="log-out-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-message-list
        [messages]="messages$ | async"
        [activeUser]="authService.user$ | async"
      ></app-message-list>
    </ion-content>

    <ion-footer>
      <app-message-input
        (send)="messageService.addMessage($event)"
      ></app-message-input>
    </ion-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  @ViewChild(IonContent) ionContent!: IonContent;

  protected messages$ = this.messageService
    .getMessages()
    .pipe(tap(() => setTimeout(() => this.ionContent?.scrollToBottom(200), 0)));

  protected messageControl = new FormControl('');

  constructor(
    protected messageService: MessageService,
    protected authService: AuthService,
    private navCtrl: NavController
  ) {}

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageListComponentModule,
    MessageInputComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
  ],
  declarations: [HomePage],
  exports: [RouterModule],
})
export class HomePageModule {}
