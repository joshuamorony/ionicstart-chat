import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { AuthService } from '../data-access/auth.service';
import { CanActivateLogin } from './login.guard';

describe('CanActivateLogin', () => {
  let guard: CanActivateLogin;
  let authService: AuthService;
  let navCtrl: NavController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateLogin,
        {
          provide: AuthService,
          useValue: {
            user$: jest.fn(),
          },
        },
        {
          provide: NavController,
          useValue: {
            navigateForward: jest.fn(),
          },
        },
      ],
    });
    guard = TestBed.inject(CanActivateLogin);
    authService = TestBed.inject(AuthService);
    navCtrl = TestBed.inject(NavController);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('user authenticated', () => {
    let observerSpy: SubscriberSpy<boolean>;

    beforeEach(() => {
      authService.user$ = of({} as any);
      observerSpy = subscribeSpyTo(guard.canActivate());
    });

    it('does not allow access', () => {
      expect(observerSpy.getLastValue()).toBe(false);
    });

    it('redirects to home page', () => {
      expect(navCtrl.navigateForward).toHaveBeenCalledWith('/home');
    });
  });

  describe('user NOT authenticated', () => {
    let observerSpy: SubscriberSpy<boolean>;

    beforeEach(() => {
      authService.user$ = of(null);
      observerSpy = subscribeSpyTo(guard.canActivate());
    });

    it('allows access', () => {
      expect(observerSpy.getLastValue()).toBe(true);
    });
  });
});
