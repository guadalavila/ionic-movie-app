import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ToastDefault } from '../models/toastDefault.model';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  getCssClass(type: string) {
    switch (type) {
      case 'success':
        return 'toast-style-success';
      case 'warning':
        return 'toast-style-warning';
      case 'error':
        return 'toast-style-danger';
      default:
        return '';
    }
  }

  showToast(toast: ToastDefault) {
    return this.toastController.create({
      animated: true,
      header: toast.header,
      message: toast.message,
      duration: toast.duration || 3000,
      position: toast.position || 'top',
      cssClass: this.getCssClass(toast.type),
    });
  }

  showLoading(message: string) {
    return this.loadingController.create({
      message,
      spinner: 'dots',
      translucent: true,
    });
  }


  showAlertConfirm(header: string, message: string, handlerPress: any) {
    return this.alertController.create({
      header,
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => handlerPress()
        }]
    });
  }
}
