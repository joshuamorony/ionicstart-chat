import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../shared/data-access/auth.service';
import { LoginPage } from './login.page';
import { MockLoginFormComponent } from './ui/login-form.component.spec';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

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
            navigateForward: jest.fn(),
          },
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

  describe('login()', () => {
    const testCredentials = {
      email: 'test@test.com',
      password: 'abc123',
    };

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

      expect(navCtrl.navigateForward).toHaveBeenCalledWith('/home');
    });

    it('should display an error if the login is unsuccessful', async () => {
      const authService = fixture.debugElement.injector.get(AuthService);
      const navCtrl = fixture.debugElement.injector.get(NavController);
      jest.spyOn(authService, 'login').mockRejectedValue({} as any);

      await component.login(testCredentials);

      expect(navCtrl.navigateForward).not.toHaveBeenCalled();

      expect(false).toBe(true);
    });
  });
});
