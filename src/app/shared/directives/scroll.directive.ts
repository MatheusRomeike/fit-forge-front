import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoScroll]',
})
export class ScrollDirective implements OnInit, OnDestroy {
  @Input() scrollThreshold = 25;
  @Input() maxScrollSpeed = 1;
  @Input() minScrollSpeed = 0.5;

  private isMouseDown = false;
  private isTouching = false;
  private scrollDirection: 'left' | 'right' | 'up' | 'down' | null = null;
  private scrollAnimationFrame: any;
  private isElementClicked = false;
  private lastTouchPosition: { x: number; y: number } | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Desktop events
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    // Mobile events
    document.addEventListener('touchstart', this.onTouchStart, {
      passive: true,
    });
    document.addEventListener('touchmove', this.onTouchMove, { passive: true });
    document.addEventListener('touchend', this.onTouchEnd);
  }

  ngOnDestroy() {
    // Desktop events
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    // Mobile events
    document.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);

    this.stopAutoScroll();
  }

  onMouseDown = (event: MouseEvent): void => {
    if (this.el.nativeElement.contains(event.target)) {
      this.isMouseDown = true;
      this.isElementClicked = true;
    }
  };

  onMouseMove = (event: MouseEvent): void => {
    if (this.isMouseDown && this.isElementClicked) {
      this.handleScrollDirection(event.clientX, event.clientY);
    }
  };

  onMouseUp = (): void => {
    this.isMouseDown = false;
    this.isElementClicked = false;
    this.stopAutoScroll();
  };

  onTouchStart = (event: TouchEvent): void => {
    const touch = event.touches[0];
    if (this.el.nativeElement.contains(touch.target)) {
      this.isTouching = true;
      this.lastTouchPosition = { x: touch.clientX, y: touch.clientY };
    }
  };

  onTouchMove = (event: TouchEvent): void => {
    if (this.isTouching && this.lastTouchPosition) {
      const touch = event.touches[0];
      this.handleScrollDirection(touch.clientX, touch.clientY);
      this.lastTouchPosition = { x: touch.clientX, y: touch.clientY };
    }
  };

  onTouchEnd = (): void => {
    this.isTouching = false;
    this.stopAutoScroll();
  };

  private handleScrollDirection(clientX: number, clientY: number): void {
    const scrollerElement = this.el.nativeElement;
    const scrollerRect = scrollerElement.getBoundingClientRect();

    const distanceFromLeft = clientX - scrollerRect.left;
    const distanceFromRight = scrollerRect.right - clientX;
    const distanceFromTop = clientY - scrollerRect.top;
    const distanceFromBottom = scrollerRect.bottom - clientY;

    // Horizontal scrolling logic
    if (distanceFromRight < this.scrollThreshold) {
      this.scrollDirection = 'right';
      const speed = this.calculateScrollSpeed(distanceFromRight);
      this.startAutoScroll(speed, 'horizontal');
    } else if (distanceFromLeft < this.scrollThreshold) {
      this.scrollDirection = 'left';
      const speed = this.calculateScrollSpeed(distanceFromLeft);
      this.startAutoScroll(speed, 'horizontal');
    } else {
      // Stop horizontal scroll
      if (this.scrollDirection === 'left' || this.scrollDirection === 'right') {
        this.stopAutoScroll();
      }
    }

    // Vertical scrolling logic
    if (distanceFromBottom < this.scrollThreshold) {
      this.scrollDirection = 'down';
      const speed = this.calculateScrollSpeed(distanceFromBottom);
      this.startAutoScroll(speed, 'vertical');
    } else if (distanceFromTop < this.scrollThreshold) {
      this.scrollDirection = 'up';
      const speed = this.calculateScrollSpeed(distanceFromTop);
      this.startAutoScroll(speed, 'vertical');
    } else {
      // Stop vertical scroll
      if (this.scrollDirection === 'up' || this.scrollDirection === 'down') {
        this.stopAutoScroll();
      }
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

  private startAutoScroll(
    scrollSpeed: number,
    direction: 'horizontal' | 'vertical'
  ): void {
    const scrollerElement = this.el.nativeElement;
    const scrollStep = () => {
      if (this.scrollDirection) {
        if (direction === 'horizontal') {
          if (this.scrollDirection === 'right') {
            scrollerElement.scrollLeft += scrollSpeed;
          } else if (this.scrollDirection === 'left') {
            scrollerElement.scrollLeft -= scrollSpeed;
          }
        } else if (direction === 'vertical') {
          if (this.scrollDirection === 'down') {
            scrollerElement.scrollTop += scrollSpeed;
          } else if (this.scrollDirection === 'up') {
            scrollerElement.scrollTop -= scrollSpeed;
          }
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
