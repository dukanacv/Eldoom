import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obavestenje } from 'app/_models/obavestenje';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + JSON.parse(localStorage.getItem('student') || '{}').token
  })
}

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  baseUrl = "https://localhost:5001/api/obavestenje/"

  constructor(private http: HttpClient) { }

  getObavestenjaByKursId(kursId: number) {
    return this.http.get<Obavestenje[]>(this.baseUrl + "sva/" + kursId, httpOptions)
  }
}
