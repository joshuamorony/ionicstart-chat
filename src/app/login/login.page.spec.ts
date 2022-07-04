import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass credentials to the login() method of the auth service when login-form emits', () => {
    const authService = fixture.debugElement.injector.get(AuthService);

    const testCredentials = {
      email: 'test@test.com',
      password: 'abc123',
    };

    const loginForm = fixture.debugElement.query(By.css('app-login-form'));

    loginForm.triggerEventHandler('login', testCredentials);

    expect(authService.login).toHaveBeenCalledWith(testCredentials);
  });
});
