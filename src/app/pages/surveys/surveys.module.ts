import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './surveys.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    SurveysComponent
  ],
    imports: [
        CommonModule,
        SurveysRoutingModule,
        MatCardModule
    ]
})
export class SurveysModule { }
