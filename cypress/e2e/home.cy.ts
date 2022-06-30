import { navigateToHomePage } from '../support/utils';

describe('My First Test', () => {
  beforeEach(() => {
    navigateToHomePage();
  });

  it('should display messages', () => {
    cy.callFirestore('add', 'messages', { content: 'hi' });
    // set test data
    // grab list
    // expect test data to be visible
  });
});
