import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {}
  loggedIn: boolean = false

  constructor(public loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.model).subscribe(response => {
    }, err => {
      this.toastr.error("Parametri nisu dobri.")
    })
  }

  logout() {
    this.loginService.logout()
  }
}
