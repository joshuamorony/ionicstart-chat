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

const testUnverifiedUser = {
  uid: 'def',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  token: { email: 'test@test.com', email_verified: false },
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
        assertFails(setDoc(newDoc, { author: testUser.token.email })), // write
        assertFails(setDoc(existingDoc, { author: testUser.token.email })), // update
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
        assertSucceeds(setDoc(newDoc, { author: testUser.token.email })), // write
        assertFails(setDoc(existingDoc, { author: testUser.token.email })), // update
        assertFails(deleteDoc(existingDoc)), // delete
      ]);
    });
  });

  describe('creating message', () => {
    it('can create a message if the author field matches the authenticated user email', async () => {
      const db = getFirestore(testUser);
      const newDoc = doc(db, 'messages', 'newDoc');

      await assertSucceeds(setDoc(newDoc, { author: testUser.token.email }));
    });

    it('can NOT create a message if the author field DOES NOT match the authenticated user email', async () => {
      const db = getFirestore(testUser);
      const newDoc = doc(db, 'messages', 'newDoc');

      await assertFails(setDoc(newDoc, { author: 'modifiedemail@test.com' }));
    });

    it('can NOT create a message if email address is not verified', async () => {
      const db = getFirestore(testUnverifiedUser);
      const newDoc = doc(db, 'messages', 'newDoc');

      await assertFails(
        setDoc(newDoc, { author: testUnverifiedUser.token.email })
      );
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });
});
