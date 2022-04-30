import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveysService} from "../../shared/services/surveys.service";
import {Survey} from "../../shared/models/Survey";
import {Subscription} from "rxjs";
import {SurveyDataService} from "../../shared/services/survey-data.service";
import {SurveyData} from "../../shared/models/SurveyData";
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  surveyData: Array<string> = [];

  surveyObjects?: Array<Survey>;

  fills: Map<string, number> = new Map<string, number>();

  subscription?: Subscription;

  constructor(private authenticationService: AuthenticationService, private surveysService: SurveysService, private surveyDataService: SurveyDataService) { }

  ngOnInit(): void {
    this.subscription = this.surveysService.getAll().subscribe((data: Array<Survey>) => {
      this.surveyObjects = data;

      for (let item of data){
        this.fills.set(item.id, 0);
      }

      let subscription = this.surveyDataService.getAll().subscribe((surveyData: Array<SurveyData>) => {
        let userSubscription = this.authenticationService.isLoggedIn().subscribe(credential => {
          this.loggedIn = credential !== null;

          for (let item of surveyData){
            let n = this.fills.get(item.surveyId);
            if (n !== undefined) {
              this.fills.set(item.surveyId, n + 1);
            }
            if (item.userId === credential?.uid) {
              this.surveyData.push(item.surveyId);
            }
          }
          userSubscription.unsubscribe();
        });
        subscription.unsubscribe();
      });
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
