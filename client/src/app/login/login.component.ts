import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {}
  loggedIn: boolean = false

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.model).subscribe(response => {
      console.log(response)
    }, err => console.log(err))
  }

  logout() {
    this.loginService.logout()
  }
}
