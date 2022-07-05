import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { User } from '@angular/fire/auth';
import { IonicModule } from '@ionic/angular';
import { Message } from '../../shared/interfaces/message';

@Component({
  selector: 'app-message-list',
  template: `
    <ion-list lines="none">
      <ion-item data-test="message" *ngFor="let message of messages">
        <ion-avatar
          [slot]="message.author === activeUser.email ? 'start' : 'end'"
        >
          <img
            *ngIf="message.author"
            src="https://avatars.dicebear.com/api/bottts/{{
              message.author.split('@')[0]
            }}.svg"
          />
        </ion-avatar>
        <ion-label>{{ message.content }}</ion-label>
      </ion-item>
    </ion-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {
  @Input() messages!: Message[] | null;
  @Input() activeUser!: User;
}

@NgModule({
  declarations: [MessageListComponent],
  exports: [MessageListComponent],
  imports: [CommonModule, IonicModule],
})
export class MessageListComponentModule {}
