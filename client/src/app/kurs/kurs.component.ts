import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kurs } from 'app/_models/kurs';
import { KursPrijava } from 'app/_models/kursprijava';
import { KursService } from 'app/_services/kurs.service';

@Component({
  selector: 'app-kurs',
  templateUrl: './kurs.component.html',
  styleUrls: ['./kurs.component.css']
})
export class KursComponent implements OnInit {

  kurs!: Kurs

  kursPrijava: KursPrijava = { students_id_student: 3, kursevi_id_kurs: Number(this.route.snapshot.paramMap.get("id")) }

  constructor(private kursService: KursService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getKurs()
  }

  getKurs() {
    this.kursService.getKurs(this.route.snapshot.paramMap.get("id")!).subscribe(kurs => {//iz url izvlaci id
      this.kurs! = kurs
    })
  }

  prijavaNaKurs() {
    this.kursService.prijavaNaKurs(this.kursPrijava).subscribe(response => {
      console.log(this.kursPrijava)
    }, err => console.log(err))
  }
}
