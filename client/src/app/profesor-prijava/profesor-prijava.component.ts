import { Component, OnInit } from '@angular/core';
import { ProfesorPrijava } from 'app/_models/profesorprijava';
import { KursService } from 'app/_services/kurs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profesor-prijava',
  templateUrl: './profesor-prijava.component.html',
  styleUrls: ['./profesor-prijava.component.css']
})
export class ProfesorPrijavaComponent implements OnInit {
  prijave!: ProfesorPrijava[]

  kursPrijava: any = {}

  constructor(private kursService: KursService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPrijave()
  }

  getPrijave() {
    this.kursService.getProfesorPrijave(Number(localStorage.getItem("id"))).subscribe(response => {
      this.prijave = response
    }, err => console.log(err))
  }

  prijaviStudentaNaKurs(kursPrijava: any) {
    this.kursService.prijavaNaKurs(kursPrijava).subscribe(response => {
      this.toastr.success("Prijavili ste studenta na kurs")
      this.ngOnInit()
    }, err => this.toastr.error("Student je vec prijavljen na ovaj kurs."))
  }
}
