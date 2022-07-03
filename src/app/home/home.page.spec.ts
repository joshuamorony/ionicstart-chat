import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { MessageService } from '../shared/data-access/message.service';

import { HomePage } from './home.page';
import { MockMessageInputComponent } from './ui/message-input.component.spec';
import { MockMessageListComponent } from './ui/message-list.component.spec';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MessageService,
          useValue: {
            getMessages: jest.fn(),
            addMessage: jest.fn(),
          },
        },
      ],
      declarations: [
        HomePage,
        MockMessageListComponent,
        MockMessageInputComponent,
      ],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('message-input send event emits', () => {
    it('should pass value to the addMessage() method of message service', () => {
      const messageService = fixture.debugElement.injector.get(MessageService);

      const messageInput = fixture.debugElement.query(
        By.css('app-message-input')
      );

      const testMessage = 'test';

      messageInput.triggerEventHandler('send', testMessage);

      expect(messageService.addMessage).toHaveBeenCalledWith(testMessage);
    });
  });
});
