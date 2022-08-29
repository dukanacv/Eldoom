import { Component, OnInit } from '@angular/core';
import { KursPrijava } from 'app/_models/kursprijava';
import { ProfesorPrijava } from 'app/_models/profesorprijava';
import { KursService } from 'app/_services/kurs.service';

@Component({
  selector: 'app-profesor-prijava',
  templateUrl: './profesor-prijava.component.html',
  styleUrls: ['./profesor-prijava.component.css']
})
export class ProfesorPrijavaComponent implements OnInit {
  prijave!: ProfesorPrijava[]
  toastr: any;

  kursPrijava: any = {}

  constructor(private kursService: KursService) { }

  ngOnInit(): void {
    this.getPrijave()
  }

  getPrijave() {
    this.kursService.getProfesorPrijave(Number(localStorage.getItem("id"))).subscribe(response => {
      this.prijave = response
      console.log(this.prijave)
    }, err => console.log(err))
  }

  prijaviStudentaNaKurs(kursPrijava: any) {
    this.kursService.prijavaNaKurs(kursPrijava).subscribe(response => {
      console.log(this.toastr.success("Prijavili ste studenta na kurs"))
      this.ngOnInit()
    }, err => this.toastr.error("Student je vec prijavljen na ovaj kurs."))
  }
}
