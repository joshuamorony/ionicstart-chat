import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule, IonRouterOutlet, NavController } from '@ionic/angular';
import { AuthService } from '../shared/data-access/auth.service';
import { LoginPage } from './login.page';
import { MockLoginFormComponent } from './ui/login-form.component.spec';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  const testCredentials = {
    email: 'test@test.com',
    password: 'abc123',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage, MockLoginFormComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: NavController,
          useValue: {
            navigateRoot: jest.fn(),
          },
        },
        {
          provide: IonRouterOutlet,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal when create account button is clicked', () => {
    const createAccountButton = fixture.debugElement.query(
      By.css('[data-test="open-create-button"]')
    );

    createAccountButton.nativeElement.click();

    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('ion-modal'));

    expect(modal.componentInstance.isOpen).toBe(true);
  });

  describe('loginStatus$', () => {
    it('should be pending initially', () => {
      const observerSpy = subscribeSpyTo(component.loginStatus$);
      expect(observerSpy.getLastValue()).toEqual('pending');
    });

    it('should be authenticating when a login is in process', () => {
      const observerSpy = subscribeSpyTo(component.loginStatus$);

      component.login(testCredentials);

      expect(observerSpy.getLastValue()).toEqual('authenticating');
    });

    it('should be success when a login has succeeded', async () => {
      const observerSpy = subscribeSpyTo(component.loginStatus$);

      const authService = fixture.debugElement.injector.get(AuthService);
      jest.spyOn(authService, 'login').mockResolvedValue({} as any);

      await component.login(testCredentials);

      expect(observerSpy.getLastValue()).toEqual('success');
    });

    it('should be error when a login has failed', async () => {
      const observerSpy = subscribeSpyTo(component.loginStatus$);

      const authService = fixture.debugElement.injector.get(AuthService);
      jest.spyOn(authService, 'login').mockRejectedValue({} as any);

      await component.login(testCredentials);

      expect(observerSpy.getLastValue()).toEqual('error');
    });
  });

  describe('login()', () => {
    it('should pass credentials to the login() method of the auth service when login-form emits', () => {
      const authService = fixture.debugElement.injector.get(AuthService);

      const loginForm = fixture.debugElement.query(By.css('app-login-form'));

      loginForm.triggerEventHandler('login', testCredentials);

      expect(authService.login).toHaveBeenCalledWith(testCredentials);
    });

    it('should navigate to the home page if the login is successful', async () => {
      const authService = fixture.debugElement.injector.get(AuthService);
      const navCtrl = fixture.debugElement.injector.get(NavController);
      jest.spyOn(authService, 'login').mockResolvedValue({} as any);

      await component.login(testCredentials);

      expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/home');
    });

    it('should display an error if the login is unsuccessful', async () => {
      const authService = fixture.debugElement.injector.get(AuthService);
      const navCtrl = fixture.debugElement.injector.get(NavController);
      jest.spyOn(authService, 'login').mockRejectedValue({} as any);

      await component.login(testCredentials);

      expect(navCtrl.navigateRoot).not.toHaveBeenCalled();

      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(
        By.css('[data-test="login-error-message"]')
      );

      expect(errorMessage).toBeTruthy();
    });
  });
});
