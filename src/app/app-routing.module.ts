import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationGuard} from "./shared/services/authentication.guard";
import {NoAuthenticationGuard} from "./shared/services/no-authentication.guard";

const routes: Routes = [
  {
    path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [NoAuthenticationGuard]
  },
  {
    path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'surveys',
    loadChildren: () => import('./pages/surveys/surveys.module').then(m => m.SurveysModule)
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
