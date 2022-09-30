import { TestBed } from '@angular/core/testing';
import * as AngularFireAuth from '@angular/fire/auth';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { from, of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let fireAuth: AngularFireAuth.Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularFireAuth.Auth],
    });
    service = TestBed.inject(AuthService);
    fireAuth = TestBed.inject(AngularFireAuth.Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login()', () => {
    it('should return result of signInWithEmailAndPassword() as an observable', (done) => {
      const testResult = 'test';

      jest
        .spyOn(AngularFireAuth, 'signInWithEmailAndPassword')
        .mockResolvedValue(testResult as any);

      const testCredentials = {
        email: 'test@test.com',
        password: 'abc123',
      };

      service.login(testCredentials).subscribe((result) => {
        expect(AngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
          fireAuth,
          testCredentials.email,
          testCredentials.password
        );

        expect(result).toEqual(testResult);

        done();
      });
    });
  });

  describe('logout()', () => {
    it('should return result of signOut()', (done) => {
      const testResult = 'test';

      jest
        .spyOn(AngularFireAuth, 'signOut')
        .mockResolvedValue(testResult as any);

      service.logout().subscribe((result) => {
        expect(result).toEqual(testResult);
        done();
      });
    });
  });

  describe('createAccount()', () => {
    it('should return result of createUserWithEmailAndPassword()', async () => {
      const testResult = 'test';

      jest
        .spyOn(AngularFireAuth, 'createUserWithEmailAndPassword')
        .mockResolvedValue(testResult as any);

      const testCredentials = {
        email: 'test@test.com',
        password: 'abc123',
      };

      const result = await service.createAccount(testCredentials);

      expect(
        AngularFireAuth.createUserWithEmailAndPassword
      ).toHaveBeenCalledWith(
        fireAuth,
        testCredentials.email,
        testCredentials.password
      );

      expect(result).toEqual(testResult);
    });
  });
});
