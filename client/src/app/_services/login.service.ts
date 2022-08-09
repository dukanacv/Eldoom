import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, ReplaySubject } from 'rxjs';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "https://localhost:5001/api/"
  private currentStudent = new ReplaySubject<Student | null>(1)
  private currentStudent$ = this.currentStudent.asObservable()//$ je znak za promenljive tipa observable

  public get _currentStudent$() {
    return this.currentStudent$
  }

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http
      .post<Student>(this.baseUrl + "student/login", model)
      .pipe(map((response: Student) => {
        const student = response
        if (student) {
          localStorage.setItem("student", JSON.stringify(student))//kao sesija u php, samo sto je na client strani i ima otprilike 5MB
          localStorage.setItem("id", student.id.toString())
          this.currentStudent.next(student)
          this.router.navigate(["/"])
        }
      })
      )
  }

  getStudentById(id: number) {
    return this.http.get<Student>(this.baseUrl + "student/" + id)
  }


  setCurrentStudent(student: Student) {
    this.currentStudent.next(student)
  }

  logout() {
    localStorage.removeItem("student")
    localStorage.removeItem("id")
    this.currentStudent.next(null)
  }
}
