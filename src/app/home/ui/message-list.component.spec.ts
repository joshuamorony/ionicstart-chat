import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { MessageListComponent } from './message-list.component';

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;

  const testMessage = { author: 'josh', content: 'hello' };

  const testMessages = [testMessage, testMessage, testMessage];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MessageListComponent],
      imports: [IonicModule.forRoot()],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageListComponent);
    component = fixture.componentInstance;

    component.messages = testMessages;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() messages', () => {
    it('should render an item for each message', () => {
      const messages = fixture.debugElement.queryAll(
        By.css('[data-test="message"]')
      );

      expect(messages.length).toEqual(testMessages.length);
    });
  });
});
