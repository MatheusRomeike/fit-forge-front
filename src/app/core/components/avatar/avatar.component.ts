import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  standalone: false,
})
export class AvatarComponent {
  @Input() firstName = false;

  name = 'Matheus Romeike';

  getName() {
    let name = this.name;
    if (this.firstName) name = name.split(' ')[0];
    return name;
  }
}
