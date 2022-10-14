import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { from, of, throwError } from 'rxjs';
import { Credentials } from '../interfaces/credentials';

import {
  Facebook,
  FacebookLoginResponse,
} from '@awesome-cordova-plugins/facebook/ngx';
import { User } from '@angular/fire/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = authState(this.auth);

  constructor(private auth: Auth, private facebook: Facebook) {}

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

  browserFacebookAuth() {
    return from(signInWithPopup(this.auth, new FacebookAuthProvider()));
  }

  nativeFacebookAuth() {
    return from(this.facebook.login(['public_profile', 'email'])).pipe(
      switchMap((facebookResponse) =>
        !facebookResponse.authResponse
          ? throwError('User not signed in with Facebook')
          : this.user$.pipe(
              switchMap((user) => {
                // Check if we are already signed-in with Firebase with the correct user.
                if (!this.isUserEqual(facebookResponse, user)) {
                  // Build Firebase credential with the Facebook auth token.
                  const credential = FacebookAuthProvider.credential(
                    facebookResponse.authResponse.accessToken
                  );

                  // Sign in with the credential from the Facebook user.
                  return from(signInWithCredential(this.auth, credential));
                } else {
                  // User is already signed-in to Firebase with the correct user.
                  return of('Already signed in');
                }
              })
            )
      )
    );
  }

  private isUserEqual(
    facebookResponse: FacebookLoginResponse,
    firebaseUser: User | null
  ): boolean {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;

      providerData.forEach((data) => {
        if (
          data.providerId === FacebookAuthProvider.PROVIDER_ID &&
          data.uid === facebookResponse.authResponse.userID
        ) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      });
    }

    return false;
  }
}
