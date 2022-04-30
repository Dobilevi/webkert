import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  loggedInUser: firebase.default.User | null = null;
  subscription: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.subscription = this.authenticationService.isLoggedIn().subscribe(credential => {
      this.loggedInUser = credential;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
