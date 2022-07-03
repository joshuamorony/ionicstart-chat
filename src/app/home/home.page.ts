import { NgModule, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { MessageListComponentModule } from './ui/message-list.component';
import { MessageService } from '../shared/data-access/message.service';
import { MessageInputComponentModule } from './ui/message-input.component';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Chat </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-message-list [messages]="messages$ | async"></app-message-list>
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
  protected messages$ = this.messageService.getMessages();
  protected messageControl = new FormControl('');

  constructor(protected messageService: MessageService) {}
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
