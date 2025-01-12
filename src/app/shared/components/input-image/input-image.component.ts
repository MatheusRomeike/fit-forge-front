import {
  Component,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { BaseInput } from '../../../core/components/base/base-input.component';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-input-image',
  standalone: false,
  templateUrl: './input-image.component.html',
  styleUrl: './input-image.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputImageComponent),
      multi: true,
    },
  ],
})
export class InputImageComponent extends BaseInput implements OnInit {
  @Input() formControlName: string;
  @Input() multiple: boolean = false;
  @Input() accept: string = 'image/*';
  @Input() link: string = '';

  faPlus = faPlus;
  faTimes = faTimes;
  isLink: boolean = false;
  formControl: AbstractControl;

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    private translateService: TranslateService,
    private helperService: HelperService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.link) this.isLink = true;

    if (this.controlContainer) {
      if (this.formControlName) {
        this.formControl = this.controlContainer!!.control!!.get(
          this.formControlName
        );
      } else {
        console.warn(
          'Missing FormControlName directive from host element of the component'
        );
      }
    }
  }

  async onFileSelected(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];

      try {
        const base64 = await this.helperService.fileToBase64(file);

        this.link = base64;
        this.isLink = false;

        if (this.formControl) {
          this.formControl.setValue(base64.split(',')[1]);
          this.formControl.markAsDirty();
        }
      } catch (error) {
        console.error('Erro ao converter arquivo para base64:', error);
      }
      fileInput.value = '';
    }
  }

  // Método para remover a imagem
  removeImage(event: MouseEvent): void {
    event.stopPropagation(); // Impede que o click no botão dispare o evento de click do container
    this.link = ''; // Limpa a imagem
    this.isLink = false; // Restaura o estado inicial
    if (this.formControl) {
      this.formControl.setValue(null); // Limpa o valor do formulário
      this.formControl.markAsDirty(); // Marca como sujo para refletir a mudança
    }
  }
}
