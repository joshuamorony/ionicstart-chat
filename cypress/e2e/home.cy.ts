import { getMessages, navigateToHomePage } from '../support/utils';

describe('My First Test', () => {
  beforeEach(() => {
    navigateToHomePage();
    cy.callFirestore('delete', 'messages');
  });

  it('should display messages from Firestore when they are added', () => {
    getMessages().should('not.exist');
    cy.callFirestore('add', 'messages', { author: 'josh', content: 'hi' });
    getMessages().children().first().should('contain.text', 'hi');
  });
});
