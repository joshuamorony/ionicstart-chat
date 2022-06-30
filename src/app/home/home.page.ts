import { NgModule, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { MessageListComponentModule } from './ui/message-list.component';
import { MessageService } from '../shared/data-access/message.service';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Chat </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-message-list
        [messages]="messageService.getMessages() | async"
      ></app-message-list>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  constructor(protected messageService: MessageService) {}
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageListComponentModule,
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
