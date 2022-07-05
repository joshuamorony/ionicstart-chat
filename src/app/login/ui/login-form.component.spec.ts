import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { LoginFormComponent } from './login-form.component';

@Component({
  selector: 'app-login-form',
  template: ``,
})
export class MockLoginFormComponent {
  @Input() loginStatus: any;
  @Output() login = new EventEmitter();
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [FormBuilder],
    })
      .overrideComponent(LoginFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() loginStatus', () => {
    it('should disable the login button if the status is authenticating', () => {
      component.loginStatus = 'authenticating';
      fixture.detectChanges();

      const loginButton = fixture.debugElement.query(
        By.css('[data-test="login-button"]')
      );

      expect(loginButton.componentInstance.disabled).toBe(true);
    });

    it('should display a spinner if the status is authenticating', () => {
      component.loginStatus = 'authenticating';
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(
        By.css('[data-test="login-button"] ion-spinner')
      );

      expect(spinner).toBeTruthy();
    });

    it('should display an error message if status is error', () => {
      component.loginStatus = 'error';
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(
        By.css('[data-test="login-error-message"]')
      );

      expect(errorMessage).toBeTruthy();
    });
  });

  describe('@Output() login', () => {
    it('should emit with the supplied username and password when form is submitted', () => {
      const observerSpy = subscribeSpyTo(component.login);

      const testEmail = 'test@test.com';
      const testPassword = 'abc123';

      component.loginForm.setValue({
        email: testEmail,
        password: testPassword,
      });

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getLastValue()).toEqual({
        email: testEmail,
        password: testPassword,
      });
    });
  });
});
