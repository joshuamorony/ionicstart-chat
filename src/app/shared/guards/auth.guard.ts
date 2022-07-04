import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../data-access/auth.service';

@Injectable()
export class CanActivateAuthenticated implements CanActivate {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  canActivate() {
    return this.authService.user$.pipe(
      map((user) => (user ? true : false)),
      tap((canActivate) => {
        if (!canActivate) {
          this.navCtrl.navigateRoot('/login');
        }
      })
    );
  }
}
