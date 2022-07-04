import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { of } from 'rxjs';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = of();

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
