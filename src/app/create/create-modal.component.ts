import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-modal',
  template: `
    <ion-header></ion-header>
    <ion-content></ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateModalComponent {}

@NgModule({
  declarations: [CreateModalComponent],
  exports: [CreateModalComponent],
  imports: [IonicModule],
})
export class CreateModalComponentModule {}
