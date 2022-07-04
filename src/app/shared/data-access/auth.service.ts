import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = authState(this.auth);

  constructor(private auth: Auth) {}

  login(credentials: Credentials) {
    return signInWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }

  createAccount(credentials: Credentials) {
    return createUserWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }
}
