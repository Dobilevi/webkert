import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SurveyDataService} from "../../../shared/services/survey-data.service";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {Subscription} from "rxjs";
import {SurveyData} from "../../../shared/models/SurveyData";
import {basicValidator} from "../../../shared/constants/validators";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit, OnDestroy {
  userId?: string;

  loaded: boolean = false;

  today: Date = new Date();

  subscription?: Subscription;

  surveyId: string = 'personal-data';

  surveyGroup: FormGroup = new FormGroup({
    nameGroup: new FormGroup({
      firstName: new FormControl('', [...basicValidator]),
      lastName: new FormControl('', [...basicValidator])
    }),
    gender: new FormControl('', [Validators.required]),
    birthGroup: new FormGroup({
      dateOfBirth: new FormControl('', [Validators.required]),
      placeOfBirth: new FormControl('', [...basicValidator])
    })
  });

  constructor(private router: Router, private surveyDataService: SurveyDataService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.today = new Date();

    this.loaded = false;

    this.subscription = this.authenticationService.isLoggedIn().subscribe(credential => {
      if (credential?.uid) {
        this.userId = credential.uid;
        let subscription = this.surveyDataService.read(this.surveyId, credential?.uid).subscribe((data?: SurveyData) => {
          if (data) {
            this.surveyGroup.setValue(JSON.parse(data.data));
            this.loaded = true;
          }
          subscription.unsubscribe();
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  submit(){
    this.today = new Date();

    let data = this.surveyGroup.getRawValue();

    if (this.userId && this.surveyGroup.valid) {
      this.surveyDataService.create({
        userId: this.userId,
        surveyId: this.surveyId,
        modified: this.today.toISOString(),
        data: JSON.stringify(data)
      }).then(_ => {
        this.router.navigateByUrl("/");
      }).catch(error => {
        console.error(error);
      });
    }
  }

  modify() {
    if (this.userId && this.surveyGroup.valid) {
      this.surveyDataService.update({
        surveyId: this.surveyId,
        userId: this.userId,
        modified: new Date().toISOString(),
        data: JSON.stringify(this.surveyGroup.getRawValue())
      }).then(() => {
        this.router.navigateByUrl("/");
      }).catch(error => {
        console.error(error);
      });
    }
  }

  delete() {
    if (this.userId) {
      this.surveyDataService.delete(this.userId, this.surveyId).then(() => {
        this.router.navigateByUrl("/");
      }).catch(error => {
        console.error(error);
      });
    }
  }

  getErrorMessage() {
    return 'Kötelező';
  }
}
