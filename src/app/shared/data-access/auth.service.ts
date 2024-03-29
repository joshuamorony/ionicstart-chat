import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = authState(this.auth);

  constructor(private auth: Auth) {}

  login(credentials: Credentials) {
    return from(
      signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    );
  }

  logout() {
    return from(signOut(this.auth));
  }

  createAccount(credentials: Credentials) {
    return createUserWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }
}
