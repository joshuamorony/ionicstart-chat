import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [IonicModule.forRoot()],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Output() login', () => {
    it('should emit with the supplied username and password when login button clicked', () => {
      const observerSpy = subscribeSpyTo(component.login);

      const testEmail = 'test@test.com';
      const testPassword = 'abc123';

      component.loginForm.get('email')?.setValue(testEmail);
      component.loginForm.get('password')?.setValue(testPassword);

      const loginButton = fixture.debugElement.query(
        By.css('[data-test="login-button"]')
      );

      loginButton.nativeElement.click();

      expect(observerSpy.getLastValue()).toEqual({
        email: testEmail,
        password: testPassword,
      });
    });
  });
});
