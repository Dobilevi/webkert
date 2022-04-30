import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {User} from "../../shared/models/User";
import {usernameValidatorArray} from "../../shared/constants/validators";
import {UserService} from "../../shared/services/user.service";
import {AuthenticationService} from "../../shared/services/authentication.service";
import { Router } from '@angular/router';
import {Subscription} from "rxjs";
import {SurveyDataService} from "../../shared/services/survey-data.service";
import {SurveyData} from "../../shared/models/SurveyData";
import {Survey} from "../../shared/models/Survey";
import {SurveysService} from "../../shared/services/surveys.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  user: User = {
    id: '',
    email: '',
    username: ''
  };

  subscription?: Subscription;
  surveySubscription?: Subscription;
  surveyDataSubscription?: Subscription;

  columns: Array<string> = ['name', 'modified', 'modify'];

  surveys: Map<string, Survey> = new Map<string, Survey>();

  surveysData: Array<SurveyData> = [];

  modifyUserForm = this.createForm({
      id: '',
      email: '',
      username: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private surveysService: SurveysService, private surveyDataService: SurveyDataService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.subscription = this.authenticationService.isLoggedIn().subscribe(credential => {
      if (credential) {
        let subscription = this.userService.getById(credential.uid).subscribe(user => {
          if (user) {
            this.user = user;
            this.modifyUserForm.setValue(user);
          } else {
            console.error("You are not logged in!");
            return;
          }
          subscription.unsubscribe();
        }, error => {
          console.error(error);
        });

        this.surveyDataSubscription = this.surveyDataService.getByUserId(credential.uid).subscribe(surveysData => {
          this.surveysData = surveysData;
        }, error => {
          console.error(error);
        });
      } else {
        console.error("An error happened!");
        return;
      }
    }, error => {
      console.error(error);
    });

     this.surveysService.getAll().subscribe((data: Array<Survey>) => {
       for (let survey of data) {
         if (survey) {
           this.surveys.set(survey.id, survey);
         }
       }
    }, error => {
      console.error(error);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.surveySubscription?.unsubscribe();
    this.surveyDataSubscription?.unsubscribe();
  }

  createForm(model: User) {
    let formGroup = this.formBuilder.group(model);

    formGroup.get('username')?.addValidators([...usernameValidatorArray]);

    return formGroup;
  }

  modify() {
    if (this.user.id !== '' && this.modifyUserForm.valid) {
      this.userService.update(this.user.id, {
        username: this.modifyUserForm.getRawValue().username
      }).then(_ => {
        this.router.navigateByUrl("/");
      }).catch(error => {
        console.error(error);
      });
    }
  }

  delete() {
    let subscription = this.authenticationService.isLoggedIn().subscribe(credential => {
      if (credential?.uid) {
        credential.delete().then(_ => {
          this.userService.delete(credential.uid).then(_ => {
            this.router.navigateByUrl('/');
          }).catch(error => {
            console.error(error);
          });
        }).catch(error => {
          console.error(error);
        });
      }
      subscription.unsubscribe();
    }, error => {
      console.error(error);
    });
  }

  getUsernameErrorMessage() {
      return 'Legalább 6 karakter';
  }
/*
  getPasswordErrorMessage() {
    return 'Kötelező';
  }
*/
}
