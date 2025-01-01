import { Component, OnInit } from '@angular/core';
import { GoogleAuthenticationService } from '../../../authentication/shared/services/google-authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  constructor(
    private googleAuthenticationService: GoogleAuthenticationService
  ) {}

  ngOnInit(): void {
    this.googleAuthenticationService.dismissPrompt();
  }
}
