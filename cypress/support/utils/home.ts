export const navigateToHomePage = () => cy.visit('/home');

export const getMessages = () => cy.get('[data-test="message"]');
export const getInputBar = () => cy.get('[data-test="message-input-bar"]');
export const getSubmitButton = () =>
  cy.get('[data-test="message-submit-button"]');
