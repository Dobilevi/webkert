import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() loggedInUser: firebase.default.User | null = null;
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  close(logout?: boolean) {
    //
   if (logout === true){
    this.logout();
   }
  }

  logout() {
    this.onLogout.emit(true);
  }
}
