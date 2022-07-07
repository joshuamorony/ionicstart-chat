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
import { CreateFormComponent } from './create-form.component';

@Component({
  selector: 'app-create-form',
  template: ``,
})
export class MockCreateFormComponent {
  @Input() createStatus: any;
  @Output() create = new EventEmitter();
}

describe('CreateFormComponent', () => {
  let component: CreateFormComponent;
  let fixture: ComponentFixture<CreateFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFormComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [FormBuilder],
    })
      .overrideComponent(CreateFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createForm', () => {
    describe('is invalid', () => {
      it('should not display errors initially', () => {
        const emailError = fixture.debugElement.query(
          By.css('[data-test="email-validation"]')
        );
        const passwordError = fixture.debugElement.query(
          By.css('[data-test="password-validation"]')
        );
        const confirmPasswordError = fixture.debugElement.query(
          By.css('[data-test="confirm-password-validation"]')
        );

        expect(emailError).toBeFalsy();
        expect(passwordError).toBeFalsy();
        expect(confirmPasswordError).toBeFalsy();
      });

      it('should display errors once dirty', () => {
        const submitButton = fixture.debugElement.query(
          By.css('[data-test="create-button"]')
        );
        submitButton.nativeElement.click();

        component.createForm.controls.email.markAsDirty();
        component.createForm.controls.password.markAsDirty();
        component.createForm.controls.confirmPassword.markAsDirty();

        fixture.detectChanges();

        const emailError = fixture.debugElement.query(
          By.css('[data-test="email-validation"]')
        );
        const passwordError = fixture.debugElement.query(
          By.css('[data-test="password-validation"]')
        );
        const confirmPasswordError = fixture.debugElement.query(
          By.css('[data-test="confirm-password-validation"]')
        );

        expect(emailError).toBeTruthy();
        expect(passwordError).toBeTruthy();
        expect(confirmPasswordError).toBeTruthy();
      });
    });
  });

  describe('@Input() createStatus', () => {
    it('should disable the create button if the status is creating', () => {
      component.createStatus = 'creating';
      fixture.detectChanges();

      const createButton = fixture.debugElement.query(
        By.css('[data-test="create-button"]')
      );

      expect(createButton.componentInstance.disabled).toBe(true);
    });

    it('should display a spinner if the status is creating', () => {
      component.createStatus = 'creating';
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(
        By.css('[data-test="create-button"] ion-spinner')
      );

      expect(spinner).toBeTruthy();
    });

    it('should display an error message if status is error', () => {
      component.createStatus = 'error';
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(
        By.css('[data-test="create-error-message"]')
      );

      expect(errorMessage).toBeTruthy();
    });
  });

  describe('@Output() create', () => {
    it('should emit with the supplied username and password when form is submitted', () => {
      const observerSpy = subscribeSpyTo(component.create);

      const testEmail = 'test@test.com';
      const testPassword = 'abcd1234';

      component.createForm.setValue({
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      });

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getLastValue()).toEqual({
        email: testEmail,
        password: testPassword,
      });
    });

    it('should not emit if the email is invalid', () => {
      const observerSpy = subscribeSpyTo(component.create);

      const testEmail = 'test';
      const testPassword = 'abcd1234';

      component.createForm.setValue({
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      });

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getLastValue()).toBeUndefined();
    });

    it('should not emit if the password is shorter than 8 characters', () => {
      const observerSpy = subscribeSpyTo(component.create);

      const testEmail = 'test@test.com';
      const testPassword = 'abc';

      component.createForm.setValue({
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      });

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getLastValue()).toBeUndefined();
    });

    it('should not emit if the confirmPassword value does not match the password value', () => {
      const observerSpy = subscribeSpyTo(component.create);

      const testEmail = 'test@test.com';
      const testPassword = 'abcd1234';

      component.createForm.setValue({
        email: testEmail,
        password: testPassword,
        confirmPassword: 'test',
      });

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(observerSpy.getLastValue()).toBeUndefined();
    });
  });
});
