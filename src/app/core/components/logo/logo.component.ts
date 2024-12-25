import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: false,
})
export class LogoComponent implements AfterViewInit {
  logoPath = 'assets/images/logo/logo.png';
  isDarkMode: boolean = false; // Variável para armazenar o valor atual do modo escuro

  @ViewChild('logoImage') logoImage!: ElementRef<HTMLImageElement>;

  private resizeObserver!: ResizeObserver;

  constructor(private themeService: ThemeService) {
    // Assinando o observable isDarkMode$ para atualizar o tema e a logo
    this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.updateLogoPath(isDarkMode);
    });
  }

  ngAfterViewInit(): void {
    this.observeLogoSize();
  }

  private observeLogoSize(): void {
    // Criação de um ResizeObserver para monitorar as mudanças de tamanho do logo
    this.resizeObserver = new ResizeObserver(() => {
      this.updateLogoPath(this.isDarkMode); // Atualiza o caminho sempre que o tamanho muda
    });

    if (this.logoImage) {
      this.resizeObserver.observe(this.logoImage.nativeElement);
    }
  }

  private updateLogoPath(isDarkMode: boolean): void {
    if (this.logoImage && this.logoImage.nativeElement) {
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
    // Limpeza do ResizeObserver quando o componente for destruído
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
