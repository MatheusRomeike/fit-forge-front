import {
  Component,
  ElementRef,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { BaseInput } from '../../../core/components/base/base-input.component';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class InputTextComponent extends BaseInput implements OnInit {
  @ViewChild('input') input: ElementRef;
  @Input() label: string;
  @Input() formControlName: string;
  @Input() icon: IconDefinition;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() type: string = 'text';
  @Input() isTextArea: boolean = false;
  @Input() unit: string;

  formControl: AbstractControl;
  manualTouch = false;

  validationMessages: Record<string, string> = {
    required: 'input.required',
    email: 'input.email',
    minlength: 'input.minlength',
    maxlength: 'input.maxLength',
    min: 'input.min',
    max: 'input.max',
    pattern: 'input.pattern',
  };

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
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

  get required(): boolean {
    if (!this.formControl?.validator) return false;

    const validator = this.formControl!!.validator({} as AbstractControl);

    if (validator && validator['required']) {
      return true;
    }

    return false;
  }

  public get error(): string {
    if (!this.formControl?.validator) return null;

    if (
      !this.formControl.valid &&
      this.formControl?.touched &&
      this.formControl.errors
    ) {
      const errorKey = Object.keys(this.formControl.errors)[0];
      const errorParams = this.formControl.errors[errorKey];

      let message = this.validationMessages[errorKey];
      this.translateService.get(message).subscribe((x) => (message = x));

      if (errorParams && typeof errorParams === 'object') {
        Object.keys(errorParams).forEach((key: string) => {
          const value = errorParams[key];
          message = message.replace(`{${key}}`, value);
        });
      }

      return message;
    }

    return null;
  }

  click() {
    if (this.type == 'date' || this.type == 'time')
      this.input.nativeElement.showPicker();
  }
}
