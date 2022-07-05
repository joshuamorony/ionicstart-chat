import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private firestore: Firestore) {}

  getMessages() {
    const messagesCollection = collection(this.firestore, 'messages');
    return collectionData(messagesCollection, { idField: 'id' }) as Observable<
      Message[]
    >;
  }

  addMessage(message: string) {
    const newMessage: Message = {
      author: 'josh',
      content: message,
      created: Date.now().toString(),
    };

    const messagesCollection = collection(this.firestore, 'messages');
    addDoc(messagesCollection, newMessage);
  }
}
