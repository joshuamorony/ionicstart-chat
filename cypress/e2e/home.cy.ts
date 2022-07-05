import {
  getInputBar,
  getLoginButton,
  getLogoutButton,
  getMessages,
  getSubmitButton,
  navigateToHomePage,
} from '../support/utils';

describe('Home', () => {
  beforeEach(() => {
    cy.login();
    navigateToHomePage();
    cy.callFirestore('delete', 'messages');
  });

  it('should display messages from Firestore when they are added', () => {
    getMessages().should('not.exist');
    cy.callFirestore('add', 'messages', {
      author: 'josh',
      content: 'hi',
      created: '',
    });
    getMessages()
      .children()
      .first()
      .get('ion-label')
      .should('contain.text', 'hi');
  });

  it('should allow adding messages', () => {
    getInputBar().type('hello');
    getSubmitButton().click();
    getMessages()
      .children()
      .first()
      .get('ion-label')
      .should('contain.text', 'hello');
  });

  it('should be able to log out', () => {
    getLogoutButton().click();
    getLoginButton().should('be.visible');
  });
});
