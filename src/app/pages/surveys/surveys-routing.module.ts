import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveysComponent } from './surveys.component';
import {AuthenticationGuard} from "../../shared/services/authentication.guard";

const routes: Routes = [
  {
    path: '', component: SurveysComponent
  },
  {
    path: 'personal-data',
    loadChildren: () => import('./personal-data/personal-data.module').then(m => m.PersonalDataModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'school',
    loadChildren: () => import('./school/school.module').then(m => m.SchoolModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'technology',
    loadChildren: () => import('./technology/technology.module').then(m => m.TechnologyModule),
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }
