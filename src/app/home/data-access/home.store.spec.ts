import { TestBed } from '@angular/core/testing';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { AuthService } from '../../shared/data-access/auth.service';
import { MessageService } from '../../shared/data-access/message.service';
import { Message } from '../../shared/interfaces/message';
import { HomeStore } from './home.store';

describe('HomeStore', () => {
  let service: HomeStore;
  let messageService: MessageService;
  let authService: AuthService;
  let navCtrl: NavController;

  const testMessages = [{}, {}, {}];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeStore,
        {
          provide: MessageService,
          useValue: {
            getMessages: jest.fn().mockReturnValue(of(testMessages)),
          },
        },
        {
          provide: AuthService,
          useValue: {
            logout: jest.fn().mockReturnValue(of('')),
          },
        },
        { provide: NavController, useValue: { navigateRoot: jest.fn() } },
      ],
    });
    service = TestBed.inject(HomeStore);
    messageService = TestBed.inject(MessageService);
    authService = TestBed.inject(AuthService);
    navCtrl = TestBed.inject(NavController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('messages$', () => {
    let observerSpy: SubscriberSpy<Message[]>;

    beforeEach(() => {
      observerSpy = subscribeSpyTo(service.messages$);
    });

    it('should be empty array initially', () => {
      expect(observerSpy.getLastValue()).toEqual([]);
    });

    it('should contain messages from getMessages() after loadMessages called', () => {
      service.loadMessages();

      expect(observerSpy.getLastValue()).toEqual(testMessages);
    });
  });

  describe('logout', () => {
    it('should call logout method from auth service', () => {
      service.logout();
      expect(authService.logout).toHaveBeenCalled();
    });

    it('should navigate back to login page', () => {
      service.logout();
      expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/login');
    });
  });
});
