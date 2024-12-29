import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  standalone: false,
})
export class LogoutComponent implements AfterViewInit {
  faRightToBracket = faRightToBracket;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.localStorageService.logout(false);
  }

  signIn() {
    this.router.navigate(['authentication']);
  }
}
