import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    standalone: false
})
export class IndexComponent implements OnInit {
  step: string = 'login';
  index = 1;
  currentOpacity = 1;

  ngOnInit(): void {
    this.drawIndex();
    this.startImageRotation();
  }

  changeStep(step: string) {
    this.step = step;
  }

  drawIndex() {
    const imagesIndex = [1, 2, 3];
    let newIndex;

    do {
      newIndex = imagesIndex[Math.floor(Math.random() * imagesIndex.length)];
    } while (newIndex === this.index);

    this.index = newIndex;
  }

  startImageRotation() {
    setInterval(() => {
      this.fadeOut(() => {
        this.drawIndex();
        this.fadeIn();
      });
    }, 10000);
  }

  fadeOut(callback: () => void) {
    this.currentOpacity = 0;
    setTimeout(callback, 1000);
  }

  fadeIn() {
    this.currentOpacity = 1;
  }
}
