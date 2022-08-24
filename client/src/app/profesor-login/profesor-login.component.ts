import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/_services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profesor-login',
  templateUrl: './profesor-login.component.html',
  styleUrls: ['./profesor-login.component.css']
})
export class ProfesorLoginComponent implements OnInit {
  model: any = {}

  constructor(public loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  profesorLogin() {
    this.loginService.profesorLogin(this.model).subscribe(response => {
      console.log(response)
    }, err => this.toastr.error("Uneti parametri nisu validni. Pokusajte ponovo."))
  }

  profesorLogout() {
    this.loginService.logout()
  }

}
