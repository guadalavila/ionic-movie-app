import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  ionicForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public helperService: HelpersService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),],],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public async submitForm() {
    if (!this.ionicForm.valid) {
      this.presentToast(this.getErrorMessage);
    } else {
      const loading = await this.helperService.showLoading('Registrando');
      loading.present();
      const userCreate = this.ionicForm.value as User;
      this.authService.createUser(userCreate.email, userCreate.password).then(() => {
        loading.dismiss();
        this.helperService.showAlertConfirm(
          'Usuario Registrado',
          'Se registró correctamente el usuario',
          false,
          () => this.router.navigateByUrl('/login')).then((alert) => alert.present());
      }, () => {
        loading.dismiss();
        this.presentToast('El usuario ingresado ya se encuentra registrado');
      });
    }
  }

  private async presentToast(message: string) {
    const toast = await this.helperService.showToast({
      header: 'Error',
      message,
      type: 'error',
    });
    toast.present();
  }

  private get getErrorMessage() {
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
}
