import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  standalone: false,
})
export class AvatarComponent implements OnInit {
  @Input() firstName = false;

  constructor(public localStorageService: LocalStorageService) {}

  name = '';
  avatar = '';

  ngOnInit(): void {
    this.name = this.getName();
    this.avatar =
      this.localStorageService.getAvatar() || 'assets/images/core/user.png';
  }

  getName() {
    let name = this.localStorageService.getName();
    if (this.firstName) name = name.split(' ')[0];
    return name;
  }
}
