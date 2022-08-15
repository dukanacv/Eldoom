import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kurs } from 'app/_models/kurs';
import { KursPrijava } from 'app/_models/kursprijava';
import { KursService } from 'app/_services/kurs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kurs',
  templateUrl: './kurs.component.html',
  styleUrls: ['./kurs.component.css']
})
export class KursComponent implements OnInit {

  kurs!: Kurs
  studentKursevi!: Kurs[]

  kursPrijava: KursPrijava = { students_id_student: Number(localStorage.getItem("id")), kursevi_id_kurs: Number(this.route.snapshot.paramMap.get("id")) }

  constructor(private kursService: KursService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getKurs()
    this.getAllKurseviByStudentId()
  }

  getKurs() {
    this.kursService.getKurs(this.route.snapshot.paramMap.get("id")!).subscribe(kurs => {//iz url izvlaci id
      this.kurs! = kurs
    })
  }

  prijavaNaKurs() {
    this.kursService.prijavaNaKurs(this.kursPrijava).subscribe(response => {
      console.log(this.toastr.success("Prijava na kurs je uspesna!"))
    }, err => console.log(this.toastr.error("Vec ste prijavljeni na ovaj kurs")))
  }

  getAllKurseviByStudentId() {
    this.kursService.getAllKurseviByStudentId(Number(localStorage.getItem("id"))).subscribe(response => {
      this.studentKursevi = response
    })
  }
}
