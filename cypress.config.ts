import admin from 'firebase-admin';
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin, { projectId: 'demo-project' });
      require('cypress-log-to-output').install(on);
    },
  },
});
