import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var Toasty: any;
declare var Swal: any;

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private translateService: TranslateService = inject(TranslateService);

  private toasty: any;

  constructor() {
    this.toasty = new Toasty({
      transition: 'slideLeftFade',
      insertBefore: true,
      duration: 4000,
      enableSounds: false,
      autoClose: true,
      progressBar: true,
      prependTo: document.body.childNodes[0],
    });
  }

  public info(message: string = 'api-exception.unexpected.unexpected-error') {
    this.translateService.get(message).subscribe((translatedMessage) => {
      this.toasty.info(translatedMessage);
    });
  }

  public success(
    message: string = 'api-exception.unexpected.unexpected-error'
  ) {
    this.translateService.get(message).subscribe((translatedMessage) => {
      this.toasty.success(translatedMessage);
    });
  }

  public warning(
    message: string = 'api-exception.unexpected.unexpected-error'
  ) {
    this.translateService.get(message).subscribe((translatedMessage) => {
      this.toasty.warning(translatedMessage);
    });
  }

  public error(message: string = 'api-exception.unexpected.unexpected-error') {
    this.translateService.get(message).subscribe((translatedMessage) => {
      this.toasty.error(translatedMessage);
    });
  }

  public confirmation(title: string, text: string): Promise<any> {
    this.translateService.get(title).subscribe((translatedMessage) => {
      title = translatedMessage;
    });
    this.translateService.get(text).subscribe((translatedMessage) => {
      text = translatedMessage;
    });
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5C71CB',
      cancelButtonColor: '#EAEBEC',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });
  }

  public confirmationSuccess(title: string, text: string): Promise<any> {
    this.translateService.get(title).subscribe((translatedMessage) => {
      title = translatedMessage;
    });
    this.translateService.get(text).subscribe((translatedMessage) => {
      text = translatedMessage;
    });
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#7367F0',
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
    });
  }

  // public alertSound() {
  //   var snd = new Audio('../../../assets/audio/note.mp3');
  //   setTimeout(() => {
  //     snd.play();
  //   }, 100);
  // }
}
