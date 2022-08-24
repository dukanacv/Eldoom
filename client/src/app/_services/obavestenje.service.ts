import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obavestenje } from 'app/_models/obavestenje';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + JSON.parse(localStorage.getItem('student') || '{}').token
  })
}

const httpOptionsProfesor = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + JSON.parse(localStorage.getItem('profesor') || '{}').token
  })
}

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getObavestenjaByKursId(kursId: number) {
    return this.http.get<Obavestenje[]>(this.baseUrl + "obavestenje/sva/" + kursId, httpOptions)
  }

  getObavestenjeById(id_obavestenja: number) {
    return this.http.get(this.baseUrl + "obavestenje/" + id_obavestenja, httpOptionsProfesor)
  }

  deleteObavestenjeById(id_obavestenja: number) {
    return this.http.delete(this.baseUrl + "obavestenje/" + id_obavestenja, httpOptionsProfesor)
  }

  izmeniObavestenje(obavestenje: any, id_obavestenja: number) {
    return this.http.put(this.baseUrl + "obavestenje/" + id_obavestenja, obavestenje, httpOptionsProfesor)
  }
}
