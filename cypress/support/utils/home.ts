export const navigateToHomePage = () => cy.visit('/');

export const getMessages = () => cy.get('[data-test="message"]');
