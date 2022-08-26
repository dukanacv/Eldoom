import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vest } from 'app/_models/vest';

@Injectable({
  providedIn: 'root'
})
export class VestService {

  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getVestiByKursId(id: number) {
    return this.http.get<Vest[]>(this.baseUrl + "vesti/kurs-" + id,)
  }
}
