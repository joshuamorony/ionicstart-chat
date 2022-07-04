import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
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
          provide: ModalController,
          useValue: {
            dismiss: jest.fn(),
          },
        },
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

  it('should dismiss when close button is clicked', () => {
    const modalCtrl = fixture.debugElement.injector.get(ModalController);

    const closeButton = fixture.debugElement.query(
      By.css('[data-test="modal-close-button"]')
    );

    closeButton.nativeElement.click();

    expect(modalCtrl.dismiss).toHaveBeenCalled();
  });

  it('should dismiss and navigate to home page after successful account creation', async () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const modalCtrl = fixture.debugElement.injector.get(ModalController);
    const navCtrl = fixture.debugElement.injector.get(NavController);
    jest.spyOn(authService, 'createAccount').mockResolvedValue({} as any);

    await component.createAccount(testCredentials);

    expect(modalCtrl.dismiss).toHaveBeenCalled();
    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/home');
  });

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
