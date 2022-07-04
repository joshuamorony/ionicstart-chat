import { TestBed } from '@angular/core/testing';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { AuthService } from '../data-access/auth.service';
import { CanActivateAuthenticated } from './auth.guard';

describe('CanActivateAuthenticated', () => {
  let guard: CanActivateAuthenticated;
  let authService: AuthService;
  let navCtrl: NavController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateAuthenticated,
        {
          provide: AuthService,
          useValue: {
            user$: jest.fn(),
          },
        },
        {
          provide: NavController,
          useValue: {
            navigateRoot: jest.fn(),
          },
        },
      ],
    });
    guard = TestBed.inject(CanActivateAuthenticated);
    authService = TestBed.inject(AuthService);
    navCtrl = TestBed.inject(NavController);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('user NOT authenticated', () => {
    let observerSpy: SubscriberSpy<boolean>;

    beforeEach(() => {
      authService.user$ = of(null);
      observerSpy = subscribeSpyTo(guard.canActivate());
    });

    it('does not allow access', () => {
      expect(observerSpy.getLastValue()).toBe(false);
    });

    it('redirects to login page', () => {
      expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/login');
    });
  });

  describe('user authenticated', () => {
    let observerSpy: SubscriberSpy<boolean>;

    beforeEach(() => {
      authService.user$ = of({} as any);
      observerSpy = subscribeSpyTo(guard.canActivate());
    });

    it('allows access', () => {
      expect(observerSpy.getLastValue()).toBe(true);
    });
  });
});
