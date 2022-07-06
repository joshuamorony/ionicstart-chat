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

  it('should display validation error message if form is invalid and the form has been touched', () => {
    component.createForm.get('email')?.setValue('test');

    fixture.detectChanges();

    const validationErrorMessage = fixture.debugElement.query(
      By.css('[data-test="validation-message"]')
    );

    expect(validationErrorMessage).toBeTruthy();
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
