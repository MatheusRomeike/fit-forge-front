import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-image',
  standalone: false,
  templateUrl: './input-image.component.html',
  styleUrl: './input-image.component.scss',
})
export class InputImageComponent {
  faPlus = faPlus;
  imageUrl: string | null =
    'https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp'; // Armazena o URL da imagem ou do link
  isLink: boolean = false; // Identifica se a URL é um link ou se é um arquivo

  // Abre o input de arquivo quando o componente é clicado
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.isLink = false;
      };

      reader.readAsDataURL(file);
    }
  }

  // Permite que o usuário insira um link diretamente
  onLinkInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.value) {
      this.imageUrl = input.value;
      this.isLink = true;
    }
  }
}
