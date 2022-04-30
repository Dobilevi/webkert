import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authentication: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.authentication.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.authentication.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.authentication.signOut();
  }

  isLoggedIn() {
    return this.authentication.user;
  }
}
