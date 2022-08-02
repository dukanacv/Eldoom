import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KursService {

  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getOsnovni() {
    return this.http.get(this.baseUrl + "kurs/osnovni")
  }

  getMaster() {
    return this.http.get(this.baseUrl + "kurs/master")
  }

  getDoktorski() {
    return this.http.get(this.baseUrl + "kurs/doktorski")
  }
}
