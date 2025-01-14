import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoScroll]',
})
export class ScrollDirective implements OnInit, OnDestroy {
  @Input() scrollThreshold = 50;
  @Input() maxScrollSpeed = 1;
  @Input() minScrollSpeed = 0.5;

  private isMouseDown = false;
  private scrollDirection: 'left' | 'right' | null = null;
  private scrollAnimationFrame: any;
  private isElementClicked = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Registra os listeners de mouse
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  ngOnDestroy() {
    // Remove os listeners quando o componente for destruído
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    this.stopAutoScroll();
  }

  onMouseDown = (event: MouseEvent): void => {
    // Verifica se o clique foi no próprio elemento
    if (this.el.nativeElement.contains(event.target)) {
      this.isMouseDown = true;
      this.isElementClicked = true;
    }
  };

  onMouseMove = (event: MouseEvent): void => {
    if (this.isMouseDown && this.isElementClicked) {
      this.handleScrollDirection(event);
    }
  };

  onMouseUp = (): void => {
    this.isMouseDown = false;
    this.isElementClicked = false; // Garante que a rolagem não será acionada fora do elemento
    this.stopAutoScroll();
  };

  private handleScrollDirection(event: MouseEvent): void {
    const scrollerElement = this.el.nativeElement;
    const scrollerRect = scrollerElement.getBoundingClientRect();
    const mouseX = event.clientX;

    const distanceFromLeft = mouseX - scrollerRect.left;
    const distanceFromRight = scrollerRect.right - mouseX;

    if (distanceFromRight < this.scrollThreshold) {
      this.scrollDirection = 'right';
      const speed = this.calculateScrollSpeed(distanceFromRight);
      this.startAutoScroll(speed);
    } else if (distanceFromLeft < this.scrollThreshold) {
      this.scrollDirection = 'left';
      const speed = this.calculateScrollSpeed(distanceFromLeft);
      this.startAutoScroll(speed);
    } else {
      this.stopAutoScroll();
    }
  }

  private calculateScrollSpeed(distance: number): number {
    let distanceRatio = distance / this.scrollThreshold;
    distanceRatio = distanceRatio < -0.2 ? -0.2 : distanceRatio;

    return Math.max(
      this.minScrollSpeed,
      Math.min(this.maxScrollSpeed, this.maxScrollSpeed * (1 - distanceRatio))
    );
  }

  private startAutoScroll(scrollSpeed: number): void {
    const scrollerElement = this.el.nativeElement;
    const scrollStep = () => {
      if (this.scrollDirection) {
        if (this.scrollDirection === 'right') {
          scrollerElement.scrollLeft += scrollSpeed;
        } else if (this.scrollDirection === 'left') {
          scrollerElement.scrollLeft -= scrollSpeed;
        }

        this.scrollAnimationFrame = requestAnimationFrame(scrollStep);
      }
    };
    scrollStep();
  }

  private stopAutoScroll(): void {
    if (this.scrollAnimationFrame) {
      cancelAnimationFrame(this.scrollAnimationFrame);
    }
    this.scrollDirection = null;
  }
}
