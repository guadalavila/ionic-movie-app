import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public helperService: HelpersService,
    public navController: NavController
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async presentToast(message: string) {
    const toast = await this.helperService.showToast({
      message,
      type: 'error',
    });
    toast.present();
  }

  get getErrorMessage() {
    if (
      this.ionicForm.controls.email.errors?.required &&
      this.ionicForm.controls.password.errors?.required
    ) {
      return 'Debe completar el email y contraseña';
    } else if (this.ionicForm.controls.email.errors?.required) {
      return 'Email obligatorio';
    } else if (this.ionicForm.controls.email.errors?.pattern) {
      return 'Email no válido';
    } else if (this.ionicForm.controls.password.errors?.required) {
      return 'Contraseña obligatoria';
    } else if (this.ionicForm.controls.password.errors?.minlength) {
      return 'La contraseña debe tener como mínimo una longitud de 6 caracteres';
    }
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.presentToast(this.getErrorMessage);
      return false;
    } else {
      this.navController.navigateRoot('/movies');
      return true;
    }
  }
}
