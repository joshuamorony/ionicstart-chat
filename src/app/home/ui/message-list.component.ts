import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Message } from '../../shared/interfaces/message';

@Component({
  selector: 'app-message-list',
  template: `
    <ion-list>
      <ion-item data-test="message" *ngFor="let message of messages">
        <ion-label>{{ message.content }}</ion-label>
      </ion-item>
    </ion-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {
  @Input() messages!: Message[] | null;
}

@NgModule({
  declarations: [MessageListComponent],
  exports: [MessageListComponent],
  imports: [CommonModule, IonicModule],
})
export class MessageListComponentModule {}
