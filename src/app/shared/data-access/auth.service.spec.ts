import { TestBed } from '@angular/core/testing';
import * as AngularFireAuth from '@angular/fire/auth';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularFireAuth.Auth],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login()', () => {
    it('should return result of signInWithEmailAndPassword()', async () => {
      const mockAuth = jest.fn();

      const testResult = 'test';

      jest.spyOn(AngularFireAuth, 'getAuth').mockReturnValue(mockAuth as any);
      jest
        .spyOn(AngularFireAuth, 'signInWithEmailAndPassword')
        .mockResolvedValue(testResult as any);

      const testCredentials = {
        email: 'test@test.com',
        password: 'abc123',
      };

      const result = await service.login(testCredentials);

      expect(AngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        testCredentials.email,
        testCredentials.password
      );

      expect(result).toEqual(testResult);
    });
  });
});
