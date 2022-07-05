import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import * as AngularFireFirestore from '@angular/fire/firestore';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

jest.mock('@angular/fire/firestore');

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [AngularFireFirestore.Firestore],
    });
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMessages()', () => {
    it('should return a stream of messages from the messages collection with ids', () => {
      const mockCollectionRef = jest.fn();
      const mockDocumentData = jest.fn();

      jest
        .spyOn(AngularFireFirestore, 'collection')
        .mockReturnValue(mockCollectionRef as any);
      jest
        .spyOn(AngularFireFirestore, 'collectionData')
        .mockReturnValue(of(mockDocumentData) as any);

      const observerSpy = subscribeSpyTo(service.getMessages());
      const options = {
        idField: 'id',
      };

      expect(AngularFireFirestore.collection).toHaveBeenCalledWith(
        {},
        'messages'
      );
      expect(AngularFireFirestore.collectionData).toHaveBeenCalledWith(
        mockCollectionRef,
        options
      );
      expect(observerSpy.getLastValue()).toEqual(mockDocumentData);
    });
  });

  describe('addMessage()', () => {
    it('should create a new document in the messages collection using the supplied message', () => {
      const mockCollectionReference = jest.fn();

      const testMessage = {
        author: 'josh',
        content: 'test',
      };

      jest
        .spyOn(AngularFireFirestore, 'collection')
        .mockReturnValue(mockCollectionReference as any);

      jest.spyOn(AngularFireFirestore, 'addDoc');

      service.addMessage(testMessage.content);

      expect(AngularFireFirestore.collection).toHaveBeenCalledWith(
        {},
        'messages'
      );
      expect(AngularFireFirestore.addDoc).toHaveBeenCalledWith(
        mockCollectionReference,
        expect.objectContaining(testMessage)
      );
    });
  });
});
