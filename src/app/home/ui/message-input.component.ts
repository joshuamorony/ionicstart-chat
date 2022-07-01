import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-message-input',
  template: `
    <ion-toolbar>
      <ion-textarea></ion-textarea>
      <ion-buttons>
        <ion-button>
          <ion-icon></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  @Input() control!: FormControl;
}

@NgModule({
  declarations: [MessageInputComponent],
  exports: [MessageInputComponent],
  imports: [IonicModule],
})
export class MessageInputComponentModule {}
