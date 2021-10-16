import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
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
    public navController: NavController,
    private authService: AuthService,
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

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.presentToast(this.getErrorMessage);
      return false;
    } else {
      const user = this.ionicForm.value as User;
      const loading = await this.helperService.showLoading('Ingresando');
      loading.present();
      this.authService.signinUser(user.email, user.password).then(res=>{
        loading.dismiss();
        this.navController.navigateRoot('/movies');
      }, () =>{
        loading.dismiss();
        this.presentToast('Error al ingresar, email o contraseña incorrectos');
      });
      return true;
    }
  }
}
