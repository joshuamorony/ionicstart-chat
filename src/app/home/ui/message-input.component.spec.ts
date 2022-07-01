import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { MessageInputComponent } from './message-input.component';

describe('MessageInputComponent', () => {
  let component: MessageInputComponent;
  let fixture: ComponentFixture<MessageInputComponent>;

  let testControl: FormControl;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MessageInputComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageInputComponent);
    component = fixture.componentInstance;

    testControl = new FormControl('');
    component.control = testControl;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() control', () => {
    it('should bind input to control', () => {
      const testValue = 'test';
      testControl.setValue(testValue);

      fixture.detectChanges();

      const input = fixture.debugElement.query(
        By.css('[data-test="message-input-bar"]')
      );

      expect(input.componentInstance.value).toEqual(testValue);
    });
  });
});
