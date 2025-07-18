import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from './auth/auth.user.interface';
import { SocketService } from './services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private authService: AuthService, private http: HttpClient, private socketService: SocketService) { }

  init() {

    this.authService.getUserDetails().subscribe({
      next: (userDetails) => {
        console.log('User details fetched successfully', userDetails);
        this.authService.userDetails = userDetails as User; // Assuming User is a defined interface for user details
        this.authService.isLoggedIn = true; // Set login status

        this.socketService.joinUserRoom(this.authService.userDetails.id);

        this.socketService.onLeaveStatusUpdate((data) => {
          console.log('Leave status updated:', data);
          // You can show a toast notification or refresh UI here
        });

      },
      error: (error) => {
        console.error('Error fetching user details', error);
        // Handle error, e.g., show an error message
        this.authService.isLoggedIn = false; // Reset login status on error
        this.authService.userDetails = null; // Clear user details on error
      }
    })
  }
}
