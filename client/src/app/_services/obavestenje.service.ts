import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obavestenje } from 'app/_models/obavestenje';


@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getObavestenjaByKursId(kursId: number) {
    return this.http.get<Obavestenje[]>(this.baseUrl + "obavestenje/sva/" + kursId)
  }

  getObavestenjeById(id_obavestenja: number) {
    return this.http.get(this.baseUrl + "obavestenje/" + id_obavestenja)
  }

  deleteObavestenjeById(id_obavestenja: number) {
    return this.http.delete(this.baseUrl + "obavestenje/" + id_obavestenja)
  }

  izmeniObavestenje(obavestenje: any, id_obavestenja: number) {
    return this.http.put(this.baseUrl + "obavestenje/" + id_obavestenja, obavestenje)
  }
}
