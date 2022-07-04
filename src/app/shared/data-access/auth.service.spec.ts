import { TestBed } from '@angular/core/testing';
import * as AngularFireAuth from '@angular/fire/auth';
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
    it('should return result of signInWithEmailAndPassword()', async () => {
      const testResult = 'test';

      jest
        .spyOn(AngularFireAuth, 'signInWithEmailAndPassword')
        .mockResolvedValue(testResult as any);

      const testCredentials = {
        email: 'test@test.com',
        password: 'abc123',
      };

      const result = await service.login(testCredentials);

      expect(AngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        fireAuth,
        testCredentials.email,
        testCredentials.password
      );

      expect(result).toEqual(testResult);
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
