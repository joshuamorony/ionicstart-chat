import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  login(credentials: Credentials) {
    return signInWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }

  createAccount(credentials: Credentials) {}
}
