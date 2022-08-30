import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kurs } from 'app/_models/kurs';
import { KursPrijava } from 'app/_models/kursprijava';
import { KursService } from 'app/_services/kurs.service';
import { LoginService } from 'app/_services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kurs',
  templateUrl: './kurs.component.html',
  styleUrls: ['./kurs.component.css']
})
export class KursComponent implements OnInit {

  kurs!: Kurs
  studentKursevi!: Kurs[]

  isShown: boolean = false
  isDodajVest: boolean = false

  kursPrijava: KursPrijava = { students_id_student: Number(localStorage.getItem("id")), kursevi_id_kurs: Number(this.route.snapshot.paramMap.get("id")) }

  obavestenje: any = {}
  vest: any = {}

  currentUrl = this.router.url;

  constructor(private kursService: KursService, private route: ActivatedRoute,
    private toastr: ToastrService, public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getKurs()
    this.getAllKurseviByStudentId()
  }

  getKurs() {
    this.kursService.getKurs(this.route.snapshot.paramMap.get("id")!).subscribe(kurs => {//iz url izvlaci id
      this.kurs! = kurs
    })
  }

  getAllKurseviByStudentId() {
    this.kursService.getAllKurseviByStudentId(Number(localStorage.getItem("id"))).subscribe(response => {
      this.studentKursevi = response
    })
  }

  odjavaSaKursa() {
    this.kursService.odjavaSaKursa(Number(localStorage.getItem("id")), Number(this.route.snapshot.paramMap.get("id")))
      .subscribe(response => {
        this.toastr.success("Uspesno ste izbrisali kurs iz svojih prijava")
        this.ngOnInit()
      }, err => this.toastr.error("Nije moguce izbrisati kurs, jer niste prijavljeni na njega"))
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  toggleDodajVest() {
    this.isDodajVest = !this.isDodajVest
  }

  postaviObavestenje() {
    this.kursService.postaviObavestenje(this.obavestenje, Number(this.route.snapshot.paramMap.get("id")))
      .subscribe(response => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.currentUrl]);
        });
        this.toastr.success("Uspesno ste postavili obavestenje!")
      }, err => {
        this.toastr.error("Greska: Nije moguce dodati obavestenje...")
      })
  }

  postaviVest() {
    this.kursService.postaviVest(this.vest, Number(localStorage.getItem("id")), Number(this.route.snapshot.paramMap.get("id")))
      .subscribe(response => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.currentUrl]);
        });
        this.toastr.success("Uspesno ste postavili vest!")
      }, err => console.log(err))
  }

  posaljiPrijavuProfesoru() {
    this.kursService.posaljiPrijavuProfesoru(this.kursPrijava).subscribe(response => {
      this.toastr.warning("Prijava je poslata profesoru")
    }, err => this.toastr.error("Nije moguce poslati prijavu. Proverite da li ste vec prijavljeni na kurs"))
  }
}
