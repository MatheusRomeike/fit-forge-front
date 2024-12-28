import {
  AfterContentChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: false,
})
export class LogoComponent implements AfterContentChecked {
  logoPath = 'assets/images/logo/logo.png';
  isDarkMode: boolean = false;

  @ViewChild('logoImage') logoImage!: ElementRef<HTMLImageElement>;

  private resizeObserver!: ResizeObserver;

  constructor(private themeService: ThemeService) {}

  ngAfterContentChecked(): void {
    this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.updateLogoPath(isDarkMode);
    });
    this.observeLogoSize();
  }

  private observeLogoSize(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateLogoPath(this.isDarkMode);
    });

    if (this.logoImage) {
      this.resizeObserver.observe(this.logoImage.nativeElement);
    }
  }

  private updateLogoPath(isDarkMode: boolean): void {
    if (this.logoImage && this.logoImage?.nativeElement) {
      const width = this.logoImage.nativeElement.width;
      const logoPrefix = width < 90 ? 'small-' : ''; // Verifica a largura da imagem

      if (isDarkMode) {
        this.logoPath = `assets/images/logo/${logoPrefix}logo-dark.png`;
      } else {
        this.logoPath = `assets/images/logo/${logoPrefix}logo.png`;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
