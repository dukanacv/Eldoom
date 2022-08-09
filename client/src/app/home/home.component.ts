import { Component, OnInit } from '@angular/core';
import { KursService } from '../_services/kurs.service';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  osnovni: any = []
  master: any = []
  doktorski: any = []

  constructor(public loginService: LoginService, private kursService: KursService) { }

  ngOnInit(): void {
    this.getOsnovni()
    this.getMaster()
    this.getDoktroski()
  }

  getOsnovni() {
    this.kursService.getOsnovni()
      .subscribe(response => {
        this.osnovni = response
      }, err => console.log(err))
  }

  getMaster() {
    this.kursService.getMaster()
      .subscribe(response => {
        this.master = response
      }, err => console.log(err))
  }

  getDoktroski() {
    this.kursService.getDoktorski()
      .subscribe(response => {
        this.doktorski = response
      }, err => console.log(err))
  }


}
