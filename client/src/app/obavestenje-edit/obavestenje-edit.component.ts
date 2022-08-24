import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObavestenjeService } from 'app/_services/obavestenje.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-obavestenje-edit',
  templateUrl: './obavestenje-edit.component.html',
  styleUrls: ['./obavestenje-edit.component.css']
})
export class ObavestenjeEditComponent implements OnInit {
  @ViewChild("editForm") editForm!: NgForm

  obavestenje: any = {}

  constructor(private obavestenjeService: ObavestenjeService, private route: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getObavestenjeComponentsById()
  }

  getObavestenjeComponentsById() {
    this.obavestenjeService.getObavestenjeById(Number(this.route.snapshot.paramMap.get("id")))
      .subscribe(response => {
        this.obavestenje = response
      }, err => console.log(err))
  }

  izmeniObavestenje() {
    this.obavestenjeService.izmeniObavestenje(this.obavestenje, Number(this.route.snapshot.paramMap.get("id")))
      .subscribe(response => {
        this.toastr.success("Uspesno ste izmenili obavestenje")
        this.router.navigate(["kurs", this.obavestenje.kursevi_id_kurs])
      }, err => this.toastr.error("Greska pri izmeni obavestenja"))
  }
}
