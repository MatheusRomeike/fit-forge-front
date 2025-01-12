import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  standalone: false,
})
export class AvatarComponent implements OnInit, OnDestroy {
  @Input() firstName = false;

  constructor(public localStorageService: LocalStorageService) {}

  name = '';
  avatar = '';
  private authSubscription: Subscription;

  ngOnInit(): void {
    this.name = this.getName();
    this.avatar =
      this.localStorageService.getAvatar() || 'assets/images/core/user.png';

    this.authSubscription = this.localStorageService.authentication$.subscribe(
      (user) => {
        this.avatar = user.avatar || 'assets/images/core/user.png';
      }
    );
  }

  ngOnDestroy(): void {
    // Limpa a inscrição para evitar vazamentos de memória
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  getName() {
    let name = this.localStorageService.getName();
    if (this.firstName) name = name.split(' ')[0];
    return name;
  }
}
