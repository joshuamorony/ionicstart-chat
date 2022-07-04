import { FormControl, FormGroup } from '@angular/forms';
import { passwordMatchesValidator } from './password-matches';

describe('passwordMatches validator', () => {
  it('should pass if the password and confirmPassword fields match', () => {
    const testControl = new FormGroup({
      password: new FormControl('abc123'),
      confirmPassword: new FormControl('abc123'),
    });

    const result = passwordMatchesValidator(testControl);

    expect(result).toBeTruthy();
  });

  it('should NOT pass if the password and confirmPassword fields match', () => {
    const testControl = new FormGroup({
      password: new FormControl('abc123'),
      confirmPassword: new FormControl('xxxxxx'),
    });

    const result = passwordMatchesValidator(testControl);

    expect(result).toBeFalsy();
  });
});
