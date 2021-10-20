import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) { }

  createUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(email, password).then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  signinUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.fireAuth.currentUser) {
        this.fireAuth.signOut().then(() => {
          resolve();
        }).catch(() => {
          reject();
        });
      }
    });
  }

  getUser() {
    return this.fireAuth.authState.pipe(first()).toPromise();
  }
}
