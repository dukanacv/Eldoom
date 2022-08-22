import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/_services/login.service';

@Component({
  selector: 'app-profesor-login',
  templateUrl: './profesor-login.component.html',
  styleUrls: ['./profesor-login.component.css']
})
export class ProfesorLoginComponent implements OnInit {
  model: any = {}

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  profesorLogin() {
    this.loginService.profesorLogin(this.model).subscribe(response => {
      console.log(response)
    }, err => console.log(err))
  }

  profesorLogout() {
    this.loginService.logout()
  }

}
