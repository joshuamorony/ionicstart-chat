import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
        [formControl]="control"
        placeholder="type message..."
      ></ion-textarea>
      <ion-buttons slot="primary">
        <ion-button data-test="message-submit-button" (click)="send.emit(true)">
          <ion-icon name="send" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  @Input() control!: FormControl;
  @Output() send = new EventEmitter<boolean>();
}

@NgModule({
  declarations: [MessageInputComponent],
  exports: [MessageInputComponent],
  imports: [IonicModule, ReactiveFormsModule],
})
export class MessageInputComponentModule {}
