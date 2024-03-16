import { Component } from '@angular/core';
import { Event } from '../models/event';
import { FirebaseService } from '../services/firebase.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  event: Event = {
    title: '',
    date: '',
    description: '',
    image: '',
  };

  constructor(
    private firebaseService: FirebaseService,
    private navCtrl: NavController
  ) {}

  addEvent() {
    this.firebaseService
      .addEvent(this.event)
      .then(() => {
        console.log('Event created');
        this.navCtrl.navigateForward('/tabs/tab1');
      })
      .catch((error) => {
        console.error('Error is add event: ', error);
      });
  }
}
