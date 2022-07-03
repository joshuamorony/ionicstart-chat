export const navigateToLoginPage = () => cy.visit('/login');

export const getLoginEmailField = () =>
  cy.get('[data-test="login-email-field"]');
export const getLoginPasswordField = () =>
  cy.get('[data-test="login-password-field"]');
export const getLoginButton = () => cy.get('[data-test="login-button"]');

export const goToCreateButton = () =>
  cy.get('[data-test="open-create-button"]');
export const getCreateEmailField = () =>
  cy.get('[data-test="create-email-field"]');
export const getCreatePasswordField = () =>
  cy.get('[data-test="create-password-field"]');
export const getCreateConfirmField = () =>
  cy.get('[data-test="create-confirm-field"]');
export const getCreateButton = () => cy.get('[data-test="create-button"]');
