import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { MessageInputComponent } from './message-input.component';

@Component({
  selector: 'app-message-input',
  template: ``,
})
export class MockMessageInputComponent {
  @Output() send = new EventEmitter<boolean>();
}

describe('MessageInputComponent', () => {
  let component: MessageInputComponent;
  let fixture: ComponentFixture<MessageInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MessageInputComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageInputComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Output() send', () => {
    it('should emit with value of input when submit button is clicked', () => {
      const observerSpy = subscribeSpyTo(component.send);
      const input = fixture.debugElement.query(
        By.css('[data-test="message-input-bar"]')
      );
      const submitButton = fixture.debugElement.query(
        By.css('[data-test="message-submit-button"]')
      );

      const testValue = 'hi';
      component.messageControl.setValue(testValue);

      fixture.detectChanges();

      submitButton.nativeElement.click();

      expect(observerSpy.getLastValue()).toEqual(testValue);
    });

    it('should reset value of input after sent', () => {
      const submitButton = fixture.debugElement.query(
        By.css('[data-test="message-submit-button"]')
      );

      const testValue = 'hi';
      component.messageControl.setValue(testValue);

      fixture.detectChanges();

      submitButton.nativeElement.click();

      expect(component.messageControl.value).toEqual(null);
    });

    it('should not emit if value is empty', () => {
      const observerSpy = subscribeSpyTo(component.send);

      const submitButton = fixture.debugElement.query(
        By.css('[data-test="message-submit-button"]')
      );

      const testValue = '';
      component.messageControl.setValue(testValue);

      fixture.detectChanges();

      submitButton.nativeElement.click();

      expect(observerSpy.getValuesLength()).toEqual(0);
    });
  });
});
