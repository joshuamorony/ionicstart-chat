import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule, IonRouterOutlet, NavController } from '@ionic/angular';
import { AuthService } from '../shared/data-access/auth.service';
import { LoginPage } from './login.page';
import { MockLoginFormComponent } from './ui/login-form.component.spec';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  const testCredentials = {
    email: 'test@test.com',
    password: 'abc123',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage, MockLoginFormComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: NavController,
          useValue: {
            navigateRoot: jest.fn(),
          },
        },
        {
          provide: IonRouterOutlet,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal when create account button is clicked', () => {
    const createAccountButton = fixture.debugElement.query(
      By.css('[data-test="open-create-button"]')
    );

    createAccountButton.nativeElement.click();

    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('ion-modal'));

    expect(modal.componentInstance.isOpen).toBe(true);
  });
});
