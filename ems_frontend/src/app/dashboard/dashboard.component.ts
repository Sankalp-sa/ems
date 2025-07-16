import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/auth.user.interface';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userDetails: any = null; // Assuming User is a defined interface for user details

  constructor(private authService: AuthService, private dashboardService: DashboardService) { }

  ngOnInit(): void {

    // this.userDetails = this.authService.userDetails;
    this.getUserProfile();
  }

  getUserProfile() {
    this.dashboardService.getUserProfile().subscribe({
      next: (userDetails) => {
        this.userDetails = userDetails;
        console.log('User details fetched successfully', userDetails);
      },
      error: (error) => {
        console.error('Error fetching user details', error);
      }
    })
  }

}
