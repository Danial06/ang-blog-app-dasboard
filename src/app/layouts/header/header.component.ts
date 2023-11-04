import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService) {

  }
  username: string;
  isLoggedIn$: Observable<boolean>;
  ngOnInit(): void {

    console.log(JSON.parse(localStorage.getItem('user')).email);
    this.username = JSON.parse(localStorage.getItem('user')).email;
    this.isLoggedIn$ = this.auth.isLoggedIn();



  }
  Logout() {
    this.auth.Logout();
  }

}
