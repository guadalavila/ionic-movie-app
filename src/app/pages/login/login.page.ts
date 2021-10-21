import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { ImageService } from 'src/app/services/image.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  image = '../../../assets/images/camera.png';

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public helperService: HelpersService,
    private authService: AuthService,
    private imageService: ImageService,
    private androidPermissions: AndroidPermissions
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
      return false;
    } else {
      const user = this.ionicForm.value as User;
      const loading = await this.helperService.showLoading('Ingresando');
      loading.present();
      this.authService.signinUser(user.email, user.password).then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/movies', { replaceUrl: true });
      }, () => {
        loading.dismiss();
        this.presentToast('Error al ingresar, email o contraseña incorrectos');
      });
    }
  }

  public selectImage() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(result => {
      if (result.hasPermission) {
        this.imageService.getImage().then((imageSelect) => {
          if (imageSelect !== 'data:image/jpeg;base64,O') {
            this.image = imageSelect;
          }
        }, () => {
          this.presentToast('Error al cargar imagen');
        });
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
      }
    }, () => {
      this.presentToast('Error al aceptar permisos');
    });
  }

  private async presentToast(message: string) {
    const toast = await this.helperService.showToast({ message, type: 'error' });
    toast.present();
  }

  private get getErrorMessage() {
    if (this.ionicForm.controls.email.errors?.required && this.ionicForm.controls.password.errors?.required) {
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
}
