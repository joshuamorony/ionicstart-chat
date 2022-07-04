import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../shared/data-access/auth.service';
import { CreateModalComponent } from './create-modal.component';
import { MockCreateFormComponent } from './ui/create-form.component.spec';

describe('CreateModalComponent', () => {
  let component: CreateModalComponent;
  let fixture: ComponentFixture<CreateModalComponent>;

  const testCredentials = {
    email: 'test@test.com',
    password: 'abc123',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateModalComponent, MockCreateFormComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createAccount: jest.fn(),
          },
        },
        {
          provide: NavController,
          useValue: {
            navigateForward: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss when close button is clicked', () => {});

  it('should dismiss after successful account creation', () => {});

  it('should display an error if account creation fails', async () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const navCtrl = fixture.debugElement.injector.get(NavController);
    jest.spyOn(authService, 'createAccount').mockRejectedValue({} as any);

    await component.createAccount(testCredentials);

    expect(navCtrl.navigateForward).not.toHaveBeenCalled();

    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(
      By.css('[data-test="create-error-message"]')
    );

    expect(errorMessage).toBeTruthy();
  });

  describe('createStatus$', () => {
    it('should be pending initially', () => {
      const observerSpy = subscribeSpyTo(component.createStatus$);
      expect(observerSpy.getLastValue()).toEqual('pending');
    });

    it('should be creating when a login is in process', () => {
      const observerSpy = subscribeSpyTo(component.createStatus$);

      component.createAccount(testCredentials);

      expect(observerSpy.getLastValue()).toEqual('creating');
    });

    it('should be success when a login has succeeded', async () => {
      const observerSpy = subscribeSpyTo(component.createStatus$);

      const authService = fixture.debugElement.injector.get(AuthService);
      jest.spyOn(authService, 'createAccount').mockResolvedValue({} as any);

      await component.createAccount(testCredentials);

      expect(observerSpy.getLastValue()).toEqual('success');
    });

    it('should be error when a login has failed', async () => {
      const observerSpy = subscribeSpyTo(component.createStatus$);

      const authService = fixture.debugElement.injector.get(AuthService);
      jest.spyOn(authService, 'createAccount').mockRejectedValue({} as any);

      await component.createAccount(testCredentials);

      expect(observerSpy.getLastValue()).toEqual('error');
    });
  });

  describe('createAccount()', () => {
    it('should pass data from create-form to createAccount method of auth service', () => {
      const authService = fixture.debugElement.injector.get(AuthService);

      const createForm = fixture.debugElement.query(By.css('app-create-form'));

      createForm.triggerEventHandler('create', testCredentials);

      expect(authService.createAccount).toHaveBeenCalledWith(testCredentials);
    });
  });
});
