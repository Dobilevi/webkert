import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() loggedInUser: firebase.default.User | null = null;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() currentPage: string = '';
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  menuSwitch(){
    this.selectedPage.emit(this.currentPage);
  }

  logout() {
    this.onLogout.emit(true);
  }
}
