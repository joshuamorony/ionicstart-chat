import { Injectable } from '@angular/core';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(credentials: Credentials) {}
}
