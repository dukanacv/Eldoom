import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http
      .post(this.baseUrl + "student/register", model)
      .pipe()//uzima podatak i transformise ga u neki drugi zeljeni
  }
}
