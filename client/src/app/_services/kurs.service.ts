import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kurs } from 'app/_models/kurs';
import { KursPrijava } from 'app/_models/kursprijava';
import { Obavestenje } from 'app/_models/obavestenje';
import { ProfesorPrijava } from 'app/_models/profesorprijava';
import { map, Observable } from 'rxjs';


/*const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + JSON.parse(localStorage.getItem('student') || '{}').token
  })
}

const httpOptionsProfesor = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + JSON.parse(localStorage.getItem('profesor') || '{}').token
  })
}*/

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
    return this.http.get<Kurs>(this.baseUrl + "kurs/" + id)
  }

  prijavaNaKurs(kursPrijava: KursPrijava) {
    return this.http.post(this.baseUrl + "kursprijava", kursPrijava)
  }

  getAllKurseviByStudentId(idStudent: number) {
    return this.http
      .get<Kurs[]>(this.baseUrl + "kursprijava/" + idStudent)
  }

  odjavaSaKursa(id_student: number, id_kurs: number) {
    return this.http.delete(this.baseUrl + "kursprijava/odjava/" + id_student + "-" + id_kurs)
  }

  getKurseviByProfesorId(id_profesor: number) {
    return this.http.get<Kurs[]>(this.baseUrl + "kurs/profesor/" + id_profesor);
  }

  postaviObavestenje(obavestenje: any, id_kursa: number) {
    return this.http.post(this.baseUrl + "obavestenje/" + id_kursa, obavestenje)
  }

  getKurseviIdByProfesorId(id_profesor: number) {
    return this.http.get<number[]>(this.baseUrl + "kurs/profesor-kurs/" + id_profesor)
  }

  postaviVest(vest: any, id_profesora: number, id_kursa: number) {
    return this.http.post(this.baseUrl + "vesti/" + id_profesora + "-" + id_kursa, vest)
  }

  getProfesorPrijave(id_profesor: number) {
    return this.http.get<ProfesorPrijava[]>(this.baseUrl + "kursprijava/profesor/" + id_profesor);
  }

  posaljiPrijavuProfesoru(kursPrijava: any) {
    return this.http.post(this.baseUrl + "kursprijava/profesor", kursPrijava)
  }
}
