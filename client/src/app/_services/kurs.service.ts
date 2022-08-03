import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kurs } from 'app/_models/kurs';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + JSON.parse(localStorage.getItem('student') || '{}').token
  })
}

@Injectable({
  providedIn: 'root'
})

export class KursService {

  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getOsnovni(): Observable<Kurs[]> {
    return this.http.get<Kurs[]>(this.baseUrl + "kurs/osnovni")
  }

  getMaster() {
    return this.http.get(this.baseUrl + "kurs/master")
  }

  getDoktorski() {
    return this.http.get(this.baseUrl + "kurs/doktorski")
  }

  getKurs(id: string) {
    return this.http.get<Kurs>(this.baseUrl + "kurs/" + id, httpOptions)
  }
}
