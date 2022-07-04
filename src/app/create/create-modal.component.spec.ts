import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../shared/data-access/auth.service';
import { CreateModalComponent } from './create-modal.component';

describe('CreateModalComponent', () => {
  let component: CreateModalComponent;
  let fixture: ComponentFixture<CreateModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createAccount: jest.fn(),
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

  describe('createAccount()', () => {
    it('should pass data from create-form to createAccount method of auth service', () => {
      const authService = fixture.debugElement.injector.get(AuthService);

      const testCredentials = {
        email: 'test@test.com',
        password: 'abcd1234',
      };

      const createForm = fixture.debugElement.query(By.css('app-create-form'));

      createForm.triggerEventHandler('create', testCredentials);

      expect(authService.createAccount).toHaveBeenCalledWith(testCredentials);
    });
  });
});
