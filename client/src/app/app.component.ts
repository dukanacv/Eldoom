import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    this.setCurrentStudent()
  }

  setCurrentStudent() {
    const student: Student = JSON.parse(localStorage.getItem("student")!)
    this.loginService.setCurrentStudent(student)
  }
}
