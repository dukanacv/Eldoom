import { Component, Input, OnInit } from '@angular/core';
import { Obavestenje } from 'app/_models/obavestenje';
import { ObavestenjeService } from 'app/_services/obavestenje.service';
import { Kurs } from "app/_models/kurs"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-obavestenje',
  templateUrl: './obavestenje.component.html',
  styleUrls: ['./obavestenje.component.css']
})
export class ObavestenjeComponent implements OnInit {

  obavestenja!: Obavestenje[]
  @Input() kursId!: number;//from parent component

  constructor(private obavestenjeService: ObavestenjeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getObavestenjaByKursId()
  }

  getObavestenjaByKursId() {
    this.obavestenjeService.getObavestenjaByKursId(this.kursId!).subscribe(response => {
      this.obavestenja = response
    })
  }

  deleteObavestenjeById(id_obavestenja: number) {
    this.obavestenjeService.deleteObavestenjeById(id_obavestenja).subscribe(response => {
      this.toastr.warning("Obavestenje obrisano")
      this.ngOnInit()
    }, err => console.log(err))
  }
}
