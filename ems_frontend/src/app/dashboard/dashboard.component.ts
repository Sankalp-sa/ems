import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/auth.user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userDetails: User | null = null; // Assuming User is a defined interface for user details

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.userDetails = this.authService.userDetails;

  }

}
