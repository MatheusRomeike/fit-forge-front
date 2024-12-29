import { Injectable } from '@angular/core';

declare var Toasty: any;
declare var Swal: any;

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private toasty: any;

  constructor() {
    this.toasty = new Toasty({
      transition: 'pinItUp',
      insertBefore: true,
      duration: 4000,
      enableSounds: false,
      autoClose: true,
      progressBar: true,
      prependTo: document.body.childNodes[0],
    });
  }

  public info(message: string) {
    this.toasty.info(message);
  }

  public success(message: string) {
    this.toasty.success(message);
  }

  public warning(message: string) {
    this.toasty.warning(message);
  }

  public error(message: string) {
    this.toasty.error(message);
  }

  public confirmation(title: string, text: string): Promise<any> {
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
