import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Notification {
  message: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications: { message: string , read:boolean}[] = [];
  unreadCount: number = 0;

  constructor(private router: Router) {
    this.loadNotifications();
  }

  // Accessor to get notifications
  getNotifications(): Notification[] {
    return this.notifications;
  }

  // When a notification is clicked
  onNotificationClick(notification: Notification) {
    notification.read = true;
    this.notifications = this.notifications.filter(n => n !== notification);
    this.unreadCount = this.notifications.filter(n => !n.read).length;
    this.saveNotifications();
    this.router.navigate(['/myleaves']); // corrected route
  }

  // Save current array to localStorage
  private saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  // Load from localStorage into the private array
  private loadNotifications() {
    const data = localStorage.getItem('notifications');
    console.log(data);
    this.notifications = data ? JSON.parse(data) : [];
  }

  // Add new notification
  addNotification(message: string) {
    this.notifications.unshift({ message, read: false });
    this.saveNotifications();
  }
}
