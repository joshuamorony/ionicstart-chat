import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
  TokenOptions,
} from '@firebase/rules-unit-testing';

import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;
const getFirestore = (authUser?: { uid: string; token: TokenOptions }) =>
  authUser
    ? testEnv.authenticatedContext(authUser.uid, authUser.token).firestore()
    : testEnv.unauthenticatedContext().firestore();

const testUser = {
  uid: 'abc',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  token: { email: 'test@test.com', email_verified: true },
};

describe('Firestore security rules', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'demo-project',
    });
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();

    // Add test documents
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();

      const existingMessageDocRef = doc(db, 'messages', 'existingDoc');

      await Promise.all([setDoc(existingMessageDocRef, { foo: 'bar' })]);
    });
  });

  describe('non-authenticated user', () => {
    it('can not read/write from the messages collection', async () => {
      const db = getFirestore();
      const newDoc = doc(db, 'messages', 'newDoc');
      const existingDoc = doc(db, 'messages', 'existingDoc');

      await Promise.all([
        assertFails(getDoc(existingDoc)), // read
        assertFails(setDoc(newDoc, { foo: 'bar' })), // write
        assertFails(setDoc(existingDoc, { foo: 'bar' })), // update
        assertFails(deleteDoc(existingDoc)), // delete
      ]);
    });
  });

  describe('authenticated user', () => {
    it('can read+write but NOT update+delete from the messages collection', async () => {
      const db = getFirestore(testUser);
      const newDoc = doc(db, 'messages', 'newDoc');
      const existingDoc = doc(db, 'messages', 'existingDoc');

      await Promise.all([
        assertSucceeds(getDoc(existingDoc)), // read
        assertSucceeds(setDoc(newDoc, { foo: 'bar' })), // write
        assertFails(setDoc(existingDoc, { foo: 'bar' })), // update
        assertFails(deleteDoc(existingDoc)), // delete
      ]);
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });
});
