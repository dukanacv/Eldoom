import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from 'app/_models/profesor';
import { map, ReplaySubject } from 'rxjs';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "https://localhost:5001/api/"

  private currentStudent = new ReplaySubject<Student | null>(1)
  private currentStudent$ = this.currentStudent.asObservable()//$ je znak za promenljive tipa observable

  private currentProfesor = new ReplaySubject<Profesor | null>(1)
  private currentProfesor$ = this.currentProfesor.asObservable()

  public get _currentStudent$() {
    return this.currentStudent$
  }

  public get _currentProfesor$() {
    return this.currentProfesor$
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

  profesorLogin(model: any) {
    return this.http
      .post<Profesor>(this.baseUrl + "profesor/login", model)
      .pipe(map((response: Profesor) => {
        const profesor = response
        if (profesor) {
          localStorage.setItem("profesor", JSON.stringify(profesor))
          localStorage.setItem("id", profesor.id.toString())
          this.currentProfesor.next(profesor)
          this.router.navigate(["/home-profesor"])
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

  setCurrentProfesor(profesor: Profesor) {
    this.currentProfesor.next(profesor)
  }

  logout() {
    localStorage.removeItem("student")
    localStorage.removeItem("id")
    this.currentStudent.next(null)

    localStorage.removeItem("profesor")
    this.currentProfesor.next(null)
  }
}
