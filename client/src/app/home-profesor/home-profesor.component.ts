import { Component, OnInit } from '@angular/core';
import { Kurs } from 'app/_models/kurs';
import { KursService } from 'app/_services/kurs.service';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.css']
})
export class HomeProfesorComponent implements OnInit {
  mojiKursevi!: Kurs[]

  constructor(private kursService: KursService) { }

  ngOnInit(): void {
    this.getKurseviByProfesorId()
  }

  getKurseviByProfesorId() {
    this.kursService.getKurseviByProfesorId(Number(localStorage.getItem("id"))).subscribe(response => {
      this.mojiKursevi = response
    }, err => console.log(err))
  }
}
