import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kurs } from 'app/_models/kurs';
import { KursPrijava } from 'app/_models/kursprijava';
import { Obavestenje } from 'app/_models/obavestenje';
import { map, Observable } from 'rxjs';


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

const httpOptions1 = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class KursService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

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

  prijavaNaKurs(kursPrijava: KursPrijava) {
    return this.http.post(this.baseUrl + "kursprijava", kursPrijava, httpOptions)
  }

  getAllKurseviByStudentId(idStudent: number) {
    return this.http
      .get<Kurs[]>(this.baseUrl + "kursprijava/" + idStudent, httpOptions)
  }

  odjavaSaKursa(id_student: number, id_kurs: number) {
    return this.http.delete(this.baseUrl + "kursprijava/odjava/" + id_student + "-" + id_kurs, httpOptions)
  }

  getKurseviByProfesorId(id_profesor: number) {
    return this.http.get<Kurs[]>(this.baseUrl + "kurs/profesor/" + id_profesor, httpOptionsProfesor);
  }

  postaviObavestenje(obavestenje: any, id_kursa: number) {
    return this.http.post(this.baseUrl + "obavestenje/" + id_kursa, obavestenje, httpOptionsProfesor)
  }

  getKurseviIdByProfesorId(id_profesor: number) {
    return this.http.get<number[]>(this.baseUrl + "kurs/profesor-kurs/" + id_profesor, httpOptionsProfesor)
  }
}
