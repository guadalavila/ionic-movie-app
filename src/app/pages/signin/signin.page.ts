import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, public toastController: ToastController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      animated: true,
      header: 'Error',
      position: 'top',
      message,
      duration: 3500,
      cssClass: 'toast-style'
    });
    toast.present();
  }


  get getErrorMessage(){
    if(this.ionicForm.controls.email.errors?.required && this.ionicForm.controls.password.errors?.required){
      return 'Debe completar todos los datos';
    }else if(this.ionicForm.controls.email.errors?.required){
      return 'Email obligatorio';
    }else if(this.ionicForm.controls.email.errors?.pattern){
      return 'Email no válido';
    }else if(this.ionicForm.controls.password.errors?.required){
      return 'Contraseña obligatoria';
    }else if(this.ionicForm.controls.password.errors?.minlength){
      return 'La contraseña debe tener como mínimo una longitud de 6 caracteres';
    }else if(this.ionicForm.controls.passwordConfirm.errors?.required){
      return 'Debe confirmar la contraseña';
    }else if(this.ionicForm.controls.passwordConfirm.errors?.minlength){
      return 'La contraseña debe tener como mínimo una longitud de 6 caracteres';
    }
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.presentToast(this.getErrorMessage);
      return false;
    } else {
      // this.navController.navigateRoot('/login');
      console.log(this.ionicForm.value);
      return true;
    }
  }

}
