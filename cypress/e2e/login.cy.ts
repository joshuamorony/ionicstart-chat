import {
  getCreateButton,
  getCreateConfirmField,
  getCreateEmailField,
  getCreatePasswordField,
  getInputBar,
  getLoginButton,
  getLoginEmailField,
  getLoginPasswordField,
  goToCreateButton,
  navigateToLoginPage,
} from 'cypress/support/utils';

describe('Login', () => {
  beforeEach(() => {
    navigateToLoginPage();
  });

  it('should be able to create new account', () => {
    goToCreateButton().click();
    getCreateEmailField().type('test@test.com');
    getCreatePasswordField().type('abc123');
    getCreateConfirmField().type('abc123');
    getCreateButton().click();
    getInputBar().should('be.visible');
  });

  it('should be able to login with existing account', () => {
    getLoginEmailField().type('existing@existing.com');
    getLoginPasswordField().type('abc123');
    getLoginButton().click();
    getInputBar().should('be.visible');
  });
});
