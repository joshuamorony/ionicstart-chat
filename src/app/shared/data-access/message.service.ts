import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Message } from '../interfaces/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  getMessages() {
    const messagesCollection = query(
      collection(this.firestore, 'messages'),
      orderBy('created', 'desc'),
      limit(50)
    );
    return collectionData(messagesCollection, { idField: 'id' }).pipe(
      map((messages) => [...messages].reverse())
    ) as Observable<Message[]>;
  }

  addMessage(message: string) {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      if (user?.email) {
        const newMessage: Message = {
          author: user.email,
          content: message,
          created: Date.now().toString(),
        };

        const messagesCollection = collection(this.firestore, 'messages');
        addDoc(messagesCollection, newMessage);
      }
    });
  }
}
