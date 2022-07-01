import {
  getInputBar,
  getMessages,
  getSubmitButton,
  navigateToHomePage,
} from '../support/utils';

describe('Home', () => {
  beforeEach(() => {
    navigateToHomePage();
    cy.callFirestore('delete', 'messages');
  });

  it('should display messages from Firestore when they are added', () => {
    getMessages().should('not.exist');
    cy.callFirestore('add', 'messages', { author: 'josh', content: 'hi' });
    getMessages().children().first().should('contain.text', 'hi');
  });

  it('should allow adding messages', () => {
    getInputBar().type('hello');
    getSubmitButton().click();
    getMessages().children().first().should('contain.text', 'hello');
  });
});
