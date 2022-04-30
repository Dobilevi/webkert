import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {AuthenticationService} from "./shared/services/authentication.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  page = 'main';
  routes: Array<string> = [];
  loggedInUser: firebase.default.User | null = null;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authenticationService.isLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  logout(_?: boolean) {
    this.authenticationService.logout().then(() => {
      this.router.navigateByUrl('/');
    }).catch(error => {
      console.error(error);
    });
  }

  toggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  close(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }
}
