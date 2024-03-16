import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Event } from '../models/event';
import { Observable, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private eventCollection: AngularFirestoreCollection<Event>;
  events!: Observable<Event[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.eventCollection = this.angularFirestore.collection<Event>('Event');
    this.events = this.eventCollection.snapshotChanges().pipe(map((snapshotChanges) => {
      return snapshotChanges.map((snapshot) => {
        const data = snapshot.payload.doc.data();
        const id = snapshot.payload.doc.id;
        return {...data, id}
      })
    }));
  }

  getAllEvents(): Observable<Event[]> {
    return this.events;
  }

  getEventById(id: string) {
    return this.eventCollection.doc<Event>(id).valueChanges();
  }

  updateEvent(event: Event, id: string) {
    return this.eventCollection.doc<Event>(id).update(event);
  }

  addEvent(event: Event) {
    return this.eventCollection.add(event);
  }

  deleteEvent(id: string): Promise<void> {
    return this.eventCollection.doc<Event>(id).delete();
  }

}
