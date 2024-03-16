import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Event } from '../models/event';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  events: Event[] = [];
  constructor(
    private firebaseService: FirebaseService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.firebaseService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  async deleteEvent(event: Event) {
    try {
      await this.firebaseService.deleteEvent(event.id as string);
      this.presentToast('Noticia eliminada');
      this.events = this.events.filter((e) => e.id !== event.id);
    } catch (error) {
      console.log('Error on delete event: ', error);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
