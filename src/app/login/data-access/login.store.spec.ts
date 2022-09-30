import { TestBed } from '@angular/core/testing';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { NavController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../shared/data-access/auth.service';
import { LoginStatus, LoginStore } from './login.store';

describe('ExampleService', () => {
  let service: LoginStore;
  let authService: AuthService;
  let navCtrl: NavController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginStore,
        {
          provide: NavController,
          useValue: {
            navigateRoot: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(LoginStore);
    authService = TestBed.inject(AuthService);
    navCtrl = TestBed.inject(NavController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('status$', () => {
    let testCredentials: any;
    let observerSpy: SubscriberSpy<LoginStatus>;

    beforeEach(() => {
      testCredentials = {
        email: 'josh@test.com',
        password: 'password',
      };

      observerSpy = subscribeSpyTo(service.status$);
    });

    it('should have an initial value of pending', () => {
      expect(observerSpy.getFirstValue()).toEqual('pending');
    });

    it('should be authenticating once login effect is called', () => {
      service.login(testCredentials);
      expect(observerSpy.getLastValue()).toEqual('authenticating');
    });

    it('should be success if login is successful', () => {
      jest.spyOn(authService, 'login').mockReturnValue(of({} as any));

      service.login(testCredentials);

      expect(observerSpy.getLastValue()).toEqual('success');
    });

    it('should be error if login fails', () => {
      jest.spyOn(authService, 'login').mockReturnValue(throwError(new Error()));
      service.login(testCredentials);
      expect(observerSpy.getLastValue()).toEqual('error');
    });
  });

  describe('createModalIsOpen$', () => {
    let observerSpy: SubscriberSpy<boolean>;

    beforeEach(() => {
      observerSpy = subscribeSpyTo(service.createModalIsOpen$);
    });

    it('should have an initial value of false', () => {
      expect(observerSpy.getFirstValue()).toEqual(false);
    });

    it('should be false when setCreateModalOpen is called with false', () => {
      service.setCreateModalOpen(false);
      expect(observerSpy.getLastValue()).toEqual(false);
    });

    it('should be true when setCreateModalOpen is called with true', () => {
      service.setCreateModalOpen(true);
      expect(observerSpy.getLastValue()).toEqual(true);
    });
  });

  describe('login', () => {
    it('should navigate to home page on success', () => {
      jest.spyOn(authService, 'login').mockReturnValue(of({} as any));

      service.login({ email: '', password: '' });

      expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/home');
    });
  });
});
