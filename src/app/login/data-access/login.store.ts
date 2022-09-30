import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../shared/data-access/auth.service';
import { Credentials } from '../../shared/interfaces/credentials';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
  createModalIsOpen: boolean;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  status$ = this.select((state) => state.status);
  createModalIsOpen$ = this.select((state) => state.createModalIsOpen);

  login = this.effect((credentials$: Observable<Credentials>) =>
    credentials$.pipe(
      tap(() => this.patchState({ status: 'authenticating' })),
      switchMap((credentials) =>
        this.authService.login(credentials).pipe(
          tapResponse(
            (user) => {
              this.patchState({ status: 'success' });
              this.navCtrl.navigateRoot('/home');
            },
            (error) => this.patchState({ status: 'error' })
          )
        )
      )
    )
  );

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    super({ status: 'pending', createModalIsOpen: false });
  }

  setCreateModalOpen(isOpen: boolean) {
    this.patchState({ createModalIsOpen: isOpen });
  }
}
