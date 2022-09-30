import {
  NgModule,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonicModule, NavController } from '@ionic/angular';
import { FormControl, FormsModule } from '@angular/forms';
import { map, startWith, tap } from 'rxjs/operators';

import { RouterModule } from '@angular/router';
import { MessageListComponentModule } from './ui/message-list.component';
import { MessageService } from '../shared/data-access/message.service';
import { MessageInputComponentModule } from './ui/message-input.component';
import { AuthService } from '../shared/data-access/auth.service';
import { HomeStore } from './data-access/home.store';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-header class="ion-no-border">
        <ion-toolbar color="primary">
          <ion-title>
            <img src="assets/images/logo.png" />
          </ion-title>
          <ion-buttons slot="start">
            <ion-button data-test="logout-button" (click)="store.logout()">
              <ion-icon name="log-out-outline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <app-message-list
          *ngIf="vm.user"
          [messages]="vm.messages"
          [activeUser]="vm.user"
        ></app-message-list>
      </ion-content>

      <ion-footer>
        <app-message-input
          (send)="messageService.addMessage($event)"
        ></app-message-input>
      </ion-footer>
    </ng-container>
  `,
  styles: [
    `
      ion-content {
        --ion-background-color: var(--ion-color-primary);
      }

      ion-title img {
        max-height: 39px;
        margin-top: 9px;
        filter: drop-shadow(2px 4px 6px var(--ion-color-primary-shade));
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent) ionContent!: IonContent;

  messageControl = new FormControl('');

  vm$ = combineLatest([
    this.store.messages$,
    this.authService.user$.pipe(startWith(null)),
  ]).pipe(map(([messages, user]) => ({ messages, user })));

  constructor(
    public store: HomeStore,
    public messageService: MessageService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.store.loadMessages();

    this.store.messages$.pipe(
      tap(() => setTimeout(() => this.ionContent?.scrollToBottom(200), 0))
    );
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
