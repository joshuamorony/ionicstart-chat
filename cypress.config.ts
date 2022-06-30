const { defineConfig } = require('cypress');
const tasks = require('cypress-firebase/lib/tasks');
const cypressFirebasePlugin = require('cypress-firebase').plugin;
const admin = require('firebase-admin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin);
      require('cypress-log-to-output').install(on);
    },
  },
});
