import { Component, EventEmitter, Output } from '@angular/core';
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
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Output() create', () => {
    it('should emit with the supplied username and password when form is submitted', () => {
      const observerSpy = subscribeSpyTo(component.create);

      const testEmail = 'test@test.com';
      const testPassword = 'abc123';

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

    it('should not emit if the email is invalid', () => {});

    it('should not emit if the password is shorter than 8 characters', () => {});

    it('should not emit if the confirmPassword value does not match the password value', () => {});
  });
});
