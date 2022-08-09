import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Student } from 'app/_models/student';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    //this.getLoggedInStudent()
  }

  /* getLoggedInStudent() {
     this.loginService._currentStudent$.subscribe(student => {
       this.brIndexa = student!.brIndexa
     })
   }*/

  logout() {
    this.loginService.logout()
  }
}
