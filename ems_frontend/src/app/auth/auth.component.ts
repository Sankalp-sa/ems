import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from './auth.user.interface';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router, private socketService: SocketService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      this.authService.login(userName, password).subscribe({
        next: (response) => {

          this.authService.getUserDetails().subscribe({
            next: (userDetails) => {
              console.log('User details fetched successfully', userDetails);
              this.authService.isLoggedIn = true; // Set login status
              this.authService.userDetails = userDetails as User; // Assuming User is a defined interface for user details

              this.socketService.joinUserRoom(this.authService.userDetails.id);

              this.socketService.onLeaveStatusUpdate((data) => {
                console.log('Leave status updated:', data);
                // You can show a toast notification or refresh UI here
              });

              this.route.navigate(['/dashboard']); // Navigate to dashboard or home page
            },
            error: (error) => {
              console.error('Error fetching user details', error);
              // Handle error, e.g., show an error message
            }
          });

        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login error, e.g., show an error message
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
