import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Profesor } from './_models/profesor';
import { Student } from './_models/student';
import { LoginService } from './_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser() {
    const student: Student = JSON.parse(localStorage.getItem("student")!)
    const profesor: Profesor = JSON.parse(localStorage.getItem("profesor")!)

    if (student != null) {
      this.loginService.setCurrentStudent(student)
    }

    if (profesor != null) {
      this.loginService.setCurrentProfesor(profesor)
    }
  }
}
