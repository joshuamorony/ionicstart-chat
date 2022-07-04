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
    cy.logout();
    navigateToLoginPage();
  });

  it('should be able to create new account', () => {
    const unique = Date.now().toString();

    goToCreateButton().click();
    getCreateEmailField().type(`${unique}@test.com`);
    getCreatePasswordField().type('abcd1234');
    getCreateConfirmField().type('abcd1234');
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
