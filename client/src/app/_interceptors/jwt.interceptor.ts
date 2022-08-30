import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { LoginService } from 'app/_services/login.service';
import { Student } from 'app/_models/student';
import { Profesor } from 'app/_models/profesor';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentStudent!: Student | null
    let currentProfesor!: Profesor | null

    this.loginService._currentStudent$.pipe(take(1)).subscribe(student => currentStudent = student)

    this.loginService._currentProfesor$.pipe(take(1)).subscribe(profesor => currentProfesor = profesor)

    if (currentStudent) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer: ${currentStudent.token}`//attach token na svaki req kada je student ulogovan i salje token zajedno sa req
        }
      })
    }

    if (currentProfesor) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer: ${currentProfesor.token}`
        }
      })
    }

    return next.handle(request);
  }
}
