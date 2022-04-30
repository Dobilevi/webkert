import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/models/User";
import {
  emailValidatorArray,
  passwordValidatorArray
} from "../../../shared/constants/validators";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
      userGroup: this.createForm({
        id: '',
        email: '',
        username: '',
      }),
      password: new FormControl('', [...passwordValidatorArray])
    });

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  createForm(model: User) {
    let formGroup = this.formBuilder.group(model);

    formGroup.get('email')?.addValidators([...emailValidatorArray]);
    formGroup.get('password')?.addValidators([Validators.required]);

    return formGroup;
  }

  login() {
    if(this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.getRawValue().userGroup.email, this.loginForm.getRawValue().password).then(credential => {
        console.log(credential);
        this.router.navigateByUrl('/');
      }).catch(error => {
        console.error(error);
      });
    } else {
      console.error('Form is not valid!');
    }
  }

  getEmailErrorMessage() {
    if (this.loginForm.get('userGroup')?.get('email')?.hasError('required')) {
      return 'Kötelező';
    }

    return this.loginForm.get('userGroup')?.get('email')?.hasError('email') ? 'Nem egy érvényes e-mail cím' : '';
  }

  getPasswordErrorMessage() {
      return 'Kötelező';
  }
}
