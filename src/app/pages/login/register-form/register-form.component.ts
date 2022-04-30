import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/models/User";
import {
  emailValidatorArray,
  passwordValidatorArray,
  usernameValidatorArray
} from "../../../shared/constants/validators";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm = new FormGroup({
    userGroup: this.createForm({
      id: '',
      email: '',
      username: ''
    }),
    password: new FormControl('', [...passwordValidatorArray]),
    rePassword: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticatonService: AuthenticationService, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  createForm(model: User) {
    let formGroup = this.formBuilder.group(model);

    formGroup.get('email')?.addValidators([...emailValidatorArray]);
    formGroup.get('username')?.addValidators([...usernameValidatorArray]);

    return formGroup;
  }

  register() {
    if (this.registerForm.valid && this.registerForm.getRawValue().password === this.registerForm.getRawValue().rePassword) {
      this.authenticatonService.register(this.registerForm.getRawValue().userGroup.email, this.registerForm.getRawValue().password).then(credential => {
        console.log(credential);
        this.userService.create({
          id: credential.user?.uid as string,
          email: this.registerForm.getRawValue().userGroup.email,
          username: this.registerForm.getRawValue().userGroup.username
        }).then(_ => {
          this.router.navigateByUrl('/');
          console.log('Logged in successfully.');
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      });
    } else {
      console.error("Form is not valid!");
    }
  }

  getEmailErrorMessage(): string {
    if (this.registerForm.get('userGroup')?.get('email')?.hasError('required')) {
      return 'Kötelező';
    }

    return this.registerForm.get('userGroup')?.get('email')?.hasError('email') ? 'Nem egy érvényes e-mail cím' : '';
  }

  getPasswordErrorMessage(): string {
    if (this.registerForm.get('password')?.hasError('required')) {
      return 'Kötelező';
    }

    return this.registerForm.get('password')?.hasError('pattern') ? 'Legalább egy számot, egy kis- és egy nagybetűt tartalmaznia kell' : '';
  }

  getUsernameErrorMessage(): string {
    return 'Kötelező';
  }

  getRePasswordErrorMessage(): string {
    return 'Kötelező';
  }
}
