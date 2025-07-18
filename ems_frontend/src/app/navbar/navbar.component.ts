import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  notifications: { message: string , read:boolean}[] = [];
  unreadCount :number = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private route: Router,
    private socketService: SocketService,
    private  notificationService: NotificationsService) { }

  ngOnInit(): void {

    this.notifications = this.notificationService.notifications;
    
    this.notificationService.unreadCount = this.notifications.filter(n => !n.read).length;

    
    this.socketService.onLeaveStatusUpdate((data: { message: string }) => {
      //this.notifications.unshift(data);
      this.notificationService.unreadCount++;
      
      this.notificationService.addNotification(data.message);

      
      this.notifications = this.notificationService.notifications;
      
      
    });
    

    this.unreadCount = this.notificationService.unreadCount;
    
  }


  // getUnreadCount()
  // {
  //   return this.notificationService.unreadCount;
  // }

  // getNotifications()
  // {
  //   console.log(this.notificationService.notifications)
  //   return this.notificationService.notifications;
    
  // }

  handleNotificationClick(notification: { message: string, read: boolean }) {
  this.notificationService.onNotificationClick(notification);
  this.notifications = this.notifications.filter(n => n !== notification);
  this.unreadCount = this.notificationService.unreadCount;
    }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        this.authService.isLoggedIn = false; // Reset login status
        this.authService.userDetails = null; // Clear user details

        this.route.navigate(['/login']); // Navigate to login page after logout
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }

  hasAnyRole(roles: string[]): boolean {
    return this.authService.hasAnyRole(roles);
  }



}
