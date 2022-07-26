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
      <ion-item
        data-test="message"
        *ngFor="let message of messages; trackBy: trackByFn"
      >
        <ion-avatar
          *ngIf="activeUser"
          [slot]="message.author === activeUser.email ? 'start' : 'end'"
          class="animate-in-primary"
        >
          <img
            *ngIf="message.author"
            src="https://avatars.dicebear.com/api/bottts/{{
              message.author.split('@')[0]
            }}.svg"
          />
        </ion-avatar>
        <div data-test="chat-message" class="chat-message animate-in-secondary">
          <ion-note>{{ message.author }}</ion-note>
          <p>{{ message.content }}</p>
        </div>
      </ion-item>
    </ion-list>
  `,
  styles: [
    `
      .chat-message,
      ion-avatar {
        filter: drop-shadow(2px 4px 6px var(--ion-color-primary-shade));
      }

      .chat-message {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        margin: 10px 0;
        background-color: var(--ion-color-light);

        p {
          margin: 5px 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {
  @Input() messages!: Message[] | null;
  @Input() activeUser!: User | null;

  trackByFn(index: number, message: Message) {
    return message.created;
  }
}

@NgModule({
  declarations: [MessageListComponent],
  exports: [MessageListComponent],
  imports: [CommonModule, IonicModule],
})
export class MessageListComponentModule {}
