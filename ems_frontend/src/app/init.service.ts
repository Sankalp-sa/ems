import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from './auth/auth.user.interface';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  init() {

    this.authService.getUserDetails().subscribe({
      next: (userDetails) => {
        console.log('User details fetched successfully', userDetails);
        this.authService.userDetails = userDetails as User; // Assuming User is a defined interface for user details
        this.authService.isLoggedIn = true; // Set login status
      },
      error: (error) => {
        console.error('Error fetching user details', error);
        // Handle error, e.g., show an error message
        this.authService.isLoggedIn = false; // Reset login status on error
        this.authService.userDetails = null; // Clear user details on error
      }})
  }
}
