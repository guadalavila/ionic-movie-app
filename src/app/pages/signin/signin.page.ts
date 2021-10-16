import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public helperService: HelpersService,
    private authService: AuthService,
    private router: Router
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
      header: 'Error',
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
      return 'Debe completar todos los datos';
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

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.presentToast(this.getErrorMessage);
      return false;
    } else {
      const loading = await this.helperService.showLoading('Registrando');
      loading.present();
      const userCreate = this.ionicForm.value as User;
      this.authService.createUser(userCreate.email, userCreate.password).then(
        () => {
          loading.dismiss();
          this.helperService
            .showAlertConfirm(
              'Usuario Registrado',
              'se registró correctamente el usuario',
              () => this.router.navigateByUrl('/login')
            )
            .then((a) => a.present());
        },
        (error) => {
          loading.dismiss();
          this.presentToast('Error al registrar usuario');
        }
      );
    }
  }
}
