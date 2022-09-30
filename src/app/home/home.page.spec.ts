import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule, NavController } from '@ionic/angular';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../shared/data-access/auth.service';
import { MessageService } from '../shared/data-access/message.service';
import { HomeStore } from './data-access/home.store';

import { HomePage } from './home.page';
import { MockMessageInputComponent } from './ui/message-input.component.spec';
import { MockMessageListComponent } from './ui/message-list.component.spec';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let mockGetMessages$: BehaviorSubject<any>;

  beforeEach(waitForAsync(() => {
    mockGetMessages$ = new BehaviorSubject([]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: MessageService,
          useValue: {
            getMessages: jest.fn().mockReturnValue(mockGetMessages$),
            addMessage: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            logout: jest.fn().mockResolvedValue(true),
            user$: of({}),
          },
        },
        {
          provide: HomeStore,
          useValue: {
            logout: jest.fn(),
            messages$: mockGetMessages$,
          },
        },
        {
          provide: NavController,
          useValue: {},
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

    jest.spyOn(component.ionContent, 'scrollToBottom').mockResolvedValue();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should trigger scrollToBottom when getMessages emits', () => {
    mockGetMessages$.next([]);
    expect(component.ionContent.scrollToBottom).toHaveBeenCalled();
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
