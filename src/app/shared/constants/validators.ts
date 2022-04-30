import {ValidatorFn, Validators} from "@angular/forms";

export const basicValidator: Array<any> = [Validators.required, Validators.maxLength(50)];

export const emailValidatorArray: Array<any> = [Validators.required, Validators.email];

export const usernameValidatorArray: Array<any> = [Validators.required, Validators.minLength(6), Validators.maxLength(50)];

export const passwordValidatorArray: Array<any> = [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$')];

export const numberValidator: Array<any> = [Validators.required, Validators.pattern('^(0|[1-9]\\d*)$')];
