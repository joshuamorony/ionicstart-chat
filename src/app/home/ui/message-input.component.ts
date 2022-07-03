import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-message-input',
  template: `
    <ion-toolbar>
      <ion-textarea
        data-test="message-input-bar"
        [formControl]="messageControl"
        placeholder="type message..."
      ></ion-textarea>
      <ion-buttons slot="primary">
        <ion-button data-test="message-submit-button" (click)="sendMessage()">
          <ion-icon name="send" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  @Output() send = new EventEmitter<string>();

  messageControl = new FormControl('');

  sendMessage() {
    if (this.messageControl.value) {
      this.send.emit(this.messageControl.value);
      this.messageControl.reset();
    }
  }
}

@NgModule({
  declarations: [MessageInputComponent],
  exports: [MessageInputComponent],
  imports: [IonicModule, ReactiveFormsModule],
})
export class MessageInputComponentModule {}
